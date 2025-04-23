import { eq } from 'drizzle-orm';
import { db } from './index';
import { tasks, priorities, Task, Priority } from './schema';

const INITIAL_TASK_TITLE = 'Test Task';

// Seed the database with default priorities and a test task
async function main() {
  // Create priorities
  const priorityList: Omit<Priority, 'id'>[] = [
    { name: 'High', value: 10000 },
    { name: 'Medium', value: 5000 },
    { name: 'Low', value: 1000 },
  ];

  // Get all existing priorities
  const currentPriorities = await db.select().from(priorities);
  for (const priority of priorityList) {
    // Don't insert the priority if it already exists
    if (currentPriorities.some((p) => p.name === priority.name)) {
      console.log(`Priority ${priority.name} already exists.`);
      continue;
    }
    // Insert the priority
    await db.insert(priorities).values(priority);
    console.log(`Inserted priority: ${priority.name}`);
  }

  // Get tasks with our test title
  const currentTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.title, INITIAL_TASK_TITLE));

  // Don't insert the task if it already exists
  if (currentTasks.length > 0) {
    console.log(`Task '${INITIAL_TASK_TITLE}' already exists.`);
    return;
  }

  // Get the 'Medium' priority Id
  const mediumPriorityId = await db
    .select({
      id: priorities.id,
    })
    .from(priorities)
    .where(eq(priorities.name, 'Medium'));

  // Create the initial task
  const task: Omit<Task, 'id' | 'createdAt' | 'modifiedAt' | 'completedAt'> = {
    title: INITIAL_TASK_TITLE,
    description: 'This is a test task',
    priorityId: mediumPriorityId[0].id,
    completed: false,
  };

  // Insert the task
  await db.insert(tasks).values(task);
  console.log(`Inserted task: ${task.title}`);
}

main();
