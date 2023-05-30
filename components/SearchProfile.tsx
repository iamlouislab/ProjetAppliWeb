import { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "./ui/input";

export function SearchProfile() {
const [search, setSearch] = useState<string>("");
const router = useRouter();

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
router.push(`/profile/${search}`);
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearch(e.target.value);
};

return (
<form
   className="flex w-full max-w-sm items-center space-x-2"
   onSubmit={handleSearch}
 >
<Input
     type="Profile"
     placeholder="Username"
     onChange={handleInputChange}
     className="rounded-md pl-3 h-10 mr-5"
   />
<button
     type="submit"
     className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded h-[40px]"
   >
Search
</button>
</form>
);
}
