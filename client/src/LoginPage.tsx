import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  function handleLogin() {
    console.log('Logging in:', { username, password });
    setTimeout(() => {
      navigate('/sports');
    }, 1000);
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
        Don't have an account? <a href="/register">REGISTER</a>
      </p>
    </div>
  );
}

export default LoginPage;
