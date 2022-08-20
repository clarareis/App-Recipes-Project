import React, { useEffect, useState } from 'react';
import './styles.css';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

function Header({ headerName }) {
  const history = useHistory();
  const [showSearchBtn, setShowHeaderBtn] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (headerName === 'Done Recipes' || headerName === 'Profile'
    || headerName === 'Favorite Recipes') return setShowHeaderBtn(false);
    setShowHeaderBtn(true);
  }, [headerName]);

  return (
    <header
      className="header_content"
    >
      <h2
        data-testid="page-title"
      >
        { headerName }
      </h2>
      <section>
        <button
          onClick={ () => history.push('profile') }
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            alt="profileIcon"
            src={ profileIcon }
          />
        </button>

        {
          showSearchBtn && (
            <button
              onClick={ () => setShowSearch(!showSearch) }
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
      </section>
      {
        showSearch && (
          <input
            data-testid="search-input"
          />
        )
      }
    </header>
  );
}

Header.propTypes = {
  headerName: propTypes.string.isRequired,
};

export default Header;
