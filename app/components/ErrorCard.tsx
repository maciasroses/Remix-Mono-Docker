import { Link } from "@remix-run/react";

const ErrorCard = ({ isComponent = false }: { isComponent?: boolean }) => {
  return (
    <div className="p-4 text-center dark:text-white">
      <p className="text-5xl pb-4">X</p>
      <strong className="text-3xl">Something went wrong</strong>
      <p className="text-2xl">We are working to get it working again</p>
      {!isComponent && (
        <Link className="text-lg text-blue-600 pt-2" to="/">
          Go home
        </Link>
      )}
    </div>
  );
};

export default ErrorCard;
