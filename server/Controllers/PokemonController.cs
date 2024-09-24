using Microsoft.AspNetCore.Mvc;
using PokemonAPI.Models;
using PokemonAPI.Services;

namespace PokemonAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly PokemonService _pokemonService;

        public PokemonController(PokemonService pokemonService)
        {
            // Initialize the PokemonService through dependency injection
            _pokemonService = pokemonService;
        }

        /*
         * Get all Pokemons with optional pagination, filtering, and sorting.
         *
         * @param page: The page number for pagination (default: 1).
         * @param pageSize: The number of Pokemons per page (default: 25).
         * @param name: Optional filter by Pokemon name.
         * @param type1: Optional filter by 1st Pokemon type.
         * @param type2: Optional filter by 2nd Pokemon type.
         * @param generation: Optional filter by Pokemon generation.
         * @param movesCount: Optional filter by minimum moves count.
         * @param sort: Optional sort parameter for Pokemon.
         * @param sortDirection: The direction of sorting (asc or desc).
         * @return A paginated list of Pokemons.
         */
        [HttpGet]
        public ActionResult<List<Pokemon>> Get(
            int page = 1,
            int pageSize = 25,
            string? name = null,
            string? type1 = null,
            string? type2 = null,
            string? generation = null,
            int? movesCount = null,
            string? sort = null,
            string? sortDirection = "asc"
        )
        {
            List<Pokemon> pokemons = _pokemonService.GetPokemons();

            // Filter by name
            if (!string.IsNullOrWhiteSpace(name))
            {
                pokemons = pokemons
                    .Where(p => p.Name.Contains(name, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            // Filter by Type 1
            if (!string.IsNullOrWhiteSpace(type1))
            {
                pokemons = pokemons
                    .Where(p => p.Types[0].Equals(type1, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            // Filter by Type 2
            if (!string.IsNullOrWhiteSpace(type2))
            {
                pokemons = pokemons
                    .Where(p =>
                        p.Types.Count > 1
                        && p.Types[1].Equals(type2, StringComparison.OrdinalIgnoreCase)
                    )
                    .ToList();
            }

            // Filter by generation
            if (!string.IsNullOrWhiteSpace(generation))
            {
                pokemons = pokemons
                    .Where(p => p.Generation.Equals(generation, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            // Filter by moves count
            if (movesCount.HasValue)
            {
                pokemons = pokemons.Where(p => p.Moves.Count == movesCount.Value).ToList();
            }

            // Sort
            bool isAscending = string.Equals(
                sortDirection,
                "asc",
                StringComparison.OrdinalIgnoreCase
            );
            switch (sort?.ToLower())
            {
                case "number":
                    pokemons = isAscending
                        ? pokemons.OrderBy(p => p.Number).ToList()
                        : pokemons.OrderByDescending(p => p.Number).ToList();
                    break;
                case "name":
                    pokemons = isAscending
                        ? pokemons.OrderBy(p => p.Name).ToList()
                        : pokemons.OrderByDescending(p => p.Name).ToList();
                    break;
                case "type1":
                    pokemons = isAscending
                        ? pokemons.OrderBy(p => p.Types[0]).ToList()
                        : pokemons.OrderByDescending(p => p.Types[0]).ToList();
                    break;
                case "type2":
                    pokemons = isAscending
                        ? pokemons.OrderBy(p => p.Types.Count > 1 ? p.Types[1] : "").ToList()
                        : pokemons
                            .OrderByDescending(p => p.Types.Count > 1 ? p.Types[1] : "")
                            .ToList();
                    break;
                case "generation":
                    pokemons = isAscending
                        ? pokemons.OrderBy(p => p.Generation).ToList()
                        : pokemons.OrderByDescending(p => p.Generation).ToList();
                    break;
                case "movescount":
                    pokemons = isAscending
                        ? pokemons.OrderBy(p => p.Moves.Count).ToList()
                        : pokemons.OrderByDescending(p => p.Moves.Count).ToList();
                    break;
                default:
                    // Default sorting can be handled here if needed
                    break;
            }

            // Pagination
            List<Pokemon> paginatedPokemons = pokemons
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(paginatedPokemons);
        }

        /*
         * Gets the total number of unique Pokemon species.
         *
         * @return The total number of unique Pokemon species.
         */
        [HttpGet("total-species")]
        public ActionResult<int> GetTotalSpecies()
        {
            int totalSpecies = _pokemonService.GetTotalSpecies();
            return Ok(totalSpecies);
        }

        /*
         * Gets the counts of Pokemon per type.
         *
         * @return A dictionary with Pokemon types as keys and their respective counts as values.
         */
        [HttpGet("counts-per-type")]
        public ActionResult<Dictionary<string, int>> GetCountsPerType()
        {
            Dictionary<string, int> counts = _pokemonService.GetCountsPerType();
            return Ok(counts);
        }

        /*
         * Gets the counts of Pokemon per generation.
         *
         * @return A dictionary with generations as keys and their respective counts as values.
         */
        [HttpGet("counts-per-generation")]
        public ActionResult<Dictionary<string, int>> GetCountsPerGeneration()
        {
            Dictionary<string, int> counts = _pokemonService.GetCountsPerGeneration();
            return Ok(counts);
        }

        /*
         * Gets all unique Pokemon types from the Pokemons.
         *
         * @return A list of unique types.
         */
        [HttpGet("types")]
        public ActionResult<List<string>> GetAllTypes()
        {
            var types = _pokemonService.GetAllTypes();
            return Ok(types);
        }

        /*
         * Gets all unique generations from the Pokemons.
         *
         * @return A list of unique generations.
         */
        [HttpGet("generations")]
        public ActionResult<List<string>> GetAllGenerations()
        {
            var generations = _pokemonService.GetAllGenerations();
            return Ok(generations);
        }
    }
}
