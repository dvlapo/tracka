import {PrismaClient, Prisma} from '../app/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    transactions: {
      create: [
        {
          amount: 100,
          description: 'Initial deposit',
        },
        {
          amount: -20,
          description: 'Groceries',
        },
      ],
    },
    categories: {
      create: [
        {
          name: 'Income',
        },
        {
          name: 'Expenses',
        },
      ],
    },
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    transactions: {
      create: [
        {
          amount: 50,
          description: 'Gift',
        },
      ],
    },
    categories: {
      create: [
        {
          name: 'Gifts',
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({data: u});
  }
}

main();
