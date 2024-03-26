export const getDeckById = (userId, deckId) => {
    return fetch(`http://localhost:8088/users/${userId}/decks/${deckId}`)
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
    return fetch(`http://localhost:8088/cards/${cardId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching card data:', error);
        throw error; // Rethrow the error to be caught by the caller
      });
  };
  