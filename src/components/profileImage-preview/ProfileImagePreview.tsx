import React from 'react';

interface ProfileImagePreviewProps {
  imageUrl: string;
}

const ProfileImagePreview: React.FC<ProfileImagePreviewProps> = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile Preview"
          style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ProfileImagePreview;
