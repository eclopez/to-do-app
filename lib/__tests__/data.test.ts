import { db } from '@/db';
import { mockTasks, mockPriorities } from '@/mocks';
import { getTasks, getPriorities } from '../data';

jest.mock('@/db', () => ({
  db: {
    query: {
      tasks: {
        findMany: jest.fn(),
      },
      priorities: {
        findMany: jest.fn(),
      },
    },
  },
}));

describe('data', () => {
  describe('getTasks', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return tasks data', async () => {
      (db.query.tasks.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const result = await getTasks();

      expect(db.query.tasks.findMany).toHaveBeenCalledTimes(1);
      expect(db.query.tasks.findMany).toHaveBeenCalledWith({
        with: {
          priority: true,
        },
        orderBy: expect.any(Function),
      });
      expect(result).toEqual(mockTasks);
    });

    it('should throw an error when database query fails', async () => {
      // Suppress errors in the console
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const mockError = new Error('Database connection failed');
      (db.query.tasks.findMany as jest.Mock).mockRejectedValue(mockError);

      // Call the function and expect it to throw
      await expect(getTasks()).rejects.toThrow('Failed to fetch tasks');

      // Ensure the mock was called
      expect(db.query.tasks.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPriorities', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return priorities data', async () => {
      (db.query.priorities.findMany as jest.Mock).mockResolvedValue(
        mockPriorities,
      );

      const result = await getPriorities();

      expect(db.query.priorities.findMany).toHaveBeenCalledTimes(1);
      expect(db.query.priorities.findMany).toHaveBeenCalledWith({
        orderBy: expect.any(Function),
      });
      expect(result).toEqual(mockPriorities);
    });

    it('should throw an error when database query fails', async () => {
      // Suppress errors in the console
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const mockError = new Error('Database connection failed');
      (db.query.priorities.findMany as jest.Mock).mockRejectedValue(mockError);

      // Call the function and expect it to throw
      await expect(getPriorities()).rejects.toThrow(
        'Failed to fetch priorities',
      );

      // Ensure the mock was called
      expect(db.query.priorities.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
