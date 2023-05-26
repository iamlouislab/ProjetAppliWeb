import { useState } from "react";
import { useRouter } from "next/router";

export function MyProfil() {
  const router = useRouter();
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <button
        type="submit"
        onClick={() => {
          router.push(`/profile`);
        }}
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
        My Profil
      </button>
    </div>
  );
}
