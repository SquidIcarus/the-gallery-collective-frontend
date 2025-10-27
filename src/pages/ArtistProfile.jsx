import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import artistsService from '../services/artists';

function ArtistProfile() {
    const { userId } = useParams();
    const [artist, setArtist] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    useEffect(() => {
        const fetchArtistData = async () => {
            setIsLoading(true);
            setError('');

            try {
                const [artistData, artworksData, eventsData] = await Promise.all([
                    artistsService.getById(userId),
                    artistsService.getArtworks(userId),
                    artistsService.getEvents(userId)
                ]);

                setArtist(artistData);
                setArtworks(artworksData);
                setEvents(eventsData);
            } catch (err) {
                console.error('Error fetching artist data:', err);
                setError('Failed to load artist profile. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtistData();
    }, [userId]);

    if (isLoading) {
        return (
            <div className='container-custom py-8'>
                <div className='text center text-gray-400'>Loading artist profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='container-custom py-8'>
                <div className='text center text-red-500'>{error}</div>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className='container-custom py-8'>
                <div className='text center text-gray-400'>Artist not found.</div>
            </div>
        );  
    }
    
    return (
        <div className='min-h-screen'>
            <div className='bg-gray-800 py-12'>
                <div className='container-custom'>
                    <div className='flex flex-col md:flex-row gap-8 items-start'>
                        <div className='flex-shrimk-0'>
                            {artist.profile_image ? (
                                <img
                                    src={`${API_BASE}${artist.profile_image}`}
                                    alt={artist.user?.username}
                                    className='w-48 h-48 object-cover rounded-full border-4 border-gray-700'
                                />
                            ) : (
                                <div className='w-48 h-48 rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-600'>
                                    <span className='text-6xl text-gray-400'>
                                        {artist.user?.username?.[0]?.toUpperCase() || '?'}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className='flex-1'>
                            <h1 className='text-4xl font-bold text-white mb-2'>
                                {artist.user?.username}
                            </h1>
                            {artist.bio && (
                                <p className='text-lg text-gray-300 leading-relaxed'>
                                    {artist.bio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-custom py-12'>
                <h2 className='text-3xl font-bold text-white mb-8'>Artworks</h2>
                {artworks.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {artworks.map((artwork) => (
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
                                    {artwork.medium && (
                                        <p className='text-sm text-gray-600'>
                                            {artwork.medium}
                                        </p>
                                    )}
                                    {artwork.price && (
                                        <p className='text-sm font-semibold text-green-600 mt-2'>
                                            ${artwork.price}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-400'>No artworks yet.</p>
                )}
            </div>

            {events.length > 0 && (
                <div className='bg-gray-800 py-12'>
                    <div className='container-custom'>
                        <h2 className='text-3xl font-bold text-white mb-8'>Upcoming Events</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {events.map((event) => (
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
                                        <p className='text-sm text-gray-600 mb-1'>
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
            )}
        </div>
    );
}

export default ArtistProfile;
