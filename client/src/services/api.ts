import axios from 'axios';
import { API_BASE_URL } from 'src/constants';
import { IFilterOptions, IPokemon } from 'src/types';

/**
 * Fetches Pokemon data from the API.
 * @param options filter options
 * @returns a list of Pokemon
 */
export const fetchPokemons = async (options: IFilterOptions): Promise<IPokemon[]> => {
  const {
    page = 1,
    pageSize = 25,
    number,
    name,
    type1,
    type2,
    generation,
    movesCount,
    sort,
    sortDirection = 'asc',
  } = options;

  let url = `${API_BASE_URL}/api/pokemon?page=${page}&pageSize=${pageSize}`;

  number && (url += `&number=${number}`);
  name && (url += `&name=${name}`);
  type1 && (url += `&type1=${type1}`);
  type2 && (url += `&type2=${type2}`);
  generation && (url += `&generation=${generation}`);
  movesCount && (url += `&movesCount=${movesCount}`);
  sort && (url += `&sort=${sort}`);
  sortDirection && (url += `&sortDirection=${sortDirection}`);

  const response = await axios.get(url);

  return response.data;
};

/**
 * Fetches the total number of species from the API.
 * @returns the total number of species
 */
export const fetchPokemonTotalSpecies = async (): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/api/pokemon/total-species`);

  return response.data;
};

/**
 * Fetches pokemon count per type from the API.
 * @returns a dictionary with Pokemon types as keys and their respective counts as values
 */
export const fetchPokemonCountsPerType = async (): Promise<Record<string, number>> => {
  const response = await axios.get(`${API_BASE_URL}/api/pokemon/counts-per-type`);

  return response.data;
};

/**
 * Fetches pokemon count per generation from the API.
 * @returns a dictionary with Pokemon generations as keys and their respective counts as values
 */
export const fetchPokemonCountsPerGeneration = async (): Promise<Record<string, number>> => {
  const response = await axios.get(`${API_BASE_URL}/api/pokemon/counts-per-generation`);

  return response.data;
};

/**
 * Fetches all unique Pokemon types from the API.
 * @returns a list of all unique Pokemon types
 */
export const fetchPokemonTypes = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/pokemon/types`);

  return response.data;
};

/**
 * Fetches all unique Pokemon generations from the API.
 * @returns a list of all unique Pokemon generations
 */
export const fetchPokemonGenerations = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/pokemon/generations`);

  return response.data;
};

/**
 * Fetches pokemon by number from the API.
 * @param number the number of the pokemon
 * @returns a pokemon
 */
export const fetchPokemonByNumber = async (number: number): Promise<IPokemon | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/pokemon/by-number/${number}`);

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * Fetches pokemon by name from the API.
 * @param name the name of the pokemon
 * @returns a pokemon
 */
export const fetchPokemonByName = async (name: string): Promise<IPokemon | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/pokemon/by-name/${name}`);

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
