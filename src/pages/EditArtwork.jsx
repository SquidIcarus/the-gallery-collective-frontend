import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import artworksService from '../services/artworks';

function EditArtwork() {
    const { id } = useParams();
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState ({
        title: '',
        year_created: '',
        medium: '',
        dimensions: '',
        description: '',
    });

    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchArtwork = async () => {
            try {
                const data = await artworksService.getById(id);
                if (data.artist.user.id !== user.id) {
                    navigate('/artworks');
                    return;
                }

                setFormData({
                    title: data.title,
                    year_created: data.year_created,
                    medium: data.medium,
                    dimensions: data.dimensions || '',
                    description: data.description || '',
                });
                setCurrentImage(data.image);
            } catch (err) {
                console.error('Error fetching artwork:', err);
                setError('Failed to load artwork data');
            } finally {
                setIsLoading(false);    
            }
        };

        fetchArtwork();
    }, [id, isAuthenticated, navigate, user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const uploadData = new FormData();
            uploadData.append('title', formData.title);
            uploadData.append('year_created', formData.year_created);
            uploadData.append('medium', formData.medium);
            uploadData.append('dimensions', formData.dimensions);
            uploadData.append('description', formData.description);
            if (image) {
                uploadData.append('image', image);
            }

            await artworksService.update(id, uploadData);

            setSuccess('Artwork updated successfully!');
            
            setTimeout(() => {
                navigate('/artworks');
            }, 2000);
        } catch (err) {
            console.error('Update error:', err);
            setError(err.response?.data?.message || 'Failed to update artwork');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className='container-custom py-8'>
                <div className='text-center text-neutral-600'>Loading...</div>
            </div>
        );
    }

    const API_BASE = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container-custom max-w-2xl'>
                <h1 className='text-4xl font-bold text-gray-900 mb-8'>Edit Artwork</h1>

                <div className='bg-white p-8 rounded-lg shadow-md'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg'>
                                {success}
                            </div>
                        )}

                        {currentImage && !image && (
                            <div>
                                <label className='form-label'>
                                    Current Image
                                </label>
                                <img
                                    src={`${API_BASE}${currentImage}`}
                                    alt='Current Artwork'
                                    className='w-full max-w-md rounded-lg'
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor='title' className='form-label'>
                                Title
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                className='form-input'
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor='year_created' className='form-label'>
                                Year Created 
                            </label>
                            <input
                                type='number'
                                id='year_created'
                                name='year_created'
                                value={formData.year_created}
                                onChange={handleChange}
                                className='form-input'
                                min='1900'
                                max='2100'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='medium' className='form-label'>
                                Medium
                            </label>
                            <input
                                type='text'
                                id='medium'
                                name='medium'
                                value={formData.medium}
                                onChange={handleChange}
                                className='form-input'
                                placeholder='e.g., Oil on canvas, Digital, Acrylic'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='dimensions' className='form-label'>
                                Dimensions
                            </label>
                            <input
                                type='text'
                                id='dimensions'
                                name='dimensions'
                                value={formData.dimensions}
                                onChange={handleChange}
                                className='form-input'
                                placeholder='e.g., 24 x 36 inches'
                            />
                        </div>

                        <div>
                            <label htmlFor='description' className='form-label'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                className='form-input'
                                rows='4'
                                placeholder='Tell us about this piece...'
                            />
                        </div>

                        <div>
                            <label htmlFor='image' className='form-label'>
                                New Image (optional, leave blank to keep current)
                            </label>
                            <input
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                onChange={handleImageChange}
                                style={{ fontFamily: 'inherit' }}
                                className='block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                            />
                        </div>

                        <div className='flex space-x-4'>
                            <button
                                type='submit'
                                disabled={isLoading}
                                className='flex-1 btn-primary'
                            >
                                {isLoading ? 'Updating...' : 'Update Artwork'}
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/artworks')}
                            className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-normal py-2 px-4 rounded-lg transition-colors'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

}

export default EditArtwork;