import React, { useCallback, useEffect, useState } from 'react';
import { IPokemon } from 'src/types';
import { Link, useParams } from 'react-router-dom';
import { fetchPokemonByName, fetchPokemonByNumber } from 'src/services/api';
import { useAppContext } from 'src/contexts';

export const PokemonDetailsPage = () => {
  const { pokemons } = useAppContext();
  const { number } = useParams<{ number: string }>();
  const [pokemon, setPokemon] = useState<IPokemon | null>();
  const [evolutions, setEvolutions] = useState<{
    evolutionFrom: IPokemon | null;
    evolutionTo: (IPokemon | null)[];
  }>({
    evolutionFrom: null,
    evolutionTo: [],
  });

  // Get pokemon by number
  {
    const getPokemon = useCallback(async () => {
      const pokemonNumber = parseInt(number ?? '');

      // Try to search in global state first.
      let pokemon: IPokemon | null = pokemons.find((p) => p.number === pokemonNumber) ?? null;

      // If not found, try to fetch from API
      if (!pokemon) {
        pokemon = await fetchPokemonByNumber(pokemonNumber);
      }

      setPokemon(pokemon);
    }, [pokemons, number]);

    useEffect(() => {
      getPokemon();
    }, [getPokemon]);
  }

  // Get evolutions
  {
    const getEveolutions = useCallback(async () => {
      if (!pokemon) return;

      // Fetch evolutions from API
      const { from, to } = pokemon.evolution;
      const evolutionNames: string[] = [];

      if (from) {
        evolutionNames.push(from);
      }
      if (to && to.length > 0) {
        evolutionNames.push(...to);
      }

      const evolutions = await Promise.all(evolutionNames.map((name) => fetchPokemonByName(name)));
      const evolutionFrom = from ? evolutions[0] : null;
      const evolutionTo = from ? evolutions.slice(1) : evolutions;

      setEvolutions({ evolutionFrom, evolutionTo });
    }, [pokemon]);

    useEffect(() => {
      getEveolutions();
    }, [getEveolutions]);
  }

  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      <div className="flex items-center">
        <p className="m-6 text-3xl font-bold">
          {pokemon ? pokemon.name : 'Sorry, Pokemon not found..'}
        </p>
        <Link className="absolute left-4 font-bold text-blue-700" to={`/`}>
          {`< Go to Dashboard`}
        </Link>
      </div>
      {pokemon && (
        <div className="flex h-0 w-full flex-grow gap-2 overflow-auto">
          <div className="flex h-full w-96 flex-col gap-2">
            {/* Avatar */}
            <img
              className="w-full rounded border border-blue-700 object-contain"
              src={pokemon.image}
              alt=""
            />
            {/* Evolution */}
            <p className="text-center font-bold text-yellow-700">Evolution</p>
            <div className="grid grid-cols-2 rounded border border-blue-700 p-2 text-center">
              <div className="flex flex-col gap-1">
                <p>From:</p>
                {evolutions.evolutionFrom && (
                  <Link
                    className="font-bold text-blue-700"
                    to={`/pokemon/${evolutions.evolutionFrom.number}`}>
                    {evolutions.evolutionFrom.name}
                  </Link>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p>To:</p>
                {evolutions.evolutionTo.map((evolution, i) =>
                  evolution ? (
                    <Link
                      key={`pokemon-details-evolution-to-${i}`}
                      className="font-bold text-blue-700"
                      to={`/pokemon/${evolution.number}`}>
                      {evolution.name}
                    </Link>
                  ) : null,
                )}
              </div>
            </div>
            {/* Stats */}
            <p className="text-center font-bold text-yellow-700">Stats</p>
            <div className="h-0 flex-grow rounded border border-blue-700">
              <div className="grid grid-cols-2 gap-2 p-2 text-center">
                {pokemon.stats.map((stat) => (
                  <p key={`pokemon-details-${pokemon.number}-${stat.name}`}>
                    {stat.name.toUpperCase()}:{' '}
                    <span className="font-bold text-blue-700">{stat.value}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-0 flex-grow flex-col text-lg">
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Number: <span className="font-bold text-blue-700">{pokemon.number}</span>
            </div>
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Name: <span className="font-bold text-blue-700">{pokemon.name}</span>
            </div>
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Generation: <span className="font-bold text-blue-700">{pokemon.generation}</span>
            </div>
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Height: <span className="font-bold text-blue-700">{`${pokemon.height} ft`}</span>
            </div>
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Weight: <span className="font-bold text-blue-700">{`${pokemon.weight} lbs`}</span>
            </div>
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Types: <span className="font-bold text-blue-700">{pokemon.types.join(', ')}</span>
            </div>
            <div className="rounded border border-b-0 border-blue-700 p-2">
              Abilities:{' '}
              <span className="max-w-full font-bold text-blue-700">
                {pokemon.abilities.join(', ')}
              </span>
            </div>
            <div className="h-0 flex-grow rounded border border-blue-700 p-2">
              Moves:{' '}
              <span className="max-w-full font-bold text-blue-700">{pokemon.moves.join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
