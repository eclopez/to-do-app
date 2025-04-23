import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

console.log(process.env.DATABASE_URL!);

const db = drizzle(process.env.DATABASE_URL!, { schema, casing: 'snake_case' });

export { db };
