import React, { ReactNode, createContext, useContext, useState } from 'react';
import { IFilterOptions, IPokemon } from 'src/types';

export interface IAppContextProps {
  pokemons: IPokemon[];
  filterOptions: IFilterOptions;
  setPokemons: (pokemons: IPokemon[]) => void;
  setFilterOptions: (filterOptions: IFilterOptions) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

// Context provider
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({});

  return (
    <AppContext.Provider
      value={{
        pokemons,
        filterOptions,
        setPokemons,
        setFilterOptions,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// Context
export const AppContext = createContext<IAppContextProps>({
  pokemons: [],
  filterOptions: {},
  setPokemons: () => {},
  setFilterOptions: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
