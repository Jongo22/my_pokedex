import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Buttons from "./components/Buttons";
import Cards from "./components/Cards";
import Input from "./components/Input";
import "./styles.css";

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [pokemonStatsOfSinglePokemon, setPokemonStatsOfSinglePokemon] =
    useState({
      Name: "",
      Hp: 0,
      Attack: 0,
      Defense: 0,
    });
  const [textInput, setTextInput] = useState("");
  const emptyArray: any[] = [];
  const handleInputText = useRef();

  useEffect(() => {
    fetchAllPokemonData(url);
  }, []);

  // gets all pokemon data from a given URL.
  const fetchAllPokemonData = async (url) => {
    const PokemonAPIres = await axios.get(url);
    console.log("PokemonAPIres", PokemonAPIres);

    const results = PokemonAPIres.data.results;
    // console.log("results", results);

    let count = 0;
    let array = [];

    //loops through results to get individual pokemon name and url and pushes it into and array and update the pokemons variable.
    for (const pokemon of results) {
      if (count > 20) {
        break;
      }
      count++;

      array.push(pokemon);
    }
    setPokemons(array);

    setUrl(url);
    setNextUrl(PokemonAPIres.data.next);
    setPrevUrl(PokemonAPIres.data.previous);
  };

  //fetches the stats of a pokemon from a given URL then sets its stats.
  const setSinglePokemonStats = async (i) => {
    const singlePokemonData = pokemons[i];

    const singlePokemonUrl = singlePokemonData.url;

    const singlePokemonStats = await axios.get(singlePokemonUrl);

    setPokemonStatsOfSinglePokemon({
      Name: singlePokemonStats.data.name,
      Hp: singlePokemonStats.data.stats[0].base_stat,
      Attack: singlePokemonStats.data.stats[1].base_stat,
      Defense: singlePokemonStats.data.stats[2].base_stat,
    });
  };

  //fetches pokemon data of next URL
  const fetchNextSetOfPokemon = () => {
    fetchAllPokemonData(nextUrl);
  };

  //fetches pokemon data of previous URL
  const fetchPreviousSetOfPokemon = () => {
    if (prevUrl) {
      fetchAllPokemonData(prevUrl);
    }
  };

  const handleTextButton = () => {
    const name = handleInputText.current.value;
    console.log("name", name);
  };

  //

  const searchBasedOnTextInput = async () => {
    handleTextButton();
    // console.log("pokemons", pokemons);
    console.log("handleInputText", handleInputText);
    const newArray = pokemons.filter((pokemon) =>
      pokemon.name.includes(handleInputText.current.value)
    );
    console.log("newArray", newArray);
    setPokemons(newArray);
  };

  const clearTextBox = async () => {
    setPokemons(pokemons);
    handleInputText.current.value = "";
    console.log("url", url);
    fetchAllPokemonData(url);
    setButtonClicked(false);
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <>
      <div className="main-container">
        <header className="header"> Oreo's Pokedex</header>
        <div className="text-box-container">
          <Input
            inputRef={handleInputText}
            textType="text"
            wordPlaceHolder="Search for Pokemon"
          ></Input>
          <Buttons
            pokemons={emptyArray}
            onBtnClick={searchBasedOnTextInput}
            onBtnClicked={handleButtonClick}
            isDisabled={buttonClicked}
          >
            Search
          </Buttons>
          <Buttons pokemons={emptyArray} onBtnClick={clearTextBox}>
            Clear search
          </Buttons>
        </div>

        <Buttons
          pokemons={pokemons}
          onBtnClick={(index) => {
            setSinglePokemonStats(index);
          }}
        ></Buttons>
        <div className="next-previous">
          <Buttons
            pokemons={emptyArray}
            onBtnClick={() => {
              fetchNextSetOfPokemon();
            }}
          >
            Next
          </Buttons>
          <Buttons
            pokemons={emptyArray}
            onBtnClick={() => {
              fetchPreviousSetOfPokemon();
            }}
          >
            Previous
          </Buttons>
        </div>
        <div>
          <Cards>Name: {pokemonStatsOfSinglePokemon.Name}</Cards>
          <Cards>Hp: {pokemonStatsOfSinglePokemon.Hp}</Cards>
          <Cards>Attack: {pokemonStatsOfSinglePokemon.Attack}</Cards>
          <Cards>Defense: {pokemonStatsOfSinglePokemon.Defense}</Cards>
        </div>
      </div>
    </>
  );
}

export default App;

//type in input text, an event happens (onChange)
//calls a function to search (.filter())
//function filters an array of pokemon data
//setNewPokemons
