import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  description,
  date,
  time,
  onUpdate,
}) => {
  const deleteThisEvent = () => {
    if (window.confirm('Delete Event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Header>EVENT</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/edit/${id}`);
        }}
      >
        Edit Event
      </Button>
      <Button onClick={deleteThisEvent}>
        Delete
      </Button>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
