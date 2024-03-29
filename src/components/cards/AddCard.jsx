import React, { useState } from 'react';
import { updateDeck } from '../../services/createCard';

export const CreateCardForm = () => {
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

  const handleAddCard = async (cardData) => {
    try {
      // Fetch the user data from local storage
      const userData = JSON.parse(localStorage.getItem('user'));
  
      if (!userData || !userData.deckID) {
        console.error('User data or deckID not found');
        return;
      }
  
      const deckID = userData.deckID;
  
      // Fetch the deck from the API using the correct deckID
      const deckResponse = await fetch(`http://localhost:8088/decks/${deckID}`);
      if (!deckResponse.ok) {
        throw new Error('Failed to fetch deck data');
      }
      const deck = await deckResponse.json();
  
      // Add the new card to the deck's cards array
      const updatedCards = [...deck.cards, cardData];
  
      // Update the deck's cards array in the database via API
      const putResponse = await fetch(`http://localhost:8088/decks/${deckID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cards: updatedCards })
      });
      if (!putResponse.ok) {
        throw new Error('Failed to update deck data');
      }
  
      console.log('Card added to the deck successfully');
  
      // Optionally, you can update the UI to reflect the changes
      // For example, you could fetch the updated deck from the API and rerender the component
  
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleCreateCard = async (event) => {
    event.preventDefault();
    try {
      await handleAddCard(cardData);
      console.log('Card created and added to the user\'s deck');
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
