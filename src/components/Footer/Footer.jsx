import React from 'react';
import drinkOne from '../../images/drinkIcon.svg';
import drinkTwo from '../../images/mealIcon.svg';

function Footer() {
  const pushForDrinks = () => {
    window.location.href = './drinks';
  };
  const pushForFoods = () => {
    window.location.href = './foods';
  };
  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ pushForDrinks }
      >
        <img
          alt="Drink"
          data-testid="drinks-bottom-btn"
          src={ drinkOne }
        />
      </button>
      <button
        type="button"
        onClick={ pushForFoods }
      >
        <img
          alt="Drinktwo"
          data-testid="food-bottom-btn"
          src={ drinkTwo }
        />
      </button>
    </footer>
  );
}

export default Footer;
