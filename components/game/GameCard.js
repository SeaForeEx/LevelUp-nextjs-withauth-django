import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({ // props are the parameters
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  // Define a function to handle deleting the game
  const deleteThisGame = () => {
    // Display a confirmation dialog to confirm the deletion
    if (window.confirm('Delete Game?')) {
      // Call the deleteGame function to delete the game by its ID
      deleteGame(id).then(() => onUpdate()); // Call the onUpdate function to update the game list after deletion
    }
  };

  const router = useRouter(); // Get the router instance from Next.js

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header> {/* Display the game title */}
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title> {/* Display the game maker */}
        <Card.Text>{numberOfPlayers} players needed</Card.Text> {/* Display the number of players needed */}
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer> {/* Display the game's skill level */}
      <Button
        onClick={() => {
          router.push(`/games/edit/${id}`); // Navigate to the game edit page when clicked
        }}
      >
        Edit Game
      </Button>
      <Button onClick={deleteThisGame}>
        Delete
      </Button>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired, // ID of the game (required)
  title: PropTypes.string.isRequired, // Title of the game (required)
  maker: PropTypes.string.isRequired, // Maker of the game (required)
  numberOfPlayers: PropTypes.number.isRequired, // Number of players needed for the game (required)
  skillLevel: PropTypes.number.isRequired, // Skill level of the game (required)
  onUpdate: PropTypes.func.isRequired, // Callback function to update the game list (required)
};

export default GameCard;
