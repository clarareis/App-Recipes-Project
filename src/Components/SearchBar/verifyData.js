/* eslint-disable no-alert */
export const isAItem = (recipes, history, nowPath) => {
  if (recipes.length === 1) {
    if (nowPath === 'foods') {
      history.push(`/${nowPath}/${recipes[0].idMeal}`);
    } else if (nowPath === 'drinks') {
      history.push(`/${nowPath}/${recipes[0].idDrink}`);
    }
  }
};

export const verifyIsALetter = (filter, nameOfItem) => {
  if (filter === 'first-letter' && nameOfItem.length > 1) {
    alert('Your search must have only 1 (one) character');
  }
};
