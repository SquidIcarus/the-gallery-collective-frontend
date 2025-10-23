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
        <nav>
            <h2>Gallery Collective</h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/artists">Artists</Link>
                </li>
                <li>
                    <Link to="/artworks">Artworks</Link>
                </li>
                <li>
                    <Link to="/events">Events</Link>
                </li>
                {!isAuthenticated ? (
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </>
            ) : (
                <>  
                    {user?.is_artist && (
                        <li>
                            <Link to='/upload-artwork'>Upload Artwork</Link>
                        </li>
                    )}
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </>
            )}
        </ul>
    </nav>
    );
}

export default NavBar;