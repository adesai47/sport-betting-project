// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SportGames from './SportGames';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sports/:sport" element={<SportGames />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
