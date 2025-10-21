import { useState, useEffect } from 'react';
import artistService from '../services/artists';

function Artists() {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await artistService.getAll();
                console.log('Artists data:', data);
                setArtists(data);
            } catch (err) {
                console.error('Error fetching artists:', err);
                setError('Failed to load artists');
            } finally {
                setIsLoading(false);
            }
    };

        fetchArtists();
    }, []);

    if (isLoading) {
        return <div>Loading artists...</div>;
    }
    
    if (error) {
        return <div>{error}</div>;
    }   

    if (artists.length === 0) {
        return (
            <div>
                <h1>Artists</h1>
                <p>No artists found.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Artists</h1>
            <p>Discover talented artists in our collective</p>

            <div>
                {artists.map((artist) => (
                    <div key={artist.user.id}>
                        <h3>{artist.user.username}</h3>
                        <p>Name: {artist.user.first_name} {artist.user.last_name}</p>
                        {artist.bio && <p>Bio: {artist.bio}</p>}
                        {artist.website && (
                            <p>
                            Website: <a href={artist.website} target="_blank" rel='nopener noreferrer'>
                                {artist.website}
                            </a>
                          </p>
                        )}
                        {artist.instagram && <p>Instagram: {artist.instagram}</p>}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Artists;
