import React, { useEffect, useState } from 'react';

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage when the component mounts
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.email) {
      setUser(userData);
    } else {
      console.error('User data not found in local storage');
    }
  }, []);

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
