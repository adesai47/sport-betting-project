// src/GameDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface GameDetailsProps {
  apiKey: string;
}

interface Odds {
  bookmaker: string;
  markets: Array<{
    outcomes: Array<{
      name: string;
      price: number;
    }>;
  }>;
}

interface Game {
  id: string;
  home_team: string;
  away_team: string;
  commence_time: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({ apiKey }) => {
  const { gameId, sport } = useParams<{ gameId: string; sport: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [odds, setOdds] = useState<Odds[]>([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await fetch(
          `https://api.the-odds-api.com/v4/sports/${sport}/events/${gameId}?apiKey=${apiKey}`
        );
        const gameData = await gameResponse.json();
        setGame(gameData);

        const oddsResponse = await fetch(
          `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?apiKey=da52f74833da22f20b3770dce701ef20&regions=us&markets=h2h&dateFormat=iso&oddsFormat=american&commenceTimeFrom=2024-09-09T00%3A00%3A00Z&commenceTimeTo=2025-08-09T00%3A00%3A00Z
`
        );
        const oddsData = await oddsResponse.json();
        setOdds(oddsData);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    if (gameId) {
      fetchGameDetails();
    }
  }, [gameId, sport, apiKey]);

  if (!game) {
    return <div>Loading game details...</div>;
  }

  return (
    <div className="game-details">
      <h2>{`${game.home_team} vs ${game.away_team}`}</h2>
      <p>{`Commence time: ${new Date(game.commence_time).toLocaleString()}`}</p>
      <h3>Odds</h3>
      {odds.map((odd, index) => (
        <div key={index} className="bookmaker">
          <h4>{odd.bookmaker}</h4>
          {odd.markets.map((market, idx) => (
            <div key={idx} className="market">
              {market.outcomes.map((outcome, id) => (
                <p key={id}>{`${outcome.name}: ${outcome.price}`}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameDetails;
