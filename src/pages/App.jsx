import React, { useState } from 'react';
import Landing from './Landing';
import Homepage from './Homepage';

function App() {
  // This state determines whether to show the landing page or the main homepage
  const [hasEntered, setHasEntered] = useState(false);

  // This function will be passed to the Landing component
  // It simulates storing the user's email and then enters the main site
  const handleEnter = (email) => {
    console.log('Storing signup info for:', email);
    // In a real application, you would send this to a database or mailing list service.
    
    // Switch the view to the main homepage
    setHasEntered(true);
  };

  return (
    <>
      {/* Conditionally render the correct component based on the 'hasEntered' state */}
      {hasEntered ? (
        <Homepage />
      ) : (
        <Landing onEnter={handleEnter} />
      )}
    </>
  );
}

export default App;