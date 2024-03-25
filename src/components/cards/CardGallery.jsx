import React, { useState, useEffect } from 'react';

export const CardGallery = ({ userId }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [regions, setRegions] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = { 'http://localhost:8088' };

      const user = data.users.find(user => user.id === userId);
      if (user) {
        const userDecksData = user.decksId.map(deckId =>
          data.decks.find(deck => deck.id === deckId)
        );
        setUserDecks(userDecksData);

        const deckCards = userDecksData.flatMap(deck =>
          deck.cardId.map(cardId =>
            data.cards.find(card => card.id === cardId)
          )
        );
        setCards(deckCards);

        setRegions(data.regions);
        setTypes(data.type);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="card-gallery">
      {cards.map(card => (
        <Card key={card.id} card={card} regions={regions} types={types} />
      ))}
    </div>
  );
};

const Card = ({ card, regions, types }) => {
  const region = regions.find(region => region.id === card.regionId);
  const type = types.find(type => type.id === card.typeId);

  return (
    <div className="card">
      <img src={card.image} alt={card.name} />
      <div>Name: {card.name}</div>
      <div>Region: {region ? region.name : 'Unknown'}</div>
      <div>Type: {type ? type.name : 'Unknown'}</div>
    </div>
  );
};


