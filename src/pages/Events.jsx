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
        return ( 
        <div className='container-custom py-8'>
            <div className='text-center text-neutral-600'>Loading events...</div>
        </div>
        );
    }
    if (error) {
        return (
        <div className='container-custom py-8'>
        <div className='text-center text-red-600'>{error}</div>
        </div>
    );
}

    if (events.length === 0) {
        return (
            <div className='container-custom py-8'>
            <h1 className='text-4xl font-bold text-neutral-900 mb-4'>Events</h1>
            <p className='text-neutral-600'>No events found.</p>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-neutral-50 py-8'>
            <div className='container-custom'>
        <h1 className='text-4xl font-bold text-neutral-900 mb-2'>Events</h1>
        <p className='text-neutral-600 mb-8'>Discover upcoming events, pop-ups and exhibitions </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {events.map((event) => (
                <div key={event.id} className='card'>
                    {event.artist?.user?.username && (
                        <div className='px-6 pt-4 pb-2'>
                            <p className='text-sm text-gray-500'>
                                Post by: {event.artist.user.username}
                            </p>
                        </div>
                    )}

                    <div className='h-64 overflow-hidden bg-neutral-200'>
                        <img
                            src={`${API_BASE}${event.image}`}
                            alt={event.title}
                            className='w-full h-full object-cover'
                        />
                    </div>
                                            
                    <div className='p-6'>
                        <h3 className='text-2xl font-bold text-neutral-900 mb-3'>
                            {event.title}
                        </h3>
                    <div className='space-y-2 mb-4'>
                        <p className='text-nutral-700 flex items-center'>
                        <span className='font-semibold mr-2'>Date:</span>
                            {formatDate(event.date)}
                        </p>
                        <p className='text-nutral-700 flex items-center'>
                        <span className='font-semibold mr-2'>Time:</span>
                            {formatTime(event.time)}
                        </p>
                        <p className='text-nutral-700 flex items-center'>
                        <span className='font-semibold mr-2'>Location:</span>
                            {formatTime(event.location)}
                        </p>
                    </div>

                    {event.description && (
                         <p className='text-neutral-600'>{event.description}</p>
                    )}
                 </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
}
    
export default Events;