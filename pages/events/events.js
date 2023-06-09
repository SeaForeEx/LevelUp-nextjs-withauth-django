/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const showEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };
  useEffect(() => {
    showEvents();
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button onClick={() => {
        router.push('/events/new');
      }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard id={event.id} description={event.description} date={event.date} time={event.time} joined={event.joined} game={event.game.title} onUpdate={showEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
