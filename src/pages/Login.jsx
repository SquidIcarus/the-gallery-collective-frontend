import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext'; 

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await login(formData);
            console.log('Login successful:', response);

            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message?.data?.detail || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4'>
            <div className='max-w-md w-full'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-neutral-900 mb-2'>Login</h1>
                    <p className='text-neutral-600'>Welcome back to the Gallery Collective</p>
                </div>

            <div className='bg-white shadow-md rounded-lg p-8'>
            <form onSubmit={handleSubmit} className='space-y-6'> 
                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className='form-label'>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='form-input'
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className='form-label'>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className='form-input'
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className='w-full btn-primary'
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            
            <p className='mt-6 text-center text-neutral-600'>
                Wanna be a collector? {' '}
                <Link to="/register" className='text-primary-500 hover:text-primary-600 font-semibold'>
                    Register here
                </Link>
            </p>    
            </div>
        </div>
      </div>
    );
}

export default Login;