import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';

const EventCard = ({
  id,
  description,
  date,
  time,
}) => {
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
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EventCard;
