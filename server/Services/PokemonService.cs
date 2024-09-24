using System.Text.Json;
using PokemonAPI.Models;

namespace PokemonAPI.Services
{
    public class PokemonService
    {
        private List<Pokemon>? _pokemons = null;

        /*
         * Get Pokemon data from JSON file.
         *
         * @return Pokemon list
         */
        public List<Pokemon> GetPokemons()
        {
            // If _pokemons is null, load pokemon.json file and deserialize it
            if (_pokemons == null)
            {
                try
                {
                    string jsonFilePath = Path.Combine(
                        AppContext.BaseDirectory,
                        "Data",
                        "pokemon.json"
                    );

                    if (!File.Exists(jsonFilePath))
                    {
                        throw new FileNotFoundException($"The file {jsonFilePath} was not found.");
                    }

                    string json = File.ReadAllText(jsonFilePath);
                    JsonSerializerOptions options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        AllowTrailingCommas = true,
                    };
                    _pokemons = JsonSerializer.Deserialize<List<Pokemon>>(json, options);
                    _pokemons = _pokemons ?? new List<Pokemon>(); // Ensure that _pokemons is not null
                }
                catch (Exception ex)
                {
                    // Log the exception (logging logic not implemented here)
                    throw new InvalidOperationException("Failed to load Pokémon data.", ex);
                }
            }

            return _pokemons;
        }

        /*
         * Gets the total number of unique Pokemon species.
         *
         * @return The total number of unique Pokemon species.
         */
        public int GetTotalSpecies()
        {
            return GetPokemons().Select(p => p.Name).Distinct().Count();
        }

        /*
         * Gets the counts of Pokemon per type.
         *
         * @return A dictionary with Pokemon types as keys and their respective counts as values.
         */
        public Dictionary<string, int> GetCountsPerType()
        {
            return GetPokemons()
                .SelectMany(p => p.Types)
                .GroupBy(t => t)
                .ToDictionary(g => g.Key, g => g.Count());
        }

        /*
         * Gets the counts of Pokemon per generation.
         *
         * @return A dictionary with generations as keys and their respective counts as values.
         */
        public Dictionary<string, int> GetCountsPerGeneration()
        {
            return GetPokemons()
                .GroupBy(p => p.Generation)
                .ToDictionary(g => g.Key, g => g.Count());
        }

        /*
         * Gets all unique Pokemon types from Type 1 and Type 2.
         *
         * @return A list of all unique Pokemon types sorted in ascending order.
         */
        public List<string> GetAllTypes()
        {
            return GetPokemons()
                .SelectMany(p => p.Types) // Flatten Type 1 and Type 2 into a single list
                .Distinct()
                .OrderBy(type => type) // Sort in ascending order
                .ToList();
        }

        /*
         * Gets all unique generations from the Pokemons.
         *
         * @return A list of unique generations.
         */
        public List<string> GetAllGenerations()
        {
            return GetPokemons()
                .Select(p => p.Generation)
                .Distinct()
                .OrderBy(generation => generation) // Sort in ascending order
                .ToList();
        }
    }
}
