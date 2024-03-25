export const getAllCards = () => {
    return fetch(`http://localhost:8088/cards`).then((res) => res.json())
}