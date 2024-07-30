import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { getUser, register } from "~/services/user/controller.server";
import { ErrorCard } from "~/components";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRole,
  validateSecretKey,
} from "./schema";
import { useState } from "react";

export function meta() {
  return [{ title: "Sign up" }];
}

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/home") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("formAction");
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");
  const role = form.get("role");
  const secretKey = form.get("secretKey");

  if (
    typeof action !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    typeof role !== "string" ||
    (role === "admin" && typeof secretKey !== "string")
  ) {
    return json({ message: "Invalid Form Data" }, { status: 400 });
  }

  const errors = {
    name: validateName.safeParse(name),
    email: validateEmail.safeParse(email),
    password: validatePassword.safeParse(password),
    confirmPassword: validatePassword.safeParse(confirmPassword),
    role: validateRole.safeParse(role),
    secretKey: validateSecretKey.safeParse(secretKey),
  };

  if (Object.values(errors).some((error) => error.success === false)) {
    return json(
      {
        errors: {
          name: errors.name.error?.issues[0]?.message,
          email: errors.email.error?.issues[0]?.message,
          password: errors.password.error?.issues[0]?.message,
          confirmPassword: errors.confirmPassword.error?.issues[0]?.message,
          role: errors.role.error?.issues[0]?.message,
          secretKey: errors.secretKey?.error?.issues[0]?.message,
        },
      },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return json({ message: "Passwords do not match" }, { status: 400 });
  }

  if (role === "admin" && secretKey !== process.env.ADMIN_SECRET_KEY) {
    return json(
      { message: "Invalid secret key for admin role" },
      { status: 403 }
    );
  }

  switch (action) {
    case "signup":
      return await register({ name, email, password, role });
    default:
      return json({ message: "Invalid Form Action" }, { status: 400 });
  }
};

const Signup = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction !== undefined;
  const actionData = useActionData<typeof action>();
  const { message, errors } = actionData ?? {};
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsAdmin(event.target.value === "admin");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <Link className="text-4xl" to="/">
          LOGO
        </Link>
        <div className="flex flex-col items-center gap-2">
          <h1 className=" text-6xl">Sign Up</h1>
          {message && <p className="text-red-600">{message}</p>}
        </div>
        <Form method="POST">
          <fieldset disabled={isSubmitting}>
            <div className="flex flex-col gap-4 text-xl max-w-[500px]">
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                      errors?.name
                        ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  {errors?.name && (
                    <small className="text-red-600">{errors?.name}</small>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@test.com"
                    className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                      errors?.email
                        ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  {errors?.email && (
                    <small className="text-red-600">{errors?.email}</small>
                  )}
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                      errors?.password
                        ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  {errors?.password && (
                    <small className="text-red-600">{errors?.password}</small>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                      errors?.confirmPassword
                        ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                  {errors?.confirmPassword && (
                    <small className="text-red-600">
                      {errors?.confirmPassword}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="role">Role</label>
                  <select
                    name="role"
                    id="role"
                    onChange={handleRoleChange}
                    className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                      errors?.role
                        ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors?.role && (
                    <small className="text-red-600">{errors?.role}</small>
                  )}
                </div>
                {isAdmin && (
                  <div className="flex flex-col gap-2 w-1/2">
                    <label htmlFor="secretKey">Admin Secret Key</label>
                    <input
                      type="password"
                      name="secretKey"
                      id="secretKey"
                      placeholder="Secret key for admin"
                      className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                        errors?.secretKey
                          ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                    {errors?.secretKey && (
                      <small className="text-red-600">
                        {errors?.secretKey}
                      </small>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                className={`${
                  isSubmitting ? "bg-blue-500/50" : "bg-blue-500"
                } mt-4 px-4 py-2  text-white rounded-md w-auto`}
                type="submit"
                name="formAction"
                value="signup"
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
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </fieldset>
        </Form>

        <p>
          Already registered?{" "}
          <span>
            <Link className="text-blue-500" to="/login">
              Log in
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

export function ErrorBoundary() {
  // const error = useRouteError() as Response;
  // console.error(error);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ErrorCard />
    </div>
  );
}
