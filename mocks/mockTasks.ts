import { Task, Priority } from '@/db/schema';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    completedAt: null,
    createdAt: new Date('2023-01-02'),
    modifiedAt: null,
    priorityId: 1,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    completed: true,
    completedAt: null,
    createdAt: new Date('2023-01-01'),
    modifiedAt: null,
    priorityId: 2,
  },
];

export { mockTasks };
