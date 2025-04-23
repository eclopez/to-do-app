import { db } from '@/db';
import { Task, Priority } from '@/db/schema';

/**
 * Gets all of the tasks, ordered by descending creation date
 *
 * @returns {Promise<Task[]>} List of tasks
 */
async function getTasks(): Promise<Task[]> {
  try {
    const result = await db.query.tasks.findMany({
      with: {
        priority: true,
      },
      orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
    });
    return result;
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    throw new Error('Failed to fetch tasks');
  }
}

/**
 * Gets all of the priorities, ordered by ascending value
 *
 * @returns {Promise<Priorities[]>} List of priorities
 */
async function getPriorities(): Promise<Priority[]> {
  try {
    const result = await db.query.priorities.findMany({
      orderBy: (priorities, { asc }) => [asc(priorities.value)],
    });
    return result;
  } catch (error) {
    console.error('Error fetching priorities: ', error);
    throw new Error('Failed to fetch priorities');
  }
}

export { getTasks, getPriorities };
