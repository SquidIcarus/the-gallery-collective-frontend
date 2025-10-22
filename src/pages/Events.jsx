import { useState, useEffect } from 'react';
import eventsService from '../services/events';

function Events() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const API_BASE = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await eventsService.getAll();
                console.log('Events data:', data);
                setEvents(data);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to load events');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    if (isLoading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (events.length === 0) {
        return (
            <div>
                <p>No events found.</p>
            </div>
        );
    }

    return (
        <div>
        <h1>Events</h1>
        <p>Discover upcoming events, pop-ups and exhibitions </p>

        <div>
            {events.map((event) => (
                <div key={event.id}>
                    <img
                    src={`${API_BASE}${event.image}`}
                    alt={event.title}
                    />
                    <h3>{event.title}</h3>
                    <p>Date: {formatDate(event.date)}</p>
                    <p>Time: {formatTime(event.time)}</p>
                    <p>Location: {event.location}</p>
                    <p>Artist ID: {event.artist}</p>
                    {event.description && <p>Description: {event.description}</p>}
                    <hr />
                 </div>
                ))}
        </div>
        </div>
    );
}
    
export default Events;