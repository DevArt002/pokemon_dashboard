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
         * @param number: Optional filter by Pokemon number.
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
        public ActionResult<IEnumerable<Pokemon>> Get(
            int page = 1,
            int pageSize = 25,
            int? number = null,
            string? name = null,
            string? type1 = null,
            string? type2 = null,
            string? generation = null,
            int? movesCount = null,
            string? sort = null,
            string sortDirection = "asc"
        )
        {
            // Filter Pokemons
            IEnumerable<Pokemon> pokemons = FilterPokemons(
                number,
                name,
                type1,
                type2,
                generation,
                movesCount
            );

            // Sort the filtered Pokemons
            pokemons = SortPokemons(pokemons, sort, sortDirection);

            // Pagination
            IEnumerable<Pokemon> paginatedPokemons = pokemons
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return Ok(paginatedPokemons.ToList());
        }

        /**
         * Filter the filtered Pokemon
         */
        private IEnumerable<Pokemon> FilterPokemons(
            int? number,
            string? name,
            string? type1,
            string? type2,
            string? generation,
            int? movesCount
        )
        {
            IQueryable<Pokemon> pokemons = _pokemonService.pokemons.AsQueryable();

            if (number.HasValue)
            {
                pokemons = pokemons.Where(p => p.Number == number.Value);
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                pokemons = pokemons.Where(p =>
                    p.Name.Contains(name, StringComparison.OrdinalIgnoreCase)
                );
            }

            if (!string.IsNullOrWhiteSpace(type1))
            {
                pokemons = pokemons.Where(p =>
                    p.Types.Count > 0
                    && p.Types[0].Equals(type1, StringComparison.OrdinalIgnoreCase)
                );
            }

            if (!string.IsNullOrWhiteSpace(type2))
            {
                pokemons = pokemons.Where(p =>
                    p.Types.Count > 1
                    && p.Types[1].Equals(type2, StringComparison.OrdinalIgnoreCase)
                );
            }

            if (!string.IsNullOrWhiteSpace(generation))
            {
                pokemons = pokemons.Where(p =>
                    p.Generation.Equals(generation, StringComparison.OrdinalIgnoreCase)
                );
            }

            if (movesCount.HasValue)
            {
                pokemons = pokemons.Where(p => p.Moves.Count == movesCount.Value);
            }

            return pokemons;
        }

        /**
         * Sort the filtered Pokemon
         */
        private IEnumerable<Pokemon> SortPokemons(
            IEnumerable<Pokemon> pokemons,
            string? sort,
            string sortDirection
        )
        {
            bool isAscending = string.Equals(
                sortDirection,
                "asc",
                StringComparison.OrdinalIgnoreCase
            );

            return sort?.ToLower() switch
            {
                "number" => isAscending
                    ? pokemons.OrderBy(p => p.Number)
                    : pokemons.OrderByDescending(p => p.Number),
                "name" => isAscending
                    ? pokemons.OrderBy(p => p.Name)
                    : pokemons.OrderByDescending(p => p.Name),
                "type1" => isAscending
                    ? pokemons.OrderBy(p => p.Types.FirstOrDefault())
                    : pokemons.OrderByDescending(p => p.Types.FirstOrDefault()),
                "type2" => isAscending
                    ? pokemons.OrderBy(p => p.Types.Count > 1 ? p.Types[1] : "")
                    : pokemons.OrderByDescending(p => p.Types.Count > 1 ? p.Types[1] : ""),
                "generation" => isAscending
                    ? pokemons.OrderBy(p => p.Generation)
                    : pokemons.OrderByDescending(p => p.Generation),
                "movescount" => isAscending
                    ? pokemons.OrderBy(p => p.Moves.Count)
                    : pokemons.OrderByDescending(p => p.Moves.Count),
                "height" => isAscending
                    ? pokemons.OrderBy(p => p.Height)
                    : pokemons.OrderByDescending(p => p.Height),
                "weight" => isAscending
                    ? pokemons.OrderBy(p => p.Weight)
                    : pokemons.OrderByDescending(p => p.Weight),
                _ =>
                    pokemons // Default case returns unsorted
                ,
            };
        }

        /*
         * Gets the total number of unique Pokemon species.
         *
         * @return The total number of unique Pokemon species.
         */
        [HttpGet("total-species")]
        public ActionResult<int> GetTotalSpecies()
        {
            return Ok(_pokemonService.GetTotalSpecies());
        }

        /*
         * Gets the counts of Pokemon per type.
         *
         * @return A dictionary with Pokemon types as keys and their respective counts as values.
         */
        [HttpGet("counts-per-type")]
        public ActionResult<Dictionary<string, int>> GetCountsPerType()
        {
            return Ok(_pokemonService.GetCountsPerType());
        }

        /*
         * Gets the counts of Pokemon per generation.
         *
         * @return A dictionary with generations as keys and their respective counts as values.
         */
        [HttpGet("counts-per-generation")]
        public ActionResult<Dictionary<string, int>> GetCountsPerGeneration()
        {
            return Ok(_pokemonService.GetCountsPerGeneration());
        }

        /*
         * Gets all unique Pokemon types from the Pokemons.
         *
         * @return A list of unique types.
         */
        [HttpGet("types")]
        public ActionResult<List<string>> GetAllTypes()
        {
            return Ok(_pokemonService.GetAllTypes());
        }

        /*
         * Gets all unique generations from the Pokemons.
         *
         * @return A list of unique generations.
         */
        [HttpGet("generations")]
        public ActionResult<List<string>> GetAllGenerations()
        {
            return Ok(_pokemonService.GetAllGenerations());
        }
    }
}
