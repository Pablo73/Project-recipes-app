import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ withSearchIcon, title }) {
  const history = useHistory();
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
        <div>
          <img
            src={ searchIcon }
            alt="Search icon"
            data-testid="search-top-btn"
          />
        </div>)}
    </header>
  );
}

export default Header;

Header.propTypes = ({
  withSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
});
