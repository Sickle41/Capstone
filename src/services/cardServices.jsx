export const getAllCards = () => {
    return fetch(`http://localhost:8088/cards`).then((res) => res.json())
}

export const addCardToDeck = (userId, cardData) => {
    return fetch(`http://localhost:8088/users/${userId}/decks`, { // Adjusted endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add card to deck");
      }
      return res.json();
    });
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

  export const updateDeck = (userId, deckId, newData) => {
    return fetch(`http://localhost:8088/users/${userId}/decks/${deckId}`, {
      method: "PATCH", // or "PUT" depending on your API's requirements
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update deck");
      }
      return res.json();
    });
  };
  