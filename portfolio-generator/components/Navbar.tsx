import { useRouter } from "next/router";
import React from "react";
import { SearchProfile } from "./SearchProfile";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const user = false;
  const handleLoginClick = () => {
    if (user) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };
  return (
    <nav className="border-gray-200 bg-white px-2 dark:border-gray-700 dark:bg-gray-900 ">
      <div className="container mx-auto py-3 flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Portfolio Generator
          </span>
        </Link>
        <div className="flex gap-5">
          <SearchProfile />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoginClick}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
