import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

function Register() {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        is_artist: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match.');
            return;
        }
        
        setIsLoading(true);

        try {
            const response = await register(formData);
            console.log('Registration successful:', response);
            setSuccess('Registration successful! You can now log in.');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            console.error('Registration error:', err);

            if (err.response?.data) {
                const errorData = err.response.data;
                if (typeof errorData === 'object') {
                    const errorMessages = Object.entries(errorData)
                        .map(([Field, Messages]) => `${Field}: ${Messages.join(' ')}`)
                        .join(' ');
                        setError(errorMessages);
                } else {
                    setError(errorData);
                }
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />  
                </div>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />  
                </div>
                <div>
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                        type='text'
                        id='first_name'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />  
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name:</label>
                    <input
                        type='text'
                        id='last_name'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />  
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />  
                </div>
                <div>
                    <label htmlFor='password_confirmation'>Confirm Password:</label>
                    <input
                        type='password'
                        id='password_confirmation'
                        name='password_confirmation'
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                    />  
                </div>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            name='is_artist'
                            checked={formData.is_artist}
                            onChange={handleChange}
                        />
                        Register as an artist
                    </label>
                </div>
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>    
        </div>
    );      
}

export default Register;