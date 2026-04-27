import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: 'Integrate Prisma', completed: true },
      { title: 'Now integrate Dizzle', completed: false },
      { title: 'Prepare the Frontent', completed: false },
      { title: 'Dockerize backend', completed: true },
    ],
  });

  console.log('Seed complete');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
