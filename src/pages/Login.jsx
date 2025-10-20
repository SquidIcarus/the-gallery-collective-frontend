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
        <>
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            
            <p>
                Wanna be a collector? <Link to="/register">Register here</Link>
            </p>    

        </div>
        </>

    )
}

export default Login;