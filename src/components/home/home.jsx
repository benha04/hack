import React from 'react';

import Connection from '../../backend/connection';

const Home = (props) => {

  return (
    <div className="home-container">
      <h1>Gobbler Gauntlet</h1>
      {/* Display the Connection component*/}
      <Connection />
    </div>
  );
}

export default Home;
