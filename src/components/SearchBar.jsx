import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search by name or email..."
    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
  />
);
export default SearchBar;


