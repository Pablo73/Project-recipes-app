import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <header>
        <Header
          title="Profile"
          withSearchIcon={ false }
        />
      </header>
      <Footer />
    </div>
  );
}

export default Profile;
