let pokemonList = [
    {
    name: 'Charizard',
    height: 1.7,
    types: ['Fire', 'Flying'],
    },
    {
    name: 'Alakazam',
    height: 1.5,
    types: ['Psychic'],
    },
    {
    name: 'Onix',
    height: 8.8,
    types: ['Rock', 'Ground'],
    }
]

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + ': ' + pokemon.height + ' ' + pokemon.types + '<br>');
});