import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

function NavBar() {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className='bg-gray-900 text-white shadow-lg'>
            <div className='container-custom'>
                <div className='flex items-center justify-between h-16'>
                    
                    <div className='flex items-center space-x-8'>
                        {/* Logo */}
                        <Link 
                            to="/" 
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }} 
                            className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Gallery Collective
                        </Link>

                        <ul className='flex items-center space-x-6'>
                            <li>
                                <Link to="/artists" className='hover:text-blue-400 transition-colors'>
                                    Artists
                                </Link>
                            </li>
                            <li>
                                <Link to="/artworks" className='hover:text-blue-400 transition-colors'>
                                    Artworks
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className='hover:text-blue-400 transition-colors'>
                                    Events
                                </Link>
                            </li>
                            
                            {isAuthenticated && user?.is_artist && (
                                <>
                                    <li>
                                        <Link to='/upload-artwork' className='hover:text-purple-400 transition-colors'>
                                            Upload Artwork
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/upload-event' className='hover:text-purple-400 transition-colors'>
                                            Create Event
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className='flex items-center space-x-4'>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className='btn-outline'>
                                    Login
                                </Link>
                                <Link to="/register" className='btn-primary'>
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={user?.is_artist ? `/artist/${user.id}` : `/user/${user.id}`}
                                    className='text-blue-400 hover:text-blue-300 transition-colors'
                                >
                                    {user?.username}
                                </Link>
                                <button onClick={handleLogout} className='btn-secondary'>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default NavBar;