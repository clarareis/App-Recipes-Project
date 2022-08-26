import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRecipesByCategory,
  resetRecipeList } from '../../Redux/actions/recipesActions/recipeActions';
import { requestCategorys } from '../../services/fetchFoodsAndDrinks';
import './style.css';

function Categorys() {
  const [nowPath, setNowpath] = useState('');
  const [categorys, setCategorys] = useState([]);
  const [currentCategoryReference, setCurrentCategoryReference] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setNowpath(history.location.pathname.slice(1));
  }, [history.location.pathname]);

  const requestCategory = async () => {
    console.log(history.location.pathname);
    const nowCategorys = await requestCategorys(history.location.pathname);
    setCategorys([...nowCategorys, { strCategory: 'All' }]);
  };

  useEffect(() => {
    requestCategory();
  }, []);

  const getRecipeByCategory = (category) => {
    if (category === 'All') {
      dispatch(resetRecipeList(nowPath));
      setCurrentCategoryReference('');
      return;
    }
    if (currentCategoryReference === category) {
      dispatch(resetRecipeList(nowPath));
      setCurrentCategoryReference('');
      return;
    }
    setCurrentCategoryReference(category);
    dispatch(fetchRecipesByCategory(category, history.location.pathname));
  };

  useEffect(() => {
    setNowpath(history.location.pathname.slice(1));
  }, [history.location.pathname]);
  return (
    <section
      className="category_area"
    >
      {
        categorys.map((currentCategory) => (
          <button
            data-testid={ `${currentCategory.strCategory}-category-filter` }
            style={ {
              backgroundColor: currentCategory.strCategory === currentCategoryReference
                ? '#303030' : '#fff',
              color: currentCategory.strCategory !== currentCategoryReference
                ? '#303030' : '#fff',
            } }
            onClick={ () => getRecipeByCategory(currentCategory.strCategory) }
            type="button"
            key={ currentCategory.strCategory }
            name={ currentCategory.strCategory }
          >
            {currentCategory.strCategory}
          </button>
        ))
      }
    </section>
  );
}

export default Categorys;
