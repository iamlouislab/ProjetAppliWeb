import { useState } from "react";
import { useRouter } from "next/router";

export function SearchProfile() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <input
        type="Profile"
        placeholder="Username"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="rounded-md pl-3 h-10"
      />
      <button
        type="submit"
        onClick={() => {
          router.push(`/profile/${search}`);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
