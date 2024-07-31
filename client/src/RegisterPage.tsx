import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  function handleRegister() {
    console.log('Registering:', { email, username, password });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <div className="register-container">
      <h1>REGISTER</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <div className="register-button" onClick={handleRegister}>
        <span>→</span>
      </div>
    </div>
  );
}

export default RegisterPage;
