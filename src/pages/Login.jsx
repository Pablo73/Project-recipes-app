function Login() {
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        // value={ email }
        data-testid="email-input"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
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
