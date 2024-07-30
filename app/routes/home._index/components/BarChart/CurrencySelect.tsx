import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect } from "react";

interface CurrencySelectProps {
  params: {
    currencyToTake: string;
  };
  handleChangeIsSearching: (isSearching: boolean) => void;
}

const CurrencySelect = ({
  params,
  handleChangeIsSearching,
}: CurrencySelectProps) => {
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("currencyToTake");

  useEffect(() => {
    if (!searching) {
      handleChangeIsSearching(false);
    } else {
      handleChangeIsSearching(true);
    }
  }, [searching, handleChangeIsSearching]);

  return (
    <Form
      onChange={(event) => {
        const isFirstSearch = params.currencyToTake === null;
        submit(event.currentTarget, {
          replace: !isFirstSearch,
        });
      }}
    >
      <div className="flex flex-wrap justify-end">
        <label className="flex items-center me-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            aria-label="Currency USD"
            id="currencyToTake"
            name="currencyToTake"
            type="radio"
            value="usd"
            defaultChecked={params.currencyToTake === "usd"}
            className="w-4 h-4 me-2"
          />
          USD
        </label>
        <label className="flex items-center me-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            aria-label="Currency MXN"
            id="currencyToTake"
            name="currencyToTake"
            type="radio"
            value="mxn"
            defaultChecked={params.currencyToTake === "mxn"}
            className="w-4 h-4 me-2"
          />
          MXN
        </label>
        <label className="flex items-center me-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            aria-label="Currency EUR"
            id="currencyToTake"
            name="currencyToTake"
            type="radio"
            value="eur"
            defaultChecked={params.currencyToTake === "eur"}
            className="w-4 h-4 me-2"
          />
          EUR
        </label>
        <label className="flex items-center me-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          <input
            aria-label="Currency GBP"
            id="currencyToTake"
            name="currencyToTake"
            type="radio"
            value="gbp"
            defaultChecked={params.currencyToTake === "gbp"}
            className="w-4 h-4 me-2"
          />
          GBP
        </label>
      </div>
    </Form>
  );
};

export default CurrencySelect;
