import { useState } from "react";

export const SearchContact = ({ onSearch, onCancel }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSubmit}>Search</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
