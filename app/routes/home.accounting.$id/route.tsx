import { LoaderFunctionArgs } from "@remix-run/node";
import { useAuth } from "~/providers/AuthContext";
import {
  useNavigate,
  json,
  useLoaderData,
  Link,
  useNavigation,
} from "@remix-run/react";
import { getAccountById } from "~/services/accounting/controller.server";
import { AccountingProps } from "~/interfaces";
import invariant from "tiny-invariant";
import { Card404 } from "~/components";
import { DeleteButton } from "./components";
// import { formatDateAmerican } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing contactId param");
  const accounting = (await getAccountById({
    id: params.id,
  })) as AccountingProps;
  if (!accounting) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ accounting });
};

const AccountingRoutePage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction !== undefined;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { accounting } = useLoaderData<typeof loader>();

  return (
    <div className="pt-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {accounting.description}
        </h1>
        <p
          className={`text-4xl font-bold tracking-tight
            ${
              accounting.type === "Expense"
                ? "text-red-800 dark:text-red-400"
                : accounting.type === "Income"
                ? "text-green-800 dark:text-green-400"
                : "text-blue-800 dark:text-blue-400"
            }`}
        >
          {accounting.amount}
          <span
            className={`text-lg font-medium inline-flex items-center px-2.5 py-0.5 ${
              accounting.type === "Expense"
                ? "text-red-800 dark:text-red-400"
                : accounting.type === "Income"
                ? "text-green-800 dark:text-green-400"
                : "text-blue-800 dark:text-blue-400"
            }`}
          >
            {accounting.type}
          </span>
        </p>
        <p
          className="
          mt-2 text-xs font-medium inline-flex items-center px-2.5 py-0.5 text-gray-800 dark:text-gray-400
        "
        >
          {/* {lng === "en"
            ? formatDateAmerican(accounting.date)
            : formatDateLatinAmerican(accounting.date)} */}
          {/* {formatDateAmerican(accounting.date)} */}
          {accounting.date}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mt-4">
        {user?.role === "admin" && (
          <div className="flex justify-center items-center gap-2">
            <Link
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-blue-300 text-blue-700"
              to="edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </Link>
            <DeleteButton
              accounting={accounting as unknown as AccountingProps}
              isSubmitting={isSubmitting}
              // userId={user.id}
            />
          </div>
        )}
        <button
          className="px-4 py-2 bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 rounded-md w-auto"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default AccountingRoutePage;

export function ErrorBoundary() {
  // const error = useRouteError() as Response;
  // console.error(error);
  return (
    <Card404
      title="Accounting with this ID was not found"
      description="Try searching another"
    />
  );
}
