import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 flex justify-center gap-4">
      <input
        type="text"
        placeholder="Search by Name or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />
    </div>
  );
};

export default SearchBar;
