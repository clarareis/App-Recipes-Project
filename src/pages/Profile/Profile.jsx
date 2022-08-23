import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import './Profile.css';
import Footer from '../../components/Footer/Footer';
import { getLocalStore } from '../../LocalStore/LocalStore';

function Profile() {
  const data = getLocalStore('user');
  const history = useHistory();

  return (

    <section
      className="profile_content"
    >
      <Header headerName="Profile" />
      <h1>Profile</h1>
      <main>
        <p data-testid="profile-email">
          { data.email }
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
