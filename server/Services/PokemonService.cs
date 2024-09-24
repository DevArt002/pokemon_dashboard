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
    }
}
