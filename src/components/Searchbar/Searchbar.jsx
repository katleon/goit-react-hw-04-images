import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';

const Searchbar = ({ onSearch }) => {
  const [searchRequest, setSearchRequest] = useState('');
  const [lastSearchRequest, setLastSearchRequest] = useState('');

  const handleRequestChange = event => {
    setSearchRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchRequest.trim() === '') {
      return toast.warning('Search field is empty!');
    }

    if (searchRequest === lastSearchRequest) {
      return toast.warning('You have already searched for this phrase!');
    }

    onSearch(searchRequest);
    setLastSearchRequest(searchRequest);
    setSearchRequest('');
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <FaSearch size={12} />
        </button>

        <input
          className={css.input}
          type="text"
          name="searchRequest"
          value={searchRequest}
          onChange={handleRequestChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
