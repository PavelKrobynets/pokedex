import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from "react-redux";
import PokemonTypes from "../pokemonTypes/PokemonTypes.tsx";
import { useEffect, useRef } from "react";
import { RootState } from "../../store/store";
import { useRequests } from "../../hooks/useRequests.ts";
import { IPokemonType } from "../../slices/pokemonSlice.ts";
import "./pokemonFilter.scss";

export default function PokemonFilter() {
  const request = useRequests();
  const types = useSelector((state: RootState) => state.pokemon.types);
	const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    request.fetchPokemonTypes();
    // eslint-disable-next-line
  }, []);

	const handleSearch = () => {
		const searchValue = searchInput.current?.value;
		console.log(searchValue);
	}

  return (
    <div className="pokemon-filter">
      <div className="pokemon-filter__search">
        <input className="pokemon-filter__search-input" type="text" ref={searchInput}/>
        <button
          className="pokemon-filter__search-button"
          aria-label="Search Pokémon"
					onClick={
						handleSearch
					}
        >
          <FaMagnifyingGlass />
        </button>
      </div>
      <ul className="pokemon-filter__tabs">
        {types.map((type: IPokemonType) => {
          return <PokemonTypes key={type.name} name={type.name} char={false}/>;
        })}
      </ul>
    </div>
  );
}
