import React, { useState } from 'react';
import { createCard,updateDeck } from '../../services/cardServices';

export const CreateCardForm = ({ userId, deckId }) => {
  const [cardData, setCardData] = useState({
    name: '',
    imageUrl: '',
    type: '',
    region: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleCreateCard = async (event) => {
    event.preventDefault();
    try {
      const createdCard = await createCard(cardData, userId, deckId);
      const cardId = createdCard.id;
      const updatedDeck = await updateDeck(userId, deckId, { cardId });
      console.log('Card created and added to the user\'s deck:', updatedDeck);
    } catch (error) {
      console.error('Error creating card and updating deck:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Card</h2>
      <form onSubmit={handleCreateCard}>
        <label>
          Card Name:
          <input type="text" name="name" value={cardData.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={cardData.imageUrl} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={cardData.type} onChange={handleInputChange}>
            <option value="">Select Type</option>
            <option value="Creature">Creature</option>
            <option value="Magi">Magi</option>
            <option value="Spell">Spell</option>
            <option value="Relic">Relic</option>
          </select>
        </label>
        <br />
        <label>
          Region:
          <select name="region" value={cardData.region} onChange={handleInputChange}>
            <option value="">Select Region</option>
            <option value="Arderial">Arderial</option>
            <option value="Cald">Cald</option>
            <option value="Naroom">Naroom</option>
            <option value="Orothe">Orothe</option>
            <option value="Underneath">Underneath</option>
            <option value="Universal">Universal</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

