import { redirect } from "@remix-run/react";
import { create, deleteById, read, readAll, update } from "./model.server";
import { AccountingProps, SearchParams } from "~/interfaces";
import getExchangeRate from "~/utils/getExchangeRate.server";

export async function getAccounts({
  q,
  currency,
  type,
  page,
  pageSize,
}: SearchParams) {
  try {
    return await read({
      q,
      currency,
      type,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get accounts");
  }
}

export async function getAccountById({ id }: { id: string }) {
  try {
    const accounting = await read({ id });
    if (!accounting) {
      throw new Error("Account not found");
    }
    return accounting;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get account");
  }
}

export async function getAllAccountsForBarChart({
  currencyToTake = "usd",
}: {
  currencyToTake?: string;
}) {
  let data = [];
  try {
    data = await readAll();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get accounts");
  }

  const upperCurrency = currencyToTake.toUpperCase();

  const currencies = [
    ...new Set(data.map((item: AccountingProps) => item.currency)),
    upperCurrency,
  ];

  const exchangeRates: { [key: string]: number } = {};

  for (const localCurrency of currencies) {
    if (localCurrency !== upperCurrency) {
      exchangeRates[localCurrency] = getExchangeRate(
        localCurrency,
        upperCurrency
      );
    }
    upperCurrency;
  }

  return data.map((item) => {
    const conversionRate =
      item.currency === upperCurrency ? 1 : exchangeRates[item.currency];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, userId, currency, createdAt, updatedAt, ...rest } =
      item;
    return {
      ...rest,
      amount: item.amount * conversionRate,
    };
  });
}

export async function createAccount({ body }: { body: unknown }) {
  try {
    await create({ data: body });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create account");
  }
  return redirect("/home/accounting");
}

export async function updateAccount({
  id,
  body,
}: {
  id: string;
  body: unknown;
}) {
  const accounting = await read({ id });
  if (!accounting) {
    throw new Error("Account not found");
  }
  try {
    await update({ id, data: body });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update account");
  }
  // return redirect(`/home/accounting/${id}`);
  return redirect("/home/accounting");
}

export async function deleteAccount({ id }: { id: string }) {
  const accounting = await getAccountById({ id });
  if (!accounting) {
    console.error("Account not found");
    throw new Error("Account not found");
  }
  try {
    await deleteById({ id });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete account");
  }
  return redirect("/home/accounting");
}
