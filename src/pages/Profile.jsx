import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')) || '';

  function toggleDoneRecipes(path) {
    history.push(path);
  }
  function toggleFavoriteRecipes(path) {
    history.push(path);
  }
  function toggleLogout(path) {
    history.push(path);
    localStorage.clear('userProfile');
  }
  return (
    <div>
      <header>
        <Header
          title="Profile"
          withSearchIcon={ false }
        />
      </header>
      <div>
        <p data-testid="profile-email">{user.email}</p>
        <button
          data-testid="profile-done-btn"
          onClick={ () => toggleDoneRecipes('/done-recipes') }
        >
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => toggleFavoriteRecipes('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ () => toggleLogout('/') }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
