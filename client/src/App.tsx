// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SportGames from './SportGames';
import GameDetails from './GameDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sports" element={<SportGames />} />
          <Route
            path="/sports/:sport/games/:gameId"
            element={<GameDetails apiKey="da52f74833da22f20b3770dce701ef20" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
