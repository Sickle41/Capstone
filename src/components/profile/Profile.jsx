
import React, { useEffect, useState } from 'react';
import { getUserByEmail } from '../../services/userServices';

export const Profile = ({ userEmail }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    getUserByEmail(userEmail)
      .then(userData => setUser(userData))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userEmail]); // Fetch data whenever userEmail changes

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

