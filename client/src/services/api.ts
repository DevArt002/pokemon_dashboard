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
    name,
    type1,
    type2,
    generation,
    movesCount,
    sort,
    sortDirection = 'asc',
  } = options;

  let url = `${API_BASE_URL}/api/pokemon?page=${page}&pageSize=${pageSize}`;

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
