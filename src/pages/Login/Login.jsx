import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import {
  emailVerification,
  passwordVerification,
} from '../../verifyUserData/emailAndPAsswordVerification';
import { updateLocalStore } from '../../LocalStore/LocalStore';
import { setUser } from '../../Redux/actions/recipesActions/recipeActions';
import './Login.css';

function Login({ history }) {
  const [userData, setuserData] = useState({
    email: '',
    password: '',
  });

  const [disabledButton, setDisabledButton] = useState(true);

  const handleUserData = ({ name, value }) => setuserData({ ...userData, [name]: value });

  const dispatch = useDispatch();

  const sigin = () => {
    history.push('/foods');
    updateLocalStore('user', { email: userData.email });
    updateLocalStore('mealsToken', 1);
    updateLocalStore('cocktailsToken', 1);
    dispatch(setUser(userData.email));
  };

  useEffect(() => {
    const verifyUserData = () => {
      if (emailVerification(userData.email) && passwordVerification(userData.password)) {
        setDisabledButton(false);
        return;
      }
      setDisabledButton(true);
    };
    verifyUserData();
  }, [userData]);

  return (
    <section>
      <form id="login-form">
        <label htmlFor="email">
          <input
            data-testid="email-input"
            id="email"
            placeholder="email"
            onChange={ ({ target }) => handleUserData(target) }
            name="email"
            value={ userData.email }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            id="password"
            placeholder="password"
            onChange={ ({ target }) => handleUserData(target) }
            name="password"
            value={ userData.password }
          />
        </label>
        <button
          onClick={ sigin }
          data-testid="login-submit-btn"
          disabled={ disabledButton }
          type="button"
        >
          Enter
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
