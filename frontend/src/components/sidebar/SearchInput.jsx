import React from "react";
import {Search} from "lucide-react"

export default function SearchInput() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="search"
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <Search/>
      </button>
    </form>
  );
}
