import React, { useState, useEffect } from 'react';
import {
  emailVerification,
  passwordVerification,
} from '../../verifyUserData/emailAndPAsswordVerification';

function Login() {
  const [userData, setuserData] = useState({
    email: '',
    password: '',
  });

  const [disabledButton, setDisabledButton] = useState(true);

  const handleUserData = ({ name, value }) => setuserData({ ...userData, [name]: value });

  const verifyUserData = () => {
    if (emailVerification(userData.email) && passwordVerification(userData.password)) {
      setDisabledButton(false);
      return;
    }
    setDisabledButton(true);
  };

  useEffect(() => {
    verifyUserData();
  }, [userData]);

  return (
    <section>
      <form>
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

export default Login;
