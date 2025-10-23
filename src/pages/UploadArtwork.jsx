import { useState, useContext } from 'react';
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

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

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
        <div>
            <h1>Upload Artwork</h1>

            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='year_created'>Year Created: </label>
                    <input
                    type='number'
                    id='year_created'
                    name='year_created'
                    value={formData.year_created}
                    onChange={handleChange}
                    min='1900'
                    max='2100'
                    required
                />
                </div>

                <div>
                    <label htmlFor='medium'>Medium: </label>
                    <input
                        type='text'
                        id='medium'
                        name='medium'
                        value={formData.medium}
                        onChange={handleChange}
                        placeholder='e.g., Oil on canvas, Digital, Acrylic'
                        required
                    />
                </div>

                <div>
                    <label htmlFor='dimensions'>Dimensions:</label>
                    <input
                        type='text'
                        id='dimensions'
                        name='dimensions'
                        value={formData.dimensions}
                        onChange={handleChange}
                        placeholder='e.g., 24 x 36 inches'
                    />
                </div>

                <div>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows='4'
                        placeholder='Tell us about this piece...'
                    />
                </div>

                 <div>
                    <label htmlFor='image'>Image: *</label>
                    <input
                        type='file'
                        id='image'
                        name='image'
                        onChange={handleImageChange}
                        accept='image/*'
                        required
                    />
                </div>

                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Artwork'}
                </button>
            </form>
        </div>
    );
}

export default UploadArtwork;