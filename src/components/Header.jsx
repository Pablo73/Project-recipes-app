import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Button from './Button';

function Header({ withSearchIcon, title }) {
  const history = useHistory();
  const [search, setSearch] = useState(false);

  const toggleSearch = () => (search ? setSearch(false) : setSearch(true));
  return (
    <header>
      <div>
        <h1 data-testid="page-title">{ title }</h1>
        <Button
          onButtonClick={ () => history.push('/profile') }
          buttonImg={ {
            src: profileIcon,
            alt: 'Profile icon',
            testId: 'profile-top-btn',
          } }
        />
      </div>
      { withSearchIcon
      && (
        <Button
          testId="search-btn"
          onButtonClick={ toggleSearch }
          buttonImg={ {
            src: searchIcon,
            alt: 'Search icon',
            testId: 'search-top-btn',
          } }
        />)}
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
