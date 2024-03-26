import React, { useState, useEffect } from 'react';
import { getDeckById,getCardById } from '../../services/deckServices';

export const CardGallery = ({ userId, deckId }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch user's deck data to get the cardId array
    getDeckById(userId, deckId)
      .then(deck => {
        // Fetch card data for each cardId in the deck
        const cardPromises = deck.cardId.map(cardId => getCardById(cardId));
        Promise.all(cardPromises)
          .then(cardData => {
            // Set the retrieved card data to the state
            setCards(cardData);
          })
          .catch(error => {
            console.error('Error fetching card data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user\'s deck:', error);
      });
  }, [userId, deckId]);

  return (
    <div className="card-gallery">
      {cards.map(card => (
        <div key={card.id} className="card-item">
          <img src={card.imageUrl} alt={card.name} />
          <div className="card-details">
            <p>Name: {card.name}</p>
            <p>Region: {card.region}</p>
            <p>Type: {card.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

