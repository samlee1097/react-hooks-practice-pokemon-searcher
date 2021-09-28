import React, {useEffect, useState} from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {

  const [pokemons, SetPokemons] = useState(null)
  const [filteredPokemon, SetFilteredPokemon] = useState(null)

  useEffect(()=>{
    fetch("http://localhost:3001/pokemon")
    .then(r=>r.json())
    .then(data=>SetPokemons(data))
  }, [])

  function handleForm(newPokemon){
    SetPokemons([...pokemons, newPokemon])
  }

  function handleSearch(filterText){
    const newPokemon = [...pokemons]
    const filteredPokemon = newPokemon.filter(pokemon => pokemon.name.includes(filterText))
    SetFilteredPokemon(filteredPokemon)
  }


  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm handleForm={handleForm}/>
      <br />
      <Search handleSearch={handleSearch}/>
      <br />
      {pokemons !== null? (filteredPokemon === null?<PokemonCollection pokemons={pokemons}/> : <PokemonCollection pokemons={filteredPokemon}/> ):<h2>Loading...</h2>}
    </Container>
  );
}

export default PokemonPage;
