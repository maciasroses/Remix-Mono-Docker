import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { logout } from "~/services/user/controller.server";

export const action: ActionFunction = async ({ request }) => logout(request);
export const loader: LoaderFunction = async () => redirect("/");
