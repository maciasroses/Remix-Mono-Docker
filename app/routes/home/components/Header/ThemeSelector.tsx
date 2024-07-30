import { useEffect, useRef, useState } from "react";
import { useTheme } from "~/providers/ThemeProvider";

const LightIcon = ({ theme }: { theme: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`size-6  mr-2 transition duration-75 ${
      theme === "light"
        ? "text-blue-500"
        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const DarkIcon = ({ theme }: { theme: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`size-6  mr-2 transition duration-75 ${
      theme === "dark"
        ? "text-blue-500"
        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

const SystemIcon = ({ theme }: { theme: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className={`size-6  mr-2 transition duration-75 ${
      theme === "system"
        ? "text-blue-500"
        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
    />
  </svg>
);

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(darkModeMediaQuery.matches ? "dark" : "light");

    darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div>
        <button type="button" onClick={toggleMenu}>
          {theme === "light" ||
          (theme === "system" && systemTheme === "light") ? (
            <LightIcon theme={theme} />
          ) : (
            <DarkIcon theme={theme} />
          )}
        </button>
      </div>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          aria-roledescription="menu"
        >
          <div className="py-1" aria-roledescription="none">
            <button
              className={`flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group w-full hover:bg-gray-100 ${
                theme === "light"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
              onClick={() => handleThemeChange("light")}
            >
              <LightIcon theme={theme} />
              <span>Light</span>
            </button>
            <button
              className={`flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group w-full hover:bg-gray-100 ${
                theme === "dark"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
              onClick={() => handleThemeChange("dark")}
            >
              <DarkIcon theme={theme} />
              <span>Dark</span>
            </button>
            <button
              className={`flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group w-full hover:bg-gray-100 ${
                theme === "system"
                  ? "text-blue-500"
                  : "text-gray-900 dark:text-white"
              }`}
              onClick={() => handleThemeChange("system")}
            >
              <SystemIcon theme={theme} />
              <span>System</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
