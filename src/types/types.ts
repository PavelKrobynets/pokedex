export type SpriteUrl = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export interface IPokemonStats {
  name: string;
  img: string;
  id: number;
  type: string;
  forms: number;
  url: string;
  sprites: SpriteUrl;
}
