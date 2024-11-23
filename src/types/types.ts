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
  base_stat: number;
  stat: {
    name: string;
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

export interface Evolution {
  species: {
    name: string;
    url: string;
  };
  evolves_to: Evolution[]; // This allows for chaining evolutions
}

export interface EvolutionChainData {
  chain: {
    evolves_to: Evolution[];
  };
}

export interface IPokemonEvolutionObj {
  img: string;
  name: string;
}

export interface ISinglePokemonData extends IPokemonStats {
  evolutions: IPokemonEvolutionObj[];
  stats: TStats[];
}
