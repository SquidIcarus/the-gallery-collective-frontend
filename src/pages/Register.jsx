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
        <div className='min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4'>
            <div className='max-w-md w-full'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-neutral-900 mb-2'>Register</h1>
                    <p className='text-gray-600'>Join the Gallery Collective</p>
                </div>
        
                <div className='bg-white rounded-lg shadow-md p-8'>
                  
                        <div>
                            <label htmlFor='email' className='for-label'>
                                Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />  
                    </div>

                    <div>
                        <label htmlFor='username' className='form-label'>
                            Username
                    </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />  
                    </div>
                
                    <div>
                        <label htmlFor='first_name' className='form-label'>
                            First Name
                        </label>
                        <input
                            type='text'
                            id='first_name'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />  
                    </div>
                    <div>
                        <label htmlFor='last_name' className='form-label'>
                            Last Name
                        </label>
                        <input
                            type='text'
                            id='last_name'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                            className='form-input'
                            required
                        />  
                    </div>
                
                <div>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='form-input'
                        required
                    />  
                </div>

                <div>
                    <label htmlFor='password_confirmation' className='form-label'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='password_confirmation'
                        name='password_confirmation'
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className='form-input'
                        required
                    />  
                </div>

                <div>
                    <label className='flex items-center'>
                        <input
                            type='checkbox'
                            name='is_artist'
                            checked={formData.is_artist}
                            onChange={handleChange}
                            className='mr-2'
                        />
                        Register as an artist
                    </label>
                </div>

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
                        
                    <button type='submit' 
                    disabled={isLoading}
                    className='w-full btn-primary'
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p className='mt-6 text-center text-neutral-600'>
                Already have an account?{' '}
                <Link to="/login" className='text-primary-500 hover:text-primary-600 front-semibold'>
                    Login here
                </Link>
            </p>    
        </div>
    </div>
</div>
);    

}

export default Register;