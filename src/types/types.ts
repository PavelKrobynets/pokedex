export type SpriteUrl = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type TPokemonTypes = {
  type: {
    name: string;
  };
};

export type TFilteredPokemonUrl = {
  pokemon: {
    url: string;
  };
};

export type TStats = {
  [key: number]: {
    base_stat: number;
    stat: {
      name: string;
    };
  };
};

export interface IPokemonStats {
  name: string;
  id?: number;
  types: TPokemonTypes[];
  forms?: object[];
  url?: string;
  sprites: SpriteUrl;
}

export interface IPokemonEvolutionObj {
  img: string;
  name: string;
}

export interface EvolutionChain {
  chain: {
    species: { name: string };
    evolves_to: [
      {
        species: { name: string };
        evolves_to: [
          {
            species: { name: string };
          }
        ];
      }
    ];
  };
}

export interface ISinglePokemonData extends IPokemonStats {
  evolutions: IPokemonEvolutionObj[];
  stats: TStats[];
}
