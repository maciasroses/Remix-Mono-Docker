import { useCustomTranslation } from "~/hooks";
import { Link, Outlet } from "@remix-run/react";
import { useAuth } from "~/providers/AuthContext";

const Accounting = () => {
  const { user } = useAuth();
  const accounting = useCustomTranslation("accounting");
  return (
    <>
      <div className="relative w-full">
        <Link to="/home/accounting">
          <h1
            className={`text-4xl md:text-6xl text-center dark:text-white ${
              user?.role === "admin" && "pt-16"
            }`}
          >
            {accounting.title}
          </h1>
        </Link>
        {user?.role === "admin" && (
          <Link to="create">
            <button className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
              Create
            </button>
          </Link>
        )}
      </div>
      <p className="text-2xl md:text-xl text-center dark:text-white">
        {accounting.description}
      </p>
      <Outlet />
    </>
  );
};

export default Accounting;
