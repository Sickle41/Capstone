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






  