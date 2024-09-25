import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_POKEMON_FILTER_OPTIONS, DEFAULT_POKEMON_SUMMARY } from 'src/constants';
import { IFilterOptions, IPokemon, IPokemonsSummary } from 'src/types';

export interface IAppContextProps {
  pokemons: IPokemon[];
  summary: IPokemonsSummary;
  filterOptions: IFilterOptions;
  maxPage: number;
  setPokemons: (pokemons: IPokemon[]) => void;
  setFilterOptions: (filterOptions: IFilterOptions) => void;
  setSummary: (summary: IPokemonsSummary) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

// Context provider
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>(
    DEFAULT_POKEMON_FILTER_OPTIONS,
  );
  const [summary, setSummary] = useState<IPokemonsSummary>(DEFAULT_POKEMON_SUMMARY);

  // TODO: maxPage should be recalculated based on filterOptions
  // Get max page
  const maxPage = useMemo(
    () => Math.ceil(summary.totalSpecies / filterOptions.pageSize),
    [filterOptions, summary],
  );

  return (
    <AppContext.Provider
      value={{
        pokemons,
        filterOptions,
        summary,
        maxPage,
        setPokemons,
        setFilterOptions,
        setSummary,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// Context
export const AppContext = createContext<IAppContextProps>({
  pokemons: [],
  filterOptions: DEFAULT_POKEMON_FILTER_OPTIONS,
  summary: DEFAULT_POKEMON_SUMMARY,
  maxPage: 0,
  setPokemons: () => {},
  setFilterOptions: () => {},
  setSummary: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
