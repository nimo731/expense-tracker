import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search expenses..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;   