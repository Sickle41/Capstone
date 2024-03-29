export const updateDeck = async (userId, deckId, newCardId) => {
    try {
        // Fetch the user's deck from the API
        const response = await fetch(`http://localhost:8088/users/${userId}/decks/${deckId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user\'s deck');
        }
        const deck = await response.json();

        // Add the new cardId to the deck's cards array
        deck.cards.push({ cardId: newCardId });

        // Update the deck on the server
        const updateResponse = await fetch(`http://localhost:8088/users/${userId}/decks/${deckId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deck),
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update deck');
        }

        return await updateResponse.json();
    } catch (error) {
        throw new Error('Error updating deck: ' + error.message);
    }
};


export const createCard = (cardData, userId, deckId) => {
    return fetch(`http://localhost:8088/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create card");
      }
      return res.json();
    })
    .then((createdCard) => {
      const cardId = createdCard.id; // Extract the card ID from the response
      return updateDeck(userId, deckId, { cardId }); // Update the user's deck with the new card ID
    });
  };

  export const handleAddCard = async (cardData) => {
    try {
        // Fetch the user data from local storage
        const userData = JSON.parse(localStorage.getItem('user'));

        console.log('userData:', userData);

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
        deck.cards.push({ cardId: cardData.id });

        // Update the deck's cards array in the database via API
        const putResponse = await fetch(`http://localhost:8088/decks/${deckID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cards: deck.cards })
        });
        if (!putResponse.ok) {
            throw new Error('Failed to update deck data');
        }

        // Optionally, you can update the UI to reflect the changes
        // For example, you could fetch the updated deck from the API and rerender the component

    } catch (error) {
        console.error('Error adding card:', error);
    }
};
