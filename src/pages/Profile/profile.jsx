import React from 'react';
import Header from '../../Components/Header';
import './Profile.css';
import Footer from '../../Components/Footer/Footer';

function profile() {
  return (
    <section
      className="profile_content"
    >
      <Header headerName="Profile" />
      <h1>profile</h1>
      <Footer />
    </section>
  );
}

export default profile;
