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
import type { User } from "~/interfaces";
import { createAccount } from "~/services/accounting/controller.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = (await getUser(request)) as User;
  if (user.role !== "admin") {
    return redirect("/home/accounting");
  }
  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const data = {
    date: new Date(form.get("date") as string),
    description: form.get("description"),
    amount: Number(form.get("amount")),
    currency: form.get("currency"),
    type: form.get("type"),
    userId: form.get("userId"),
  };

  const errors = validateAccounting("create", data);

  if (Object.keys(errors).length !== 0)
    return json({ errors }, { status: 400 });

  const action = form.get("formAction");
  switch (action) {
    case "create":
      return await createAccount({ body: data });
    default:
      return json({ message: `Invalid Form Action` }, { status: 400 });
  }
};

const AccountingCreatePage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction !== undefined;
  const { user } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { message, errors } = actionData ?? {};

  return (
    <AccountingForm
      user={user}
      message={message}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
};

export default AccountingCreatePage;
