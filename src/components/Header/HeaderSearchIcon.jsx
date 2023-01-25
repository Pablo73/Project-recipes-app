import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function HeaderSearchIcon() {
  const history = useHistory();
  return (
    <header>
      <div>
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
      <div>
        <img
          src={ searchIcon }
          alt="Search icon"
          data-testid="search-top-btn"
        />
      </div>
    </header>
  );
}

export default HeaderSearchIcon;
