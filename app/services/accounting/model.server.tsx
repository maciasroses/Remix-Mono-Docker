import prisma from "~/services/prisma.server";

export async function create({
  data,
}: {
  data: (typeof prisma.accounting.create)["arguments"]["data"];
}) {
  return await prisma.accounting.create({ data });
}

export async function read({
  id,
  q,
  currency,
  type,
  page = 1,
  pageSize = 9,
}: {
  id?: string;
  q?: string;
  currency?: string;
  type?: string;
  page?: number;
  pageSize?: number;
}) {
  if (id) {
    return await prisma.accounting.findUnique({ where: { id } });
  }

  interface Where {
    description?: object;
    currency?: object;
    type?: object;
  }

  const where: Where = {};

  if (q) {
    where.description = { contains: q, mode: "insensitive" };
  }

  if (currency) {
    where.currency = { equals: currency, mode: "insensitive" };
  }

  if (type) {
    where.type = { equals: type, mode: "insensitive" };
  }

  const totalCount = await prisma.accounting.count({ where });
  const totalPages = Math.ceil(totalCount / pageSize);
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const accountings = await prisma.accounting.findMany({
    where,
    skip,
    take,
  });

  return {
    accountings,
    totalPages,
  };
}

export async function readAll() {
  return await prisma.accounting.findMany();
}

export async function update({
  id,
  data,
}: {
  id: string;
  data: (typeof prisma.accounting.update)["arguments"]["data"];
}) {
  return await prisma.accounting.update({ where: { id }, data });
}

export async function deleteById({ id }: { id: string }) {
  return await prisma.accounting.delete({ where: { id } });
}
