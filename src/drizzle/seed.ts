import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { todos } from './schema';

const db = drizzle(
  new Pool({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'todos_db',
  }),
);

async function main() {
  await db.insert(todos).values([
    { title: 'Learn Drizzle', completed: false, updatedAt: new Date() },
    { title: 'Compare Prisma vs Drizzle', completed: true, updatedAt: new Date() },
    { title: 'Practice SQL mindset', completed: false, updatedAt: new Date() },
  ]);

  console.log('Drizzle seed complete');
}

main();
