import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SearchProfile } from "./SearchProfile";
import Link from "next/link";
import { AuthContext } from "../contexts/authContext";
import { MyProfil } from "./myProfil";
import User from "@/types/User";

function Navbar() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const handleLoginClick = () => {
    if (authContext?.user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      authContext?.setUser(null as unknown as User);
      router.push("/login");
    } else {
      router.push("/login");
    }
  };
  return (

      <nav className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 flex-row">

        <div className="mx-4 py-3 flex  items-center justify-between px-20"  >
        <div className="flex">
          <Link href="/" className="self-center px-3">
            <div className="flex gap-4">
              <img src="logo2.png" />
              <span className="text-xl self-center font-semibold dark:text-white">
                Portfolio Generator
              </span>
            </div>
          </Link>
        </div>

          <div className="flex gap-5 justify-end h-[40px]">
            <SearchProfile />
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleLoginClick}
            >
              {authContext?.user ? "Logout" : "Login"}
            </button>
            {authContext?.user ? <MyProfil/> : ""}
          </div>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700"></div>
      </nav>
  );
}

export default Navbar;
