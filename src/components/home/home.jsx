import React, { useState, useEffect } from 'react';

const Home = () => {
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { default: getCollections } = await import('../../server/connect.cjs');
        const collections = await getCollections();
        setCollectionNames(collections.map(collection => collection.s.namespace.collection));
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    fetchData();
  }, []);

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