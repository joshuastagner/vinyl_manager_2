import React from 'react';

const SearchBar = ({ showSearchBar, submit, token, url }) => {
  console.log(submit)
  if (!showSearchBar) {
    return null;
  }

  let input;

  return (
    <div>
      <h2>Search Discogs</h2>
      <form onSubmit={(e) => {
          e.preventDefault();
          submit(url, token, input.value);
          input.value = '';
        }
      }>
        <input type="text" ref={node => {input = node}}/>
        <input type="submit" value="search" />
      </form>
    </div>
  );
};

export default SearchBar;
