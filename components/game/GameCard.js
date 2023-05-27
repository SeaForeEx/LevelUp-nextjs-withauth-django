import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

const GameCard = ({
  id,
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const deleteThisGame = () => {
    if (window.confirm('Delete Game?')) {
      deleteGame(id).then(() => onUpdate());
    }
  };
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Button
        onClick={() => {
          router.push(`/games/edit/${id}`);
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
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
