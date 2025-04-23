import {
  boolean,
  integer,
  foreignKey,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';

/**
 * The priorities table schema.
 *
 * This table stores task priorities with the following fields:
 * - id: A unique identifier for each priority (serial, primary key).
 * - name: The name of the priority (varchar(50), not null, unique).
 * - value: The value of the priority, higher number is more urgent (smallint, not null, unique).
 */
const priorities = pgTable('priorities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  value: smallint('value').notNull().unique(),
});

/**
 * The tasks schema.
 *
 * This table stores tasks with the following fields:
 * - id: A unique identifier for each task (serial, primary key).
 * - title: The title of the task (varchar(255), not null).
 * - description: A detailed description of the task (text).
 * - priority: A reference to the priority of the task (integer, foreign key).
 * - completed: A boolean indicating whether the task is completed (boolean, not null, default false).
 */
const tasks = pgTable(
  'tasks',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    modifiedAt: timestamp('modified_at'),
    completed: boolean('completed').notNull().default(false),
    completedAt: timestamp('completed_at'),
    priorityId: integer('priority_id'),
  },
  (t) => [
    foreignKey({
      name: 'priorities_fk',
      columns: [t.priorityId],
      foreignColumns: [priorities.id],
    }).onDelete('set null'),
  ],
);

/**
 * The relationship between the priorities and tasks tables.
 */
const prioritiesRelations = relations(priorities, ({ many }) => ({
  tasks: many(tasks),
}));

/**
 * The relationship between the tasks and priorities tables.
 */
const tasksRelations = relations(tasks, ({ one }) => ({
  priority: one(priorities, {
    fields: [tasks.priorityId],
    references: [priorities.id],
  }),
}));

type Task = InferSelectModel<typeof tasks>;
type Priority = InferSelectModel<typeof priorities>;

export { tasks, tasksRelations, priorities, prioritiesRelations };
export type { Task, Priority };
