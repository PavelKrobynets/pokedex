import "./pokemonFullInfo.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { ISinglePokemonData } from "../../types/types";

export default function PokemonFullInfo() {
  const pokemon: ISinglePokemonData = useSelector(
    (state: RootState) => state.pokemon.singlePokemon
  );
console.log(pokemon.evolutions);
  return (
    <div className="pokemon-info">
      <img
        src={pokemon.sprites.other["official-artwork"]["front_default"]}
        alt="pokemon image"
        className="pokemon-info__img"
      />
      <h3 className="pokemon-info__name">{pokemon.name}</h3>
      <div className="pokemon-info__types">
        Type:{pokemon.types && pokemon.types.map((obj) => obj.type.name).join("/")}
      </div>
      <ul className="pokemon-info__stats">
        {pokemon.stats &&
          pokemon.stats.map((obj) => (
            <li key={obj.stat.name} className="pokemon-info__stats-item">
              <span className="stat-name">{obj.stat.name}:</span>
              <span className="stat-value">{obj.base_stat}</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(obj.base_stat / 255) * 100}%` }}
                />
              </div>
            </li>
          ))}
      </ul>
      <ul className="pokemon-info__evolution">
        {pokemon.evolutions &&
          pokemon.evolutions.map((obj) => (
            <li key={obj.name} className="pokemon-info__evolution-item">
              <img
                src={obj.img}
                alt="pokemon image"
                className="pokemon-info__evolution-item-img"
              />
              <span className="pokemon-info__evolution-item-name">
                {obj.name}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
