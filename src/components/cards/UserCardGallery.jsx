import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import "./UserCardGallery.css"

export const CardGallery = () => {
  const [userDeck, setUserDeck] = useState([]);
  const [cardsInfo, setCardsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch the user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        const userID = userData.id;

        // Parse deckID as string
        const userDeckID = String(userData.deckID);

        // Fetch user data based on the user ID
        const userResponse = await axios.get(`http://localhost:8088/users/${userID}`);
        const fetchedUserData = userResponse.data;

        // Fetch deck data for the current user
        const deckID = fetchedUserData.deckID;
        const deckResponse = await axios.get(`http://localhost:8088/decks/${deckID}`);
        const deckData = deckResponse.data;

        setUserDeck(deckData.cards);

        // Extract card IDs from the deck
        const cardIDs = deckData.cards.map(card => card.cardId);

        // Fetch card data based on card IDs
        const cardsResponse = await axios.get('http://localhost:8088/cards');
        const cardsData = cardsResponse.data;

        // Filter cards that match the card IDs in the user's deck
        const filteredCards = cardsData.filter(card => cardIDs.includes(card.id));

        setCardsInfo(filteredCards);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRemoveCard = async (cardID) => {
    try {
      // Fetch the user data from local storage
      const userData = JSON.parse(localStorage.getItem('user'));
      const deckID = userData.deckID; // Make sure userData.deckID is correct
  
      // Fetch the deck from the API using the correct deckID
      const deckResponse = await axios.get(`http://localhost:8088/decks/${deckID}`);
      const deck = deckResponse.data;
  
      // Remove the card from the deck's cards array
      const updatedCards = deck.cards.filter(card => card.cardId !== cardID);
  
      // Update the deck's cards array in the database via API
      await axios.put(`http://localhost:8088/decks/${deckID}`, { cards: updatedCards });
  
      // Optionally, you can update the UI to reflect the changes
      // For example, you could fetch the updated deck from the API and rerender the component
  
    } catch (error) {
      console.error('Error removing card:', error);
    }
  };
  
  const handleEditCard = (cardID) => {
    // Navigate to the edit card page with the card ID
    navigate(`/edit-card/${cardID}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User's Card Gallery</h1>
      <div className="card-gallery">
        {cardsInfo.map((card) => (
          <div key={card.id} className="card">
            <img src={card.imageURL} alt={card.cardName} />
            <h2>{card.cardName}</h2>
            {/* You may need to fetch region and type names based on their IDs */}
            {/* For simplicity, I'm using IDs here */}
            <p>Region: {card.regionId}</p>
            <p>Type: {card.typeId}</p>
            <button onClick={() => handleRemoveCard(card.id)}>Remove Card</button>
            <button onClick={() => handleEditCard(card.id)}>Edit Card</button>
          </div>
        ))}
      </div>
    </div>
  );
};
