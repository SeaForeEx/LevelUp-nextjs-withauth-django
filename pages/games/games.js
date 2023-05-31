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
          <GameCard
            id={game.id} // Pass the game ID as a prop to GameCard
            title={game.title} // Pass the game title as a prop to GameCard
            maker={game.maker} // Pass the game maker as a prop to GameCard
            numberOfPlayers={game.number_of_players} // Pass the number of players as a prop to GameCard
            skillLevel={game.skill_level} // Pass the skill level as a prop to GameCard
            onUpdate={showGames}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
