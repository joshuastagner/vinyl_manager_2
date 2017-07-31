import React from 'react';

const SearchBar = ({ showSearchBar, submit, token, url }) => {
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
        <p>
          <input type="text" ref={node => {input = node}}/>
          <button id="search-button" type="submit">search</button>
        </p>
      </form>
    </div>
  );
};

export default SearchBar;
