import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/UserContext';
import Navbar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Artists from './pages/Artists';
import Artworks from './pages/Artworks';
import Events from './pages/Events';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
} 

export default App
