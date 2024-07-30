import { Link, useLocation } from "@remix-run/react";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const location = useLocation();
  const currentPage = Number(location.search.split("page=")[1]) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm mt-4 justify-center w-full">
        <li>
          {currentPage > 1 ? (
            <Link
              to={createPageURL(currentPage - 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          ) : (
            <span
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-300 bg-gray-100 border border-e-0 border-gray-300 rounded-s-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              Previous
            </span>
          )}
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1}>
            <Link
              to={createPageURL(i + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                currentPage === i + 1
                  ? "text-white bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        <li>
          {currentPage < totalPages ? (
            <Link
              to={createPageURL(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          ) : (
            <span
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-gray-100 border rounded-e-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
