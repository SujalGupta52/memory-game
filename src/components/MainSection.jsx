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
    for (let i = 0; i < 20; i++)
      cardArray.push(
        <Card
          name={pokemonArray[i].name}
          img={pokemonArray[i].img}
          id={pokemonArray[i].id}
          clickHandler={onCardClick}
        />
      );

  useEffect(() => {
    getRandomPokemon(40).then((value) => setPokemonArray(value));
  }, []);

  return <div className="card-cont">{cardArray}</div>;
}

async function getRandomPokemon(size) {
  let pokeArray = [];
  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * 150 + 1);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}`,
      {
        mode: "cors",
      }
    );
    const pokemon = await response.json();
    pokeArray.push({
      name: pokemon.name,
      id: pokemon.id,
      img: pokemon.sprites.front_default,
    });
  }
  return pokeArray;
}

function shuffle(inputArray) {
  let array = inputArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
