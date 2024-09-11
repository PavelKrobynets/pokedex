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
	pokemon:{
		url: string
	}
}



export interface IPokemonStats {
  name: string;
  id?: number;
  types: TPokemonTypes[];
  forms?: [];
  url?: string;
  sprites: SpriteUrl;
}
