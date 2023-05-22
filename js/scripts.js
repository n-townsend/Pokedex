const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //modalContainer Variable to select the id from the html for the modal makeup
  let modalContainer = document.querySelector('#modal-container'); 

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
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
} //Function Created to show details so the Event Listener could log the selected pokemon data 

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
} //Function for pulling list from api

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
} //Function to load details pulled from detailsurl in the api

//Show Modal Function
function showModal(title, text) {//paramaters to enable modal in ()
  // Clear all existing modal content
  modalContainer.innerHTML = '';
  //Creates the Modal as a Div element in html with the class called modal
  let modal = document.createElement('div');
  modal.classList.add('modal');
  // Add the new modal content, Close button element created named button assigned to model close element in HTML
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');//CSS For modal close state
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);//executes hide modal when clicked
  //Create title of modal
  let titleElement = document.createElement('h1');
  titleElement.innerText = title;
  //Create inner content of modal
  let contentElement = document.createElement('p');
  contentElement.innerText = text;
  //Adds elements to modal and modal to container
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  //Adds is-visible styling from css
  modalContainer.classList.add('is-visible'); 
}
//Hide modal function
function hideModal() {
  modalContainer.classList.remove('is-visible');
}
//Hide via escape key
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();//If key press is the escape key this function will call the hide modal function  
  }
});
//close on click outside of modal
modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('pokemon', 'pokemon height');
});

//Return Functions
return {
  add: add,
  getAll: getAll,
  loadList: loadList,
  loadDetails: loadDetails,
  addListItem: addListItem,
  pokemonFilter: pokemonFilter,
};
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});