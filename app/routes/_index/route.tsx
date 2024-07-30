import { Link } from "@remix-run/react";
import { useCustomTranslation } from "~/hooks";

const Main = () => {
  const index = useCustomTranslation("index");
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center dark:text-white">
      <h1 className="text-8xl">{index.title}</h1>
      <p className="text-2xl">{index.description}</p>
      <Link className="text-4xl text-blue-600 underline" to="/home">
        {index.link}
      </Link>
    </div>
  );
};

export default Main;
