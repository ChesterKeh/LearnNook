import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center"
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 flex-grow text-black"
        // Use "text-black" class to set the text color to black
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
      >
        Search
      </button>
    </form>
  );
}
