import { useState } from 'react';

function Login() {
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
    // console.log(email);
    const valiEmail = validation.test(email);
    const valiPass = password.length >= six;
    const valid = !valiEmail || !valiPass;
    setDisabled(valid);
  };

  console.log(password);

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={ email }
        onChange={ ({ target }) => handleChange(target, setEmail) }
        // onChange={ ({ target }) => setEmail(target.value) }
        data-testid="email-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ ({ target }) => handleChange(target, setPassword) }
        // onChange={ ({ target }) => setPassword(target.value) }
        data-testid="password-input"
      />
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
        // onClick={  }
        disabled={ isDisabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
