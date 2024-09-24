export interface IPokemon {
  number: number;
  name: string;
  generation: string;
  height: number;
  weight: number;
  types: string[];
  stats: IStat[];
  moves: string[];
  abilities: string[];
  evolution: IEvolution;
  image: string;
}

export interface IStat {
  name: string;
  value: number;
}

export interface IEvolution {
  from: string | null;
  to: string[] | null;
}

export interface IFilterOptions {
  page?: number;
  pageSize?: number;
  name?: string;
  type1?: string;
  type2?: string;
  generation?: string;
  movesCount?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
}
