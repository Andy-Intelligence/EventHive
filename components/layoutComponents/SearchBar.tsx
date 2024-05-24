"use client"

import {useEffect,useState} from 'react';
import {AiOutlineCopy, AiOutlineSearch} from 'react-icons/ai'
import {FiLink2} from 'react-icons/fi'
import {AiOutlineEnter} from 'react-icons/ai'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { BsEmojiSmile, BsFilter } from 'react-icons/bs';
import { useDebouncedCallback } from "use-debounce";
const SearchBar: React.FC = () => {
   const pathname = usePathname();
   const { replace } = useRouter();
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

 const handleSearch = useDebouncedCallback((term) => {
    // Handle search functionality here
    const params = new URLSearchParams(searchParams)
     if (term) {
       params.set("query", term);
     } else {
       params.delete("query");
     }
     replace(`${pathname}?${params.toString()}`);
    // e.preventDefault()
    // console.log('Search:', searchQuery);
    // try {
    //   const res = await fetch(
    //     `http://localhost:3000/api/search/${searchQuery}`,
    //     {
    //       method: "GET",
    //       // body: JSON.stringify({ searchQuery }),
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
  
    //   if (!res.ok) {
    //     console.log(res);
    //     throw new Error("Failed to search Event");
    //   }
  
    //   // router.refresh();
    //   // router.push("/find-event");
    //   const searchData = await res.json();
    // console.log("Search Result:", searchData);
    // } catch (error) {
    //   console.error(error);
    // }
  
  },200);

  const handleFilter = (e:any) => {
    e.preventDefault()
    // Handle filter functionality here
    console.log('Filter clicked');
  };

  return (
    <div className="flex items-center p-2 gap-2 h-[4.5rem]">
      <form
        className="relative flex justify-center items-center w-full h-full"
        // onSubmit={handleSearch}
      >
        <BsEmojiSmile size={30} className="absolute left-0 my-2 ml-3 w-6" />

        <input
          type="text"
          placeholder="Search..."
          // value={searchQuery}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
          required
          className=" digitalID-input peer block w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-24 text-lg shadow-lg font-sans font-medium focus:border-black focus:outline-none focus:ring-0  pl-10 h-full  "
        />

        <button
          type="submit"
          // onClick={}
          className="submit-btn hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700"
        >
          <AiOutlineSearch size={32} />
        </button>

        <button
          className="submit-btn hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-12 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700"
          onClick={handleFilter}
        >
          <BsFilter size={32} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;










