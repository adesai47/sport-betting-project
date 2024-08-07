import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleLogin() {
    console.log('Logging in:', { username, password });
  }

  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-button" onClick={handleLogin}>
        <span>→</span>
      </div>
      <p>
        Don't have an account? <Link to="/register">REGISTER</Link>
      </p>
    </div>
  );
}

export default LoginPage;
