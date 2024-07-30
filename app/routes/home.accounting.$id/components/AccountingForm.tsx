import { Form, Link } from "@remix-run/react";
import formatDateForDateInput from "~/utils/formatDate-dateInput";
import type { AccountingProps, User } from "~/interfaces";

const AccountingForm = ({
  user,
  message,
  errors,
  accounting,
  isEditing,
  isSubmitting,
}: {
  user: User;
  message?: string;
  errors?: {
    amount?: string;
    currency?: string;
    date?: string;
    type?: string;
    description?: string;
  };
  accounting?: AccountingProps;
  isEditing?: boolean;
  isSubmitting: boolean;
}) => {
  return (
    <div className="flex flex-col items-center gap-4 dark:text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl">
          {isEditing ? "Edit Accounting" : "Create an Accounting"}
        </h1>
        {message && <p className="text-red-600">{message}</p>}
      </div>
      <Form method="POST">
        <fieldset disabled={isSubmitting}>
          <div className="flex flex-col gap-4 text-xl max-w-[500px]">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Your amount"
                  defaultValue={accounting?.amount ?? ""}
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.amount
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors?.amount && (
                  <small className="text-red-600">{errors?.amount}</small>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="currency">Currency</label>
                <select
                  name="currency"
                  id="currency"
                  defaultValue={accounting?.currency ?? ""}
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.currency
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select a currency</option>
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                {errors?.currency && (
                  <small className="text-red-600">{errors?.currency}</small>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Your date"
                  defaultValue={
                    accounting?.date
                      ? formatDateForDateInput(accounting.date)
                      : ""
                  }
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.date
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors?.date && (
                  <small className="text-red-600">{errors?.date}</small>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
                  defaultValue={accounting?.type ?? ""}
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.type
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select a type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Transfer">Transfer</option>
                </select>
                {errors?.type && (
                  <small className="text-red-600">{errors?.type}</small>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Your description"
                defaultValue={accounting?.description ?? ""}
                className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                  errors?.description
                    ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors?.description && (
                <small className="text-red-600">{errors?.description}</small>
              )}
            </div>
          </div>
          <input hidden name="userId" defaultValue={(user as User)?.id} />
          <input
            hidden
            name="accountingId"
            defaultValue={accounting?.id ?? ""}
          />
          <div className="flex justify-center items-center gap-2 mt-4">
            <Link
              className="px-4 py-2 bg-gray-300 text-gray-400 dark:bg-gray-600 dark:text-gray-400 rounded-md w-auto"
              hidden={isSubmitting}
              to={`${
                accounting?.id
                  ? `/home/accounting/${accounting.id}`
                  : `/home/accounting`
              }`}
            >
              Cancel
            </Link>
            <button
              className={`${
                isSubmitting ? "bg-blue-500/50" : "bg-blue-500"
              } px-4 py-2 text-white rounded-md w-auto`}
              type="submit"
              name="formAction"
              value={isEditing ? "update" : "create"}
            >
              {isSubmitting ? (
                <div role="status" aria-hidden="true" className="px-4">
                  <svg
                    aria-hidden="true"
                    className="size-[1rem] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : isEditing ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export default AccountingForm;
