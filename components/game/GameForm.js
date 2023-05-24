import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  createGame, getGameTypes, updateGame,
} from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ obj }) => {
  // const [formInput, setFormInput] = useState(initialState);
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  // const [currentGame, setCurrentGame] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   getGames(user.uid).then(setCurrentGame);
  //   if (obj.id) setFormInput(obj);
  // }, [obj, user]);

  useEffect(() => {
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: obj.numberOfPlayers,
        skillLevel: obj.skillLevel,
        gameType: obj.gameType.id,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate if the input is a valid integer
    if (name === 'numberOfPlayers' && !Number.isInteger(Number(value))) {
      return; // Do not update the state if the input is not a valid integer
    }

    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   // Validate if the input is a valid integer
  //   if (name === 'numberOfPlayers' && !Number.isInteger(Number(value))) {
  //     return; // Do not update the state if the input is not a valid integer
  //   }

  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    // Check if the game has an ID (existing game being updated)
    if (obj.id) {
      // Prepare game data for update
      const gameUpdate = {
        id: obj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: currentGame.numberOfPlayers,
        skillLevel: currentGame.skillLevel,
        gameType: currentGame.gameType,
        userId: user.uid,
      };
      updateGame(gameUpdate)
        .then(() => router.push('/games/games'));
    } else {
      // Prepare game data for creation
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: currentGame.numberOfPlayers,
        skillLevel: currentGame.skillLevel,
        gameType: currentGame.gameTypeId,
        userId: user.uid,
      };
      // Send POST request to your API
      createGame(game).then(() => router.push('/games/games'));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (obj.id) {
  //     updateGame(formInput)
  //       .then(() => router.push('/games/games'));
  //   } else {
  //     const game = { ...formInput, uid: user.uid };
  //     createGame(game).then(({ name }) => {
  //       const patchPayload = { id: name };
  //       updateGame(patchPayload).then(() => {
  //         router.push('/games/games');
  //       });
  //     });
  //   }
  // };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Game</h2>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select aria-label="gametype" name="gameTypeId" onChange={handleChange} required value={currentGame.gameType}>
            <option value="">Pick a Type</option>
            {
              gameTypes.map((type) => (
                <option
                  key={type.id}
                  value={type.id}
                >
                  {type.label}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    gameType: PropTypes.object,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
