import { PrismaClient } from "@prisma/client";
import hashPassword from "~/utils/hashPassword";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: await hashPassword("password1"),
      name: "User One",
      role: "admin",
    },
  });

  await prisma.log.create({
    data: {
      level: "info",
      message: "User created",
      meta: {
        userId: user1.id,
        email: user1.email,
        role: user1.role,
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: await hashPassword("password2"),
      name: "User Two",
      role: "user",
    },
  });

  await prisma.log.create({
    data: {
      level: "info",
      message: "User created",
      meta: {
        userId: user2.id,
        email: user2.email,
        role: user2.role,
      },
    },
  });

  const accountingEntries = [
    {
      date: new Date("2024-01-01"),
      description: "Office Supplies",
      amount: 150.75,
      currency: "USD",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-01-15"),
      description: "Client Payment",
      amount: 3000.0,
      currency: "MXN",
      type: "Income",
      userId: user1.id,
    },
    {
      date: new Date("2024-01-26"),
      description: "Office Rent",
      amount: 1200.0,
      currency: "EUR",
      type: "Transfer",
      userId: user1.id,
    },
    {
      date: new Date("2024-02-04"),
      description: "Office Supplies",
      amount: 50.0,
      currency: "GBP",
      type: "Expense",
      userId: user2.id,
    },
    {
      date: new Date("2024-02-18"),
      description: "Client Payment",
      amount: 8120.23,
      currency: "MXN",
      type: "Income",
      userId: user2.id,
    },
    {
      date: new Date("2024-02-29"),
      description: "Office Rent",
      amount: 90.25,
      currency: "EUR",
      type: "Transfer",
      userId: user2.id,
    },
    {
      date: new Date("2024-03-10"),
      description: "Client Payment",
      amount: 500.0,
      currency: "USD",
      type: "Income",
      userId: user1.id,
    },
    {
      date: new Date("2024-03-15"),
      description: "Office Rent",
      amount: 800.0,
      currency: "EUR",
      type: "Expense",
      userId: user2.id,
    },
    {
      date: new Date("2024-04-01"),
      description: "Office Supplies",
      amount: 100.0,
      currency: "USD",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-04-15"),
      description: "Client Payment",
      amount: 2000.0,
      currency: "MXN",
      type: "Income",
      userId: user1.id,
    },
    {
      date: new Date("2024-04-26"),
      description: "Office Rent",
      amount: 1500.0,
      currency: "EUR",
      type: "Transfer",
      userId: user1.id,
    },
    {
      date: new Date("2024-05-01"),
      description: "Office Supplies",
      amount: 200.0,
      currency: "USD",
      type: "Expense",
      userId: user2.id,
    },
    {
      date: new Date("2024-05-15"),
      description: "Client Payment",
      amount: 4000.0,
      currency: "MXN",
      type: "Income",
      userId: user2.id,
    },
    {
      date: new Date("2024-05-26"),
      description: "Office Rent",
      amount: 1800.0,
      currency: "EUR",
      type: "Transfer",
      userId: user2.id,
    },
    {
      date: new Date("2024-06-04"),
      description: "Office Supplies",
      amount: 75.0,
      currency: "GBP",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-06-18"),
      description: "Client Payment",
      amount: 9120.23,
      currency: "MXN",
      type: "Income",
      userId: user1.id,
    },
    {
      date: new Date("2024-06-29"),
      description: "Office Rent",
      amount: 190.25,
      currency: "EUR",
      type: "Transfer",
      userId: user1.id,
    },
    {
      date: new Date("2024-07-10"),
      description: "Client Payment",
      amount: 600.0,
      currency: "USD",
      type: "Income",
      userId: user2.id,
    },
    {
      date: new Date("2024-07-15"),
      description: "Office Rent",
      amount: 900.0,
      currency: "EUR",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-08-01"),
      description: "Office Supplies",
      amount: 300.0,
      currency: "USD",
      type: "Expense",
      userId: user2.id,
    },
    {
      date: new Date("2024-08-15"),
      description: "Client Payment",
      amount: 5000.0,
      currency: "MXN",
      type: "Income",
      userId: user2.id,
    },
    {
      date: new Date("2024-08-26"),
      description: "Office Rent",
      amount: 2200.0,
      currency: "EUR",
      type: "Transfer",
      userId: user2.id,
    },
    {
      date: new Date("2024-09-04"),
      description: "Office Supplies",
      amount: 100.0,
      currency: "GBP",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-09-18"),
      description: "Client Payment",
      amount: 7120.23,
      currency: "MXN",
      type: "Income",
      userId: user1.id,
    },
    {
      date: new Date("2024-09-29"),
      description: "Office Rent",
      amount: 290.25,
      currency: "EUR",
      type: "Transfer",
      userId: user1.id,
    },
    {
      date: new Date("2024-10-10"),
      description: "Client Payment",
      amount: 400.0,
      currency: "USD",
      type: "Income",
      userId: user2.id,
    },
    {
      date: new Date("2024-10-15"),
      description: "Office Rent",
      amount: 700.0,
      currency: "EUR",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-11-01"),
      description: "Office Supplies",
      amount: 400.0,
      currency: "USD",
      type: "Expense",
      userId: user2.id,
    },
    {
      date: new Date("2024-11-15"),
      description: "Client Payment",
      amount: 6000.0,
      currency: "MXN",
      type: "Income",
      userId: user2.id,
    },
    {
      date: new Date("2024-11-26"),
      description: "Office Rent",
      amount: 2500.0,
      currency: "EUR",
      type: "Transfer",
      userId: user2.id,
    },
    {
      date: new Date("2024-12-04"),
      description: "Office Supplies",
      amount: 125.0,
      currency: "GBP",
      type: "Expense",
      userId: user1.id,
    },
    {
      date: new Date("2024-12-18"),
      description: "Client Payment",
      amount: 5120.23,
      currency: "MXN",
      type: "Income",
      userId: user1.id,
    },
    {
      date: new Date("2024-12-29"),
      description: "Office Rent",
      amount: 390.25,
      currency: "EUR",
      type: "Transfer",
      userId: user1.id,
    },
  ];

  await prisma.accounting.createMany({
    data: accountingEntries,
  });

  await prisma.log.create({
    data: {
      level: "info",
      message: "Accounting entries created",
      meta: {
        entries: accountingEntries.map((entry) => ({
          userId: entry.userId,
          date: entry.date,
          description: entry.description,
          amount: entry.amount,
          currency: entry.currency,
          type: entry.type,
        })),
      },
    },
  });
}

main()
  .then(() => {
    console.log("Seeding finished.");
  })
  .catch((e) => {
    console.error("Seeding error: ", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
