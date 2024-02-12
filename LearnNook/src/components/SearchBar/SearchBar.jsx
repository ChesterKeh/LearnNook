import React, { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the searchQuery, like sending it to a backend API
    console.log("Search query:", searchQuery);
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
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 flex-grow"
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
