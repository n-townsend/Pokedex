const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Function to add pokemon & validate pokemon to pokedex  
  return {
      add: function(pokemon) {
          if (typeof pokemon === "object") {
              const keys = Object.keys(pokemon);
              const hasName = keys.includes("name");
              const hasUrl = keys.includes("detailsUrl");
              if (hasName && hasUrl) {
                  pokemonList.push(pokemon);
              }
          }
      },

// Return Pokemon List      
      getAll: function() {
          return pokemonList;
      },

      addListItem: function(pokemon) {
          const pokemonList = document.querySelector('.pokemon-list');//New Variable to take the defined class from the UL on HTML Page
          const listItem = document.createElement('li');//New Variable to create 'li' inside 'ul'
          listItem.classList.add('list-group-item');
          
          const button = document.createElement('button');//Created a button element to be used for each item
          button.innerText = (pokemon.name);//text to be displayed inside button, this is set to draw the name of each pokemon in the list
          button.classList.add('btn');
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#exampleModal');
          
          listItem.appendChild(button);//This appends (connects) the button to the 'li'
          pokemonList.appendChild(listItem);//Appends 'li' to the parent list element
          button.addEventListener('click', function() { pokemonRepository.showDetails(pokemon) });//Event Listener for showing pokemon when selected
      },

//Function for pulling list from api      
      loadList: function() {
          return fetch(apiUrl).then(function(response) {
              return response.json();
          }).then(function (json) {
              json.results.forEach(function(item) {
                  const pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                  };
                  pokemonRepository.add(pokemon);
              });
          }).catch(function (e) {
              console.error(e);
          })
      },

//Function to load details pulled from detailsurl in the api      
      loadDetails: function(pokemon) {
          return fetch(pokemon.detailsUrl).then(function(response) {
              return response.json();
          }).then(function(details) {
              pokemon.imageURL = details.sprites.front_default;
              pokemon.height = details.height;
              pokemon.types = details.types;
          }).catch(function (e) {
              console.error(e);
          });
      },

      showDetails: function (pokemon) {
          pokemonRepository.loadDetails(pokemon).then(function () {
              pokemonRepository.showModal(pokemon);
          });
      },

//Show Modal Function      
      showModal: function showModal(pokemon) {
          //Add modal content
          const modalTitle = document.querySelector('.modal-title');
          modalTitle.innerText = pokemon.name;
          
          const pokemonImage = document.querySelector('.pokemon-image');
          pokemonImage.src = pokemon.imageURL;
          
          const pokemonHeight = document.querySelector('.pokemon-height');
          pokemonHeight.innerText = 'Height: ' + (pokemon.height/10) + 'm';              
      },
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});
