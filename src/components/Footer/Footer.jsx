import React from 'react';
import { Link } from 'react-router-dom';
import drinkOne from '../../images/drinkIcon.svg';
import drinkTwo from '../../images/mealIcon.svg';
import './footerStyle.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="./drinks">
        <img
          alt="Drink"
          data-testid="drinks-bottom-btn"
          src={ drinkOne }
        />
      </Link>
      <Link to="./foods">

        <img
          alt="Drinktwo"
          data-testid="food-bottom-btn"
          src={ drinkTwo }
        />
      </Link>

    </footer>
  );
}

export default Footer;
