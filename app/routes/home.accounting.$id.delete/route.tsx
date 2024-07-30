import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { User } from "~/interfaces";
import { deleteAccount } from "~/services/accounting/controller.server";
import { getUser } from "~/services/user/controller.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "Missing id param");
  const user = (await getUser(request)) as User;
  if (user.role !== "admin") {
    return redirect(`/home/accounting/${params.id}`);
  }
  return null;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.id, "Missing contactId param");
  return await deleteAccount({ id: params.id });
};
