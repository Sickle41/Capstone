export const getDeckById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch deck data');
      }
      return response.json();
    })
    .then(user => {
      const deckId = user.deckID; // Assuming user has a property deckID
      if (!deckId) {
        throw new Error('User deck ID not found');
      }
      return fetch(`http://localhost:8088/decks/${deckId}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch deck data');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching deck data:', error);
      throw error; // Rethrow the error to be caught by the caller
    });
};



export const getCardById = (cardId) => {
  return fetch(`http://localhost:8088/cards`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch card data');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received data:', data); // Log the received data
      // Check if the data object contains the cards array
      if (!data || !data.cards || !Array.isArray(data.cards)) {
        throw new Error('Invalid card data received');
      }
      // Find the card object based on its id in the cards array
      const card = data.cards.find(card => card.id === cardId);
      if (!card) {
        throw new Error('Card not found');
      }
      return card;
    })
    .catch(error => {
      console.error('Error fetching card data:', error);
      throw error; // Rethrow the error to be caught by the caller
    });
};


export const updateCard = async (cardId, updatedCardData) => {
  try {
    // Fetch the current card data from the API
    const response = await fetch(`http://localhost:8088/cards/${cardId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    const currentCardData = await response.json();

    // Merge the updated card data with the current card data
    const mergedCardData = { ...currentCardData, ...updatedCardData };

    // Send a PUT request to update the card data
    const putResponse = await fetch(`http://localhost:8088/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mergedCardData),
    });

    if (!putResponse.ok) {
      throw new Error('Failed to update card data');
    }

    // Return the updated card data
    return mergedCardData;
  } catch (error) {
    console.error('Error updating card data:', error);
    throw error;
  }
};




  