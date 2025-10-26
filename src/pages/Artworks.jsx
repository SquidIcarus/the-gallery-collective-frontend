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
        return ( 
        <div className='container-custom py-8'>
            <div className='text-center text-neutral-600'>Loading artworks...</div>
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
    if (artworks.length === 0) {
        return (
            <div className='container-custom py-8'>
            <h1 className='text-4xl font-bold text-neutral-900 mb-4'>Artworks</h1>
            <p className='text-neutral-600'>No artworks found.</p>
            </div>
        );
    }
    return (
        <div className='min-h-screen bg-neutral-50 py-8'>
            <div className='container-custom'>
            <h1 className='text-4xl font-bold text-neutral-900 mb-2'>Artworks</h1>
            <p className='text-neutral-600 mb-8'>Browse the collection</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {artworks.map((artwork) => (
                    <div key={artwork.id} className='card group'>
                       <div className='aspect-square overflow-hidden bg-neutral-200'>
                        <img
                            src={`${API_BASE}${artwork.image}`}
                            alt={artwork.title}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                        </div>

                        <div className='p-4'>
                        <h3 className='text-lg font-bold text-neutral-900 mb-1'>
                            {artwork.title}
                        </h3>
                         <h4 className="text-lg font-regular text-gray-900 mb-1">
                            {artwork.artist}
                        </h4>
                        <p className='text-sm text-neutral-600 mb-2'>
                            {artwork.year_created}
                        </p>
                        <p className='text-sm text-neutral-600 mb-2'>
                            {artwork.medium}
                        </p>
                        {artwork.dimensions && (
                             <p className='text-sm text-neutral-600 mb-2'>
                                {artwork.dimensions}
                            </p>
                        )}
                        {artwork.description && (
                             <p className='text-sm text-neutral-600 line-clamp-2'>
                                {artwork.description}
                            </p>
                        )}
                    </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Artworks;