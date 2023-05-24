import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SearchProfile } from "./SearchProfile";
import Link from "next/link";
import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleLoginClick = () => {
    if (authContext?.user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      authContext?.setUser(null);
      router.push("/login");
    } else {
      router.push("/login");
    }
  };
  return (
    <nav className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 ">
      <div className="container mx-auto py-3 flex flex-wrap items-center justify-between px-2">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Portfolio Generator
          </span>
        </Link>
        <div className="flex gap-5">
          <SearchProfile />
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoginClick}
          >
            {authContext?.user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700"></div>
    </nav>
  );
}

export default Navbar;
