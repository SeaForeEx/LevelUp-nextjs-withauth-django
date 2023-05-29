import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const showGames = () => {
    getGames().then((data) => setGames(data));
  }; // sets up function as a prop that can be passed
  useEffect(() => {
    showGames();
  }, []);

  // useEffect runs on second render when promises have run
  // h1 button etc show up on first render
  // data doesn't show up until useEffect runs

  return (
    <article className="games">
      <h1>Games</h1>
      <Button onClick={() => {
        router.push('/games/new');
      }}
      >
        Register New Game
      </Button>
      {/* converting snake case data to camel case data for client */}
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} onUpdate={showGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;
