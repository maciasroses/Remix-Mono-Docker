import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { AccountingList, SearchBar } from "./components";
import { getAccounts } from "~/services/accounting/controller.server";
import type { AccountingListProps, SearchParams } from "~/interfaces";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const currency = url.searchParams.get("currency");
  const type = url.searchParams.get("type");
  const page = url.searchParams.get("page") || "1";
  const pageSize = url.searchParams.get("pageSize") || "9";

  const searchParams: SearchParams = {};
  if (q) searchParams.q = q;
  if (currency) searchParams.currency = currency;
  if (type) searchParams.type = type;
  searchParams.page = page;
  searchParams.pageSize = pageSize;

  const { accountings, totalPages } = (await getAccounts(
    searchParams
  )) as AccountingListProps;
  return json({ accountings, totalPages, q, currency, type });
};

const AccountingIndex = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { accountings, totalPages, q, currency, type } =
    useLoaderData<typeof loader>();

  const paramsForSearch = {
    q: q || "",
    currency: currency || "",
    type: type || "",
  };

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) searchField.value = q || "";
    const currencyField = document.getElementById("currency");
    if (currencyField instanceof HTMLSelectElement)
      currencyField.value = currency || "";
    const typeField = document.getElementById("type");
    if (typeField instanceof HTMLSelectElement) typeField.value = type || "";
  }, [q, currency, type]);

  const handleChangeIsSearching = (value: boolean) => {
    setIsSearching(value);
  };

  return (
    <>
      <SearchBar
        params={paramsForSearch}
        handleChangeIsSearching={handleChangeIsSearching}
      />
      <AccountingList accountings={accountings} isSearching={isSearching} />
      {!isSearching && totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
};

export default AccountingIndex;
