import { setIsDarkMode, setIsSideBarCollapsed } from "@/state";
import { Menu, Moon, Search, Settings2, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux";

function Navbar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black dark:text-white w-full">
      {/* Search bar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            className=""
            onClick={() => dispatch(setIsSideBarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white cursor-pointer transition-all hover:scale-105" />
          </button>
        )}
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            className="w-full rounded border-none bg-gray-200 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
              : "h-min w-min rounded p-2 hover:bg-gray-200 transition-all duration-300 ease-in-out"
          }
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
        >
          {isDarkMode ? (
            <Moon className="h-min w-min cursor-pointer dark:text-white" />
          ) : (
            <Sun className="h-min w-min cursor-pointer dark:text-white" />
          )}
        </button>
        <Link href="/settings" className="h-min w-min">
          <Settings2
            className={
              isDarkMode
                ? "h-min w-min rounded p-2 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
                : "h-min w-min rounded p-2 hover:bg-gray-200 transition-all duration-300 ease-in-out"
            }
          />
        </Link>
        <div className="ml-2 mr-5 min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block hidden" />
      </div>
    </div>
  );
}

export default Navbar;
