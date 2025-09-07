import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';

export default function UserDashboard({ user, onNavigate }) {
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: user?.bio || 'Passionate about sustainable living.',
    avatarUrl: user?.avatarUrl || 'https://via.placeholder.com/150',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      console.log('Saved profile:', profile);
      // TODO: Call API to save profile in real app
    }
    setIsEditing(prev => !prev);
  };

  return (
    <MainLayout>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">

        {/* Header */}
        

        {/* Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
              <img src={profile.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
            </div>

            <button
              onClick={handleEditToggle}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition"
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>

            <div className="mt-6 w-full space-y-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
                />
              </div>

              <div>
                <label className="block text-gray-600">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded resize-none ${isEditing ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Navigate</h2>

          <button
            onClick={() => onNavigate('my-listings')}
            className="w-full py-3 px-4 bg-gray-50 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            My Listings
          </button>

          <button
            onClick={() => onNavigate('my-purchases')}
            className="w-full py-3 px-4 bg-gray-50 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            My Purchases
          </button>
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
