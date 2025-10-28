
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import artworksService from '../services/artworks';
import eventsService from '../services/events';

function Home() {
    const [recentArtworks, setRecentArtworks] = useState([]);
    const [recentEvents, setRecentEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_BASE = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const [artworksData, eventsData] = await Promise.all([
                    artworksService.getAll(),
                    eventsService.getAll()
                ]);

                setRecentArtworks(artworksData.slice(0, 6));
                setRecentEvents(eventsData.slice(0, 4));
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecent();
    }, []);

    if (isLoading) {
        return (
            <div className='container-custom py-8'>
                <div className='text-center text-gray-400'>Loading...</div>
            </div>
        );
    }

     return (
        <div className='min-h-screen'>
            <div className='text-white py-8'>
                <div className='container-custom text-center'>
                    <p className='text-2xl text-gray-300 mb-8'>
                        Discover amazing artworks and events from your favorite artists.
                    </p>
                                            
                </div>
            </div>

            <div className='py-8'>
                <div className='container-custom'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-4xl font-bold text-white'>Upcoming Events</h2>
                        <Link to='/events' className='text-blue-400 hover:text-blue-300 font-semibold'>
                            View All
                        </Link>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {recentEvents.map((event) => (
                            <div key={event.id} className='card group'>
                                <div className='h-48 overflow-hidden bg-gray-200'>
                                    <img
                                        src={`${API_BASE}${event.image}`}
                                        alt={event.title}
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                <div className='p-6'>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                                        {event.title}
                                    </h3>
                                    {event.artist?.user?.username && (
                                        <Link 
                                            to={`/artist/${event.artist.user.id}`}
                                            className="text-sm text-blue-500 hover:text-blue-600 mb-2 inline-block"
                                        >
                                            Posted by: {event.artist.user.username}
                                        </Link>
                                    )}
                                    <p className='text-sm text-gray-600'>
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='container-custom py-20'>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-4xl font-bold text-white'>Recent Artworks</h2>
                    <Link to='/artworks' className='text-blue-400 hover:text-blue-300 font-semibold'>
                        View All
                    </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {recentArtworks.map((artwork) => (
                        <div key={artwork.id} className='card group'>
                            <div className='aspect-square overflow-hidden bg-gray-200'>
                                <img
                                    src={`${API_BASE}${artwork.image}`}
                                    alt={artwork.title}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                            </div>
                            <div className='p-4'>
                                <h3 className='text-lg font-bold text-gray-900 mb-1'>
                                    {artwork.title}
                                </h3>
                                {artwork.artist?.user?.username && (
                                    <Link 
                                        to={`/artist/${artwork.artist.user.id}`}
                                        className="text-sm text-blue-500 hover:text-blue-600"
                                    >
                                        by {artwork.artist.user.username}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;