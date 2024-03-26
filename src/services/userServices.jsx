export const getUsers = () => {
    return fetch(`http://localhost:8088/users`).then((res) => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) => 
    res.json()
    )
}

export const createUser = (customer) => {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    }).then((res) => res.json())
}

export const createDeck = (deck) => {
    return fetch(`http://localhost:8088/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deck),
    }).then((res) => res.json());
  };


  