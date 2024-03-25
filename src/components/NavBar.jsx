import React from 'react';

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li className='button'><button onClick={() => console.log("Card Gallery clicked")}>Card Gallery</button></li>
        <li className='button'><button onClick={() => console.log("New Cards clicked")}>New Cards</button></li>
        <li className='button'><button onClick={() => console.log("Log In clicked")}>Log In</button></li>
        <li className='button'><button onClick={() => console.log("Profile clicked")}>Profile</button></li>
      </ul>
    </nav>
  );
}
