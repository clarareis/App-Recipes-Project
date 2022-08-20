import React, { useEffect, useState } from 'react';
import './styles.css';
import propTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

function Header({ headerName }) {
  const [showSearch, setShowHeader] = useState(true);

  useEffect(() => {
    if (headerName === 'Done Recipes' || headerName === 'Profile'
    || headerName === 'Favorite Recipes') return setShowHeader(false);
    setShowHeader(true);
  }, [headerName]);

  return (
    <header
      className="header_content"
    >
      <button
        type="button"
      >
        <img
          data-testid="profile-top-btn"
          alt="profileIcon"
          src={ profileIcon }
        />
      </button>

      {
        showSearch && (
          <button
            type="button"
          >
            <img
              data-testid="search-top-btn"
              alt="profileIcon"
              src={ SearchIcon }
            />
          </button>
        )
      }

      <h2
        data-testid="page-title"
      >
        { headerName }
      </h2>
    </header>
  );
}

Header.propTypes = {
  headerName: propTypes.string.isRequired,
};

export default Header;
