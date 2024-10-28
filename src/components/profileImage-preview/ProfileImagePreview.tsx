import React, { useState } from 'react';

interface ProfileImagePreviewProps {
  defaultImageUrl?: string;
}

const ProfileImagePreview: React.FC<ProfileImagePreviewProps> = ({ defaultImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input 
        type="text" 
        placeholder="Enter image URL" 
        value={imageUrl} 
        onChange={handleInputChange} 
        style={{ marginBottom: '10px', padding: '8px', width: '80%' }}
      />
      <div>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Profile Preview" 
            style={{ maxWidth: '200px', borderRadius: '50%' }} 
          />
        ) : (
          <p>No image to display</p>
        )}
      </div>
    </div>
  );
};

export default ProfileImagePreview;
