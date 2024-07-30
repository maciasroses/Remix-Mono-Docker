import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// import { useCustomTranslation } from "~/hooks";
import {
  AccountingsForBarChartProps,
  SearchParamsForBarChart,
} from "~/interfaces";
import { getAllAccountsForBarChart } from "~/services/accounting/controller.server";
import { BarChart, CurrencySelect } from "./components";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const currencyToTake = url.searchParams.get("currencyToTake") || "usd";

  const searchParams: SearchParamsForBarChart = {};
  searchParams.currencyToTake = currencyToTake;

  const accountings = (await getAllAccountsForBarChart(
    searchParams
  )) as AccountingsForBarChartProps[];

  return json({ accountings, currencyToTake });
};

const HomeIndex = () => {
  // const home = useCustomTranslation("home");
  const [isSearching, setIsSearching] = useState(false);
  const { accountings, currencyToTake } = useLoaderData<typeof loader>();

  const params = {
    currencyToTake,
  };

  const handleChangeIsSearching = (value: boolean) => {
    setIsSearching(value);
  };

  useEffect(() => {
    const currencyRadious = document.getElementById("currencyToTake");
    if (currencyRadious instanceof HTMLInputElement)
      currencyRadious.checked = currencyToTake === currencyRadious.value;
  }, [currencyToTake]);

  return (
    <>
      {/* <h1 className="dark:text-white">{home.title}</h1> */}
      <CurrencySelect
        params={params}
        handleChangeIsSearching={handleChangeIsSearching}
      />
      <BarChart accountings={accountings} isSearching={isSearching} />
    </>
  );
};

export default HomeIndex;
