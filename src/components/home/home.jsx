import React, { useState, useEffect } from 'react';

const Home = () => {
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Import the module dynamically
        const module = await import('../../server/connect.cjs');
        console.log('Module:', module); // Debugging statement
        
        // Access the named export from the default property
        const getCollections = module.default ? module.default.getCollections : module.getCollections;
        console.log('getCollections:', getCollections); // Debugging statement

        // Ensure getCollections is a function
        if (typeof getCollections !== 'function') {
          throw new Error('getCollections is not a function, type: ' + typeof getCollections);
        }

        const collections = await getCollections();
        console.log('Fetched collections:', collections); // Debugging statement

        setCollectionNames(collections.map(collection => collection.s.namespace.collection));
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    fetchData();
  }, []);

  console.log('Rendering collection names:', collectionNames); // Debugging statement

  return (
    <div>
      <h1>Gobbler Gauntlet</h1>
      <h1>Collection Names</h1>
      <ul>
        {collectionNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;