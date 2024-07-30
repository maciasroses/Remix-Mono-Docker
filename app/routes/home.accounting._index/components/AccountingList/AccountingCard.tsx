import { Link } from "@remix-run/react";
import type { AccountingProps } from "~/interfaces";

interface AccountingCardProps {
  accounting: AccountingProps;
}

const AccountingCard = ({ accounting }: AccountingCardProps) => {
  return (
    <Link
      to={accounting.id}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {accounting.description}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {accounting.amount} {accounting.currency}
      </p>
      <p className="mt-2">
        <span
          className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border dark:bg-gray-700 ${
            accounting.type === "Expense"
              ? "bg-red-100 text-red-800 dark:text-red-400 border-red-400"
              : accounting.type === "Income"
              ? "bg-green-100 text-green-800 dark:text-green-400 border-green-400"
              : "bg-blue-100 text-blue-800 dark:text-blue-400 border-blue-400"
          }`}
        >
          <svg
            className="size-4 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {accounting.type}
        </span>
      </p>
    </Link>
  );
};

export default AccountingCard;
