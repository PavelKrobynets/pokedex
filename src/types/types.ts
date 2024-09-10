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



export interface IPokemonStats {
  name: string;
  img: string;
  id: number;
  types: TPokemonTypes[];
  forms: number;
  url: string;
  sprites: SpriteUrl;
}
