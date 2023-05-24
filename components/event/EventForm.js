/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  description: '',
  date: '',
  time: '',
  organizer: '',
  game: '',
};

const EventForm = ({ obj }) => {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentEvent({
        id: obj.id,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        game: obj.game.id,
        organizer: obj.organizer,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      game: currentEvent.game,
      userId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select aria-label="game" name="game" onChange={handleChange} required value={currentEvent.game}>
            <option value="">Pick a Game</option>
            {
              games.map((game) => (
                <option
                  key={game.id}
                  value={game.id}
                >
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            type="date"
            required
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" type="time" format="hh:mm A" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.object,
    organizer: PropTypes.object,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
