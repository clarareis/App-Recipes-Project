import React, { useState } from 'react';

function Login() {
  const [userData, setuserData] = useState({
    email: '',
    password: '',
  });

  const handleUserData = ({ name, value }) => setuserData({ ...userData, [name]: value });

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
          type="button"
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
