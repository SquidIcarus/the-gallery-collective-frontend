import { useState } from 'react';
import { useAuth } from '../contexts/UserContext';

function ProfileImageUpload({ artist, onUploadSuccess }) {
    const [selectedFile, ssetSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    
    const isOwner = user && artist && user.id === artist.user?.id;

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            ssetSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            setError('');
        }
};

const handleUpload = async () => {
    if (!selectedFile) {
        setError('');
    }

    setIsUploading(true);
    setError('');

    try {
        const formData = new FormData();
        formData.append('profile_image', selectedFile);

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/artists/${artist.user.id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        ssetSelectedFile(null);
        setPreview(null);

        if (onUploadSuccess) {
            onUploadSuccess(data);
        }
    } catch (err) {
        console.error('Error uploading image:', err);
        setError('Failed to upload image. Please try again.');
    } finally {
        setIsUploading(false);
    }
};

const handleCancel = () => {
    ssetSelectedFile(null);
    setPreview(null);
    setError('');
};

    if (!isOwner) {
        return null;
    }

    return (
        <div className='mt-4'>
            {!selectedFile && (
                <label className='inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors'>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileSelect}
                        className='hidden'
                    />
                    {artist.profile_image ? 'Change Profile Picture' : 'Upload Profile Picture'}
                </label>
            )}

            {selectedFile && (
                <div className='mt-4 p-4 bg-gray-800 rounded-lg'>
                    <p className='text-white mb-2'>Preview:</p>
                    <img
                        src={preview}
                        alt='Preview'
                        className='w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-700'
                    />
                    
                    <div className='flex gap-2'>
                        <button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed'
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isUploading}
                            className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:cursor-not-allowed'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <p className='mt-2 text-red-500 text-sm'>{error}</p>
            )}
        </div>
    );
}

export default ProfileImageUpload;