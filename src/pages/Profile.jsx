import React from 'react';
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
    </div>
  );
}

export default Profile;
