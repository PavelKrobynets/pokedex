import "./pokemonTypes.scss";

export default function PokemonTypes({ name }: { name: string }) {
  return (
    <li key={name} className={`pokemon-types__item_${name}`}>
      {name}
    </li>
  );
}
