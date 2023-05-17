const pokemonRepository = (function () {
  const pokemonList = [
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

  const keys = Object.keys(pokemon);
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
  const result = getAll().filter((pokemon) => pokemon.name === name);
  return result[0] || "No Pokemon found with that name!";   // starting index of 0
}

function addListItem(pokemon) {
  const pokemonList = document.querySelector('.pokemon-list'); //New Variable to take the defined class from the UL on HTML Page
  const listPokemon = document.createElement("li"); //New Variable to create 'li' inside 'ul'
  const button = document.createElement("button"); //Created a button element to be used for each item
  button.innerText = pokemon.name; //text to be displayed inside button, this is set to draw the name of each pokemon in the list
  button.classList.add("button-class"); //link to the css page for button styling
  listPokemon.appendChild(button); //This appends (connects) the button to the 'li'
  pokemonList.appendChild(listPokemon); //Appends 'li' to the parent list element
  button.addEventListener('click', () => {
    showDetails(pokemon);
  }); //Event Listener for logging the details of the pokemon selected in the console
}

function showDetails(pokemon) {
  console.log(pokemon)
} //Function Created to show details so the Event Listener could log the selected pokemon data 

//Return Functions
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  pokemonFilter: pokemonFilter,
};
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
