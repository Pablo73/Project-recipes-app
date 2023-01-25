import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
        data-testid="email-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
        data-testid="password-input"
      />
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
