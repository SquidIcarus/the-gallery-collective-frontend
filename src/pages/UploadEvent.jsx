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
        <div>
        <h1>Create Event</h1>
        
        <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <div>
            <label htmlFor='title'>Event Title: </label>
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
            <label htmlFor='date'>Date: </label>
            <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                required
            />
        </div>

         <div>
            <label htmlFor='time'>Time: </label>
            <input
                type='time'
                id='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                required
            />
        </div>

         <div>
            <label htmlFor='location'>Location: </label>
            <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                required
            />
        </div>

         <div>
            <label htmlFor='description'>Description: </label>
            <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows='4'
                required
            />
        </div>

         <div>
            <label htmlFor='image'></label>
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
            {isLoading ? 'Creating...' : 'Create Event'}
        </button>

    </form>
    </div>
    );
}

export default UploadEvent;