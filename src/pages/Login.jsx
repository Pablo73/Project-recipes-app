import { useState } from 'react';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import Button from '../components/Button';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const handleChange = (target, setState) => {
    const { value } = target;
    setState(value);
    const six = 6;
    const validation = (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    );
    const valiEmail = validation.test(email);
    const valiPass = password.length >= six;
    const valid = !valiEmail || !valiPass;
    setDisabled(valid);
  };

  const userLogin = () => {
    const userObj = { email };
    const saveUserToLocalStorage = localStorage
      .setItem('user', JSON.stringify(userObj));
    history.push('/meals');
    return saveUserToLocalStorage;
  };

  return (
    <div className="recipe-app-login">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form className="form-class">
        <input
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => handleChange(target, setEmail) }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => handleChange(target, setPassword) }
          data-testid="password-input"
        />
        <Button
          testId="login-submit-btn"
          onButtonClick={ userLogin }
          isButtonDisabled={ isDisabled }
          buttonName="Enter"
          buttonClass="button-tertiary"
        />
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
