import { fetchPokemons } from 'src/services/api';
import { useAppContext } from 'src/contexts';
import { useCallback, useEffect } from 'react';

/**
 * Hooks for pokemon data
 * @returns void
 */
export const usePokemonData = (): void => {
  const { filterOptions, setPokemons } = useAppContext();

  // Get pokemons
  const getPokemons = useCallback(async () => {
    const pokemons = await fetchPokemons(filterOptions);
    setPokemons(pokemons);
  }, [filterOptions, setPokemons]);

  // Get pokemons whenever filter options change
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);
};
