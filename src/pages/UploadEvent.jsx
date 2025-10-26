import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import eventsService from '../services/events';

function UploadEvent() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
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
            uploadData.append('description', formData.description);
            uploadData.append('date', formData.date);
            uploadData.append('time', formData.time);
            uploadData.append('location', formData.location);
            uploadData.append('image', image);

            await eventsService.create(uploadData);

            setSuccess('Event created successfully!');

            setTimeout(() => {
                navigate('/events');
            }, 2000);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.message || 'Failed to create event');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-neutral-50 py-8'>
            <div className='container-custom max-w-2xl mx-auto px-4'>
                <h1 className='text-4xl font-bold text-neutral-900 mb-8'>Create Event</h1>
        
                <div className='bg-white rounded-lg shadow-md p-8'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {error && (
                            <div className='bg-red-50 border-red-200 text-red-700 px-4 py-3 rounded-lg'>
                                {error}
                        </div>
                        )}
                        {success && (
                            <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg'>
                                {success}
                            </div>
                        )}

                        <div>
                            <label htmlFor='title' className='form-label'>
                                Event Title 
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
                            <label htmlFor='date' className='form-label'>
                                Date
                            </label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                value={formData.date}
                                onChange={handleChange}
                                className='form-input'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='time' className='form-label'>
                                Time
                            </label>
                            <input
                                type='time'
                                id='time'
                                name='time'
                                value={formData.time}
                                onChange={handleChange}
                                className='form-input'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='location' className='form-label'>
                                Location
                            </label>
                            <input
                                type='text'
                                id='location'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                className='form-input'
                                required
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
                                required
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
                                style={{ fontFamily: 'inherit' }}
                                className='block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                                accept='image/*'
                                required
                            />
                        </div>

                        <button type='submit' disabled={isLoading} className='w-full btn-primary'>
                            {isLoading ? 'Posting...' : 'Post Event'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadEvent;