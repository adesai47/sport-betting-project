// src/SportGames.tsx
import React, { useEffect, useState } from 'react';
import './SportGames.css';
import { FaBaseball, FaFootball, FaBasketball } from 'react-icons/fa6';
import { PiSoccerBallFill } from 'react-icons/pi';

interface Game {
  home_team: string;
  away_team: string;
  commence_time: string;
}

const apiKey = 'da52f74833da22f20b3770dce701ef20';

const sports = [
  {
    key: 'americanfootball_nfl',
    displayName: 'Football (NFL)',
    icon: <FaFootball />,
    apiUrl: `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events?apiKey=${apiKey}`,
  },
  {
    key: 'basketball_nba_championship_winner',
    displayName: 'Basketball (NBA)',
    icon: <FaBasketball />,
    apiUrl: `https://api.the-odds-api.com/v4/sports/basketball_nba_championship_winner/events?apiKey=${apiKey}`,
  },
  {
    key: 'baseball_mlb',
    displayName: 'Baseball (MLB)',
    icon: <FaBaseball />,
    apiUrl: `https://api.the-odds-api.com/v4/sports/baseball_mlb/events?apiKey=${apiKey}`,
  },
  {
    key: 'soccer_epl',
    displayName: 'Soccer (EPL)',
    icon: <PiSoccerBallFill />,
    apiUrl: `https://api.the-odds-api.com/v4/sports/soccer_epl/events?apiKey=${apiKey}`,
  },
];

function SportGames() {
  const [games, setGames] = useState<{ [key: string]: Game[] }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  useEffect(() => {
    sports.forEach((sport) => {
      fetchGames(sport.apiUrl, sport.key);
    });
  }, []);

  async function fetchGames(apiUrl: string, sportKey: string) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Error fetching games for ${sportKey}: ${response.statusText}`
        );
      }
      const data: Game[] = await response.json();
      setGames((prev) => ({ ...prev, [sportKey]: data }));
      setErrors((prev) => ({ ...prev, [sportKey]: null }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setErrors((prev) => ({ ...prev, [sportKey]: errorMessage }));
    }
  }

  function handleSportClick(sportKey: string) {
    setSelectedSport((prev) => (prev === sportKey ? null : sportKey));
  }

  return (
    <div className="sport-games-container">
      <h1>BetChamp</h1>
      <div className="sports-icons">
        {sports.map((sport) => (
          <div
            key={sport.key}
            className="sport-icon"
            onClick={() => handleSportClick(sport.key)}>
            {sport.icon}
            <span>{sport.displayName}</span>
          </div>
        ))}
      </div>
      {selectedSport && (
        <div className="sport-section">
          <h2>
            {sports.find((sport) => sport.key === selectedSport)?.icon}{' '}
            {sports.find((sport) => sport.key === selectedSport)?.displayName}
          </h2>
          {errors[selectedSport] ? (
            <p className="error">{errors[selectedSport]}</p>
          ) : (
            <div className="game-list">
              {games[selectedSport]?.length > 0 ? (
                games[selectedSport].map((game, index) => (
                  <div key={index} className="game">
                    <span>
                      {game.home_team} vs {game.away_team}
                    </span>
                    <span>{new Date(game.commence_time).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p>No upcoming games found.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SportGames;
