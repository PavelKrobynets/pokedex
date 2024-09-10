import { useRequests } from "../../hooks/useRequests";
import "./pokemonTypes.scss";

export default function PokemonTypes({
  name,
  char,
}: {
  name: string;
  char: boolean;
}) {
const request = useRequests();

  if (char) {
    return (
      <li key={name} className={`pokemon-types__item_${name}`}>
        {name}
      </li>
    );
  } else {
    return (
      <li 
			key={name} 
			className={`pokemon-types__item_${name}`} 
			onClick={() => {request.fetchFilteredPokemons(name)}}>
        {name}
      </li>
    );
  }
}
