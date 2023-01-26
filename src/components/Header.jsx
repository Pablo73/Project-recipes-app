import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ withSearchIcon, title }) {
  const history = useHistory();
  const [search, setSearch] = useState(false);

  const toggleSearch = () => (search ? setSearch(false) : setSearch(true));
  return (
    <header>
      <div>
        <h1 data-testid="page-title">{ title }</h1>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            src={ profileIcon }
            alt="Profile icon"
            data-testid="profile-top-btn"
          />
        </button>
      </div>
      { withSearchIcon
      && (
        <button
          type="button"
          onClick={ toggleSearch }
        >
          <img
            src={ searchIcon }
            alt="Search icon"
            data-testid="search-top-btn"
          />
        </button>)}
      { search
      && <SearchBar />}
    </header>
  );
}

export default Header;

Header.propTypes = ({
  withSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
});
