namespace PokemonAPI.Models
{
    public class Pokemon
    {
        public int Number { get; set; }
        public required string Name { get; set; }
        public required string Generation { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public required List<string> Types { get; set; }
        public required List<Stat> Stats { get; set; }
        public required List<string> Moves { get; set; }
        public required List<string> Abilities { get; set; }
        public required Evolution Evolution { get; set; }
        public required string Image { get; set; }
    }

    public class Stat
    {
        public required string Name { get; set; }
        public int Value { get; set; }
    }

    public class Evolution
    {
        public string? From { get; set; }
        public List<string>? To { get; set; }
    }
}
