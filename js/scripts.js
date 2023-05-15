let pokemonRepository = (function () {
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
  ];

//Function adds pokemon and validates typeof
function add(pokemon) {
  if (typeof pokemon !== "object") {
    console.log("A pokemon is required");
  }

  let keys = Object.keys(pokemon);
  if (!keys.includes("name")) {
    console.log("Missing Requirements");
  }
  pokemonList.push(pokemon);
}

//Function returns list of pokemon
function getAll() {
  return pokemonList;
}

//Function to filter pokemon by Name
function pokemonFilter(name) {
  let result = getAll().filter((pokemon) => pokemon.name == name);
  return result[0];   // starting index of 0
}

//Return Functions
return {
  add: add,
  getAll: getAll,
  pokemonFilter: pokemonFilter,
};
})();

pokemonRepository.getAll().forEach(pokemonList => document.write(pokemonList.name + ' ' + pokemonList.height + ' ' + pokemonList.types + '<br>'));