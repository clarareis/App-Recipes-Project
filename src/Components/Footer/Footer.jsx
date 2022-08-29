import React from 'react';
import { Link } from 'react-router-dom';
import drink from '../../images/drinkIcon.svg';
import food from '../../images/mealIcon.svg';
import './footerStyle.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="./drinks">
        <img
          alt="Drink"
          data-testid="drinks-bottom-btn"
          src={ drink }
        />
      </Link>
      <Link to="./foods">

        <img
          alt="Food"
          data-testid="food-bottom-btn"
          src={ food }
        />
      </Link>

    </footer>
  );
}

export default Footer;
