import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import artworksService from '../services/artworks';

function UploadArtwork() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        year_created: '',
        medium: '',
        dimensions: '',
        description: '',
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login');
    }
}, [isAuthenticated, navigate]);

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

        if (!image) {
            setError('Please select an image');
            setIsLoading(false);
            return;
        }

        try {
            const uploadData = new FormData();
            uploadData.append('title', formData.title);
            uploadData.append('year_created', formData.year_created);
            uploadData.append('medium', formData.medium);
            uploadData.append('dimensions', formData.dimensions);
            uploadData.append('description', formData.description);
            uploadData.append('image', image);

            await artworksService.create(uploadData);

            setSuccess('Artwork uploaded successfully!');

            setTimeout(() => {
                navigate('/artworks');
            }, 2000);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.message || 'Failed to upload artwork');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 py-8">
            <div className="container-custom max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-neutral-900 mb-8">Upload Artwork</h1>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>
                    )}
                
                <div>
                    <label htmlFor="title" className='form-label'>
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
                        Image
                    </label>
                    <input
                        type='file'
                        id='image'
                        name='image'
                        onChange={handleImageChange}
                        accept='image/*'
                        style={{ fontFamily: 'inherit' }}
                        className='block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                        required
                    />
                </div>

                <button type='submit' disabled={isLoading} className='w-full btn-primary'>
                    {isLoading ? 'Uploading...' : 'Upload Artwork'}
                </button>
            </form>
        </div>
        </div>
    </div>
    );
}

export default UploadArtwork;