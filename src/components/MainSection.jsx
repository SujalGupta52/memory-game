import { useEffect, useState } from "react";
import Card from "./Cards";

export default function MainSection({ score, setScore, setGameLost }) {
  function onCardClick(e) {
    setPokemonArray(shuffle(pokemonArray));
    if (!alreadyClickedId.includes(+e.currentTarget.id)) {
      setScore(score + 1);
      setAlreadyClickedId(alreadyClickedId.concat(+e.currentTarget.id));
    } else {
      setAlreadyClickedId([]);
      setGameLost(true);
    }
  }

  const [pokemonArray, setPokemonArray] = useState([]);
  const [alreadyClickedId, setAlreadyClickedId] = useState([]);
  const cardArray = [];

  if (pokemonArray.length > 1)
    for (let i = 0; i < 30; i++)
      cardArray.push(
        <Card
          name={pokemonArray[i].name}
          img={pokemonArray[i].img}
          id={pokemonArray[i].id}
          clickHandler={onCardClick}
        />
      );

  useEffect(() => {
    getRandomPokemon(30, setPokemonArray);
  }, []);

  if (pokemonArray.length > 1)
    return <div className="card-cont">{cardArray}</div>;
  else return <div>Loading...</div>;
}

async function getRandomPokemon(size, setData) {
  let randomNumberArray = [];
  let promiseArray = [];

  for (let i = 0; i < size; i++) {
    let randomNumber = Math.floor(Math.random() * 400 + 1);

    while (randomNumberArray.includes(randomNumber))
      randomNumber = Math.floor(Math.random() * 400 + 1);

    randomNumberArray.push(randomNumber);

    promiseArray.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`, {
        mode: "cors",
      })
    );
  }
  Promise.all(promiseArray).then((responseArray) => {
    Promise.all(responseArray.map((response) => response.json())).then(
      (pokemonArray) =>
        setData(
          pokemonArray.map((pokemon) => {
            return {
              name: pokemon.name,
              id: pokemon.id,
              img: pokemon.sprites.front_default,
            };
          })
        )
    );
  });
}

function shuffle(inputArray) {
  let array = inputArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
