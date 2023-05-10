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

for (let i = 0; i<pokemonList.length; i++) {
    if (pokemonList[i].height < 2){
        document.write(pokemonList[i].name + " height:" + pokemonList[i].height + "<br></br>");    
    }else if (pokemonList[i].height > 2){
        document.write(pokemonList[i].name + " height:" + pokemonList[i].height + " -Wow thats big!" + "<br></br>");
    }
}