import {
  fetchPokemonCountsPerGeneration,
  fetchPokemonCountsPerType,
  fetchPokemonGenerations,
  fetchPokemonTotalSpecies,
  fetchPokemonTypes,
  fetchPokemons,
} from 'src/services/api';
import { useAppContext } from 'src/contexts';
import { useCallback, useEffect } from 'react';

/**
 * Hooks for pokemon data
 * @returns void
 */
export const usePokemonData = (): void => {
  const { filterOptions, setPokemons, setSummary } = useAppContext();

  // Get pokemons
  const getPokemons = useCallback(async () => {
    const pokemons = await fetchPokemons(filterOptions);
    setPokemons(pokemons);
  }, [filterOptions, setPokemons]);

  // Get pokemons whenever filter options change
  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  // Get summary
  const getSummary = useCallback(async () => {
    const [totalSpecies, countsPerType, countsPerGeneration, types, generations] =
      await Promise.all([
        fetchPokemonTotalSpecies(),
        fetchPokemonCountsPerType(),
        fetchPokemonCountsPerGeneration(),
        fetchPokemonTypes(),
        fetchPokemonGenerations(),
      ]);

    setSummary({
      totalSpecies,
      countsPerType,
      countsPerGeneration,
      types,
      generations,
    });
  }, [setSummary]);

  // Get summary when component is mounted
  useEffect(() => {
    getSummary();
  }, [getSummary]);
};
