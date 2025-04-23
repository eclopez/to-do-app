import { Priority } from '@/db/schema';

const mockPriorities: Priority[] = [
  {
    id: 1,
    name: 'Low',
    value: 1000,
  },
  {
    id: 2,
    name: 'Medium',
    value: 5000,
  },
  {
    id: 3,
    name: 'High',
    value: 10000,
  },
];

export { mockPriorities };
