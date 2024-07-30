import { getUser } from "~/services/user/controller.server";
import {
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { AccountingForm } from "~/routes/home.accounting.$id/components";
import { validateAccounting } from "~/services/accounting/schema.server";
import type { User, AccountingProps } from "~/interfaces";
import {
  getAccountById,
  updateAccount,
} from "~/services/accounting/controller.server";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "Missing id param");
  const user = (await getUser(request)) as User;
  if (user.role !== "admin") {
    return redirect(`/home/accounting/${params.id}`);
  }
  const accounting = (await getAccountById({
    id: params.id,
  })) as AccountingProps;
  if (!accounting) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user, accounting });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  // const userId = form.get("userId");
  const partialData = {
    date: new Date(form.get("date") as string),
    description: form.get("description"),
    amount: Number(form.get("amount")),
    currency: form.get("currency"),
    type: form.get("type"),
    accountingId: form.get("accountingId"),
  };

  const errors = validateAccounting("update", partialData);

  if (Object.keys(errors).length !== 0)
    return json({ errors }, { status: 400 });

  const { accountingId, ...data } = partialData;
  const action = form.get("formAction");
  switch (action) {
    case "update":
      return await updateAccount({ id: accountingId as string, body: data });
    default:
      return json({ message: `Invalid Form Action` }, { status: 400 });
  }
};

const AccountingEditPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction !== undefined;
  const { user, accounting } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { message, errors } = actionData ?? {};

  return (
    <AccountingForm
      user={user}
      accounting={accounting}
      isEditing
      message={message}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};

export default AccountingEditPage;
