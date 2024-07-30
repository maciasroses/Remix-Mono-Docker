import { useEffect } from "react";
import { ErrorCard } from "~/components";
import { Header, Sidebar } from "./components";
import { useAuth } from "~/providers/AuthContext";
import { getUser } from "~/services/user/controller.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
  return json({ user });
};

const Home = () => {
  const { user } = useLoaderData<typeof loader>();
  const { setUser } = useAuth();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <>
      <Header user={user} />
      <main className="w-full max-w-[1440px] mx-auto">
        <Sidebar />
        <section className="sm:ml-48 mt-20 p-4 bg-gray-200 dark:bg-gray-900">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Home;

export function ErrorBoundary() {
  // const error = useRouteError() as Response;
  // console.error(error);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ErrorCard />
    </div>
  );
}
