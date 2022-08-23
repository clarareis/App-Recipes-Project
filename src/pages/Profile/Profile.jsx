import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import './Profile.css';
import Footer from '../../components/Footer/Footer';

function Profile() {
  const history = useHistory();
  const email = useSelector((state) => state.userReducer.email);
  return (

    <section
      className="profile_content"
    >
      <Header headerName="Profile" />
      <h1>Profile</h1>
      <main>
        <p data-testid="profile-email">
          { email }

        </p>
        <button
          onClick={ () => { history.push('/done-recipes'); } }
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>

        <button
          onClick={ () => { history.push('/favorite-recipes'); } }
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>

        <button
          onClick={ () => { history.push('/'); localStorage.clear(); } }
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </main>
      <Footer />
    </section>
  );
}

export default Profile;
