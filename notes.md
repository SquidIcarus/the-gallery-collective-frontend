## Phase 3: Style the Artists Page

**Before styling Artists, add the card class to `src/index.css`:**

```css
/* Add this to your @layer components section */

/* Card component for content boxes */
.card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden;
}
```

**What this does:**
- White background
- Rounded corners
- Shadow that grows on hover
- Hides overflow (for images)

Now edit `src/pages/Artists.jsx`:

```javascript
import { useState, useEffect } from 'react';
import artistsService from '../services/artists';

function Artists() {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await artistsService.getAll();
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
        return (
            <div className="container-custom py-8">
                <div className="text-center text-gray-600">Loading artists...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-custom py-8">
                <div className="text-center text-red-600">{error}</div>
            </div>
        );
    }

    if (artists.length === 0) {
        return (
            <div className="container-custom py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Artists</h1>
                <p className="text-gray-600">No artists found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Artists</h1>
                <p className="text-gray-600 mb-8">Discover talented artists in our collective</p>

                {/* Grid layout for artist cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artists.map((artist) => (
                        <div key={artist.user.id} className="card">
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {artist.user.username}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {artist.user.first_name} {artist.user.last_name}
                                </p>
                                
                                {artist.bio && (
                                    <p className="text-gray-600 mb-4">{artist.bio}</p>
                                )}
                                
                                <div className="space-y-2">
                                    {artist.website && (
                                        <a 
                                            href={artist.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block text-blue-500 hover:text-blue-600 transition-colors"
                                        >
                                            🌐 Website
                                        </a>
                                    )}
                                    {artist.instagram && (
                                        <p className="text-gray-600">
                                            📸 Instagram: {artist.instagram}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Artists;
```

**What we added:**
- Grid layout (`grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`)
- Card components with hover effects
- Responsive design (1 col mobile, 2 tablet, 3 desktop)
- Proper spacing and typography
