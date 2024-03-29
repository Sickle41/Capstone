// EditCard.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCardById,updateCard } from '../../services/cardServices';

export const EditCard = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    // Fetch card details when the component mounts
    getCardById(cardId)
      .then((cardData) => {
        setCard(cardData);
        setName(cardData.name);
        setRegion(cardData.region);
        setType(cardData.type);
      })
      .catch((error) => console.error('Error fetching card details:', error));
  }, [cardId]);

  const handleSaveChanges = () => {
    // Update card details in the API
    updateCard(cardId, { name, region, type })
      .then(() => {
        // Optionally, update the UI to reflect the changes
        // For example, fetch the updated card details and rerender the component
      })
      .catch((error) => console.error('Error saving changes:', error));
  };

  return (
    <div>
      {card ? (
        <form>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Region:</label>
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
          <label>Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </form>
      ) : (
        <p>Loading card details...</p>
      )}
    </div>
  );
};

