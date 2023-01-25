import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';

function Header() {
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
    </header>
  );
}

export default Header;
