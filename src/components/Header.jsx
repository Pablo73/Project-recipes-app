import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Button from './Button';
import '../assets/css/Header.css';

function Header({ withSearchIcon, title }) {
  const history = useHistory();
  const [search, setSearch] = useState(false);

  const toggleSearch = () => (search ? setSearch(false) : setSearch(true));
  return (
    <header>
      <div className="app-header">
        <h1 data-testid="page-title" className="title">{ title }</h1>
        <div className="buttons-container">
          <Button
            onButtonClick={ () => history.push('/profile') }
            buttonClass="button-icon"
            buttonImg={ {
              src: profileIcon,
              alt: 'Profile icon',
              testId: 'profile-top-btn',
            } }
          />

          { withSearchIcon
      && (
        <Button
          testId="search-btn"
          buttonClass="button-icon"
          onButtonClick={ toggleSearch }
          buttonImg={ {
            src: searchIcon,
            alt: 'Search icon',
            testId: 'search-top-btn',
          } }
        />)}
        </div>
      </div>
      <div>
        { search
      && <SearchBar />}
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = ({
  withSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
});
