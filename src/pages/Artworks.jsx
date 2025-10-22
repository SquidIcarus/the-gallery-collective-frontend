import { useState, useEffect } from 'react';
import artworksService from '../services/artworks';

function Artworks() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const API_BASE = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const data = await artworksService.getAll();
                console.log('Artworks data:', data);
                setArtworks(data);
            } catch (err) {
                console.error('Error fetching artworks:', err);
                setError('Failed to load artworks');
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    if (isLoading) {
        return <p>Loading artworks...</p>
    }
    if (error) {
        return <div>{error}</div>;
    }
    if (artworks.length === 0) {
        return (
            <div>
            <h1>Artworks</h1>
            <h3>No artworks found.</h3>
            </div>
        );
    }
    return (
        <div>
            <h1>Artworks</h1>
            <h3>Browse our collection of amazing artworks</h3>

            <div>
                {artworks.map((artwork) => (
                    <div key={artwork.id}>
                        <img
                            src={`${API_BASE}${artwork.image}`}
                            alt={artwork.title}
                        />
                        <h3>{artwork.title}</h3>
                        <p>Artist ID: {artwork.artist}</p>
                        <p>Year: {artwork.year_created}</p>
                        {artwork.description && <p>Description: {artwork.description}</p>}
                        {artwork.dimensions && <p>Dimensions: {artwork.dimensions}</p>}
                        <hr />
                        </div>
                ))}
            </div>
        </div>
    );
}

export default Artworks;