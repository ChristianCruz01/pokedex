const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = document.getElementById("pokeName");
const buttonSearch = document.getElementById("searchPokemon");
const removePokemon = document.getElementById("borrarPokemon");
const appNode = document.getElementById("app");
const closeRemove = document.getElementById("close");
closeRemove.addEventListener("click", borrarPokemonModal);
buttonSearch.addEventListener("click", insertarPokemon);
removePokemon.addEventListener("click", borrarPokemon);

function insertarPokemon() {
  window
    .fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then((response) => {
      if (response.status === 404) {
        alert("Este pokemon no esta disponible");
      } else {
        return response.json();
      }
    })
    .then((responseJson) => {
      const allItems = [];
      const result = [];
      let contador = 0;
      for (let pokemonInfo in responseJson) {
        result.push([pokemonInfo, responseJson[pokemonInfo]]);
      }
      console.table(result);

      const pokeImagen = document.createElement("img");
      pokeImagen.src = result[14][1].front_default;

      const pokemonName = document.createElement("h1");
      pokemonName.classList.add("pokeName2");
      pokemonName.innerText = `Name: ${result[10][1]} | id: ${result[6][1]}`;

      const pokemonType = document.createElement("h3");
      pokemonType.classList.add("pokeType");
      pokemonType.innerText = `Type: ${result[16][1][0].type.name}`;

      const pokemonAttack = document.createElement("h3");
      pokemonAttack.classList.add("pokeAttack");
      pokemonAttack.innerText = `Attack: ${result[15][1][1].base_stat}`;

      const pokemonDefense = document.createElement("h3");
      pokemonDefense.classList.add("pokeDefensa");
      pokemonDefense.innerText = `Defense: ${result[15][1][2].base_stat}`;

      const pokemonSpecialDefense = document.createElement("h3");
      pokemonSpecialDefense.classList.add("pokeSpecialDefensa");
      pokemonSpecialDefense.innerText = `EspDefense: ${result[15][1][3].base_stat}`;

      const pokemonSpecialAttack = document.createElement("h3");
      pokemonSpecialAttack.classList.add("pokeSpecialAttack");
      pokemonSpecialAttack.innerText = `EspAttack: ${result[15][1][4].base_stat}`;

      const contenedor = document.createElement("section");
      contenedor.classList.add("card");

      // const cardBody = document.createElement("div");
      // cardBody.classList.add("card-body");
      contenedor.append(pokeImagen, pokemonName, pokemonType);

      contenedor.addEventListener("click", function () {
        const modalTitle = document.getElementById("staticBackdropLabel");
        const modalImage = document.getElementById("modal-image");
        const modalBody = document.getElementById("modal-body");
        const pokemonName2 = result[10][1];
        const pokemonImage2 = document.createElement("img");
        pokemonImage2.src = result[14][1].front_default;
        const pokemonType2 = document.createElement("h3");
        pokemonType2.classList.add("pokeType");
        pokemonType2.innerText = `Type: ${result[16][1][0].type.name}`;

        const pokemonAttack = document.createElement("h3");
        pokemonAttack.classList.add("pokeAttack");
        pokemonAttack.innerText = `Attack: ${result[15][1][1].base_stat}`;

        const pokemonDefense = document.createElement("h3");
        pokemonDefense.classList.add("pokeDefensa");
        pokemonDefense.innerText = `Defense: ${result[15][1][2].base_stat}`;

        const pokemonSpecialDefense = document.createElement("h3");
        pokemonSpecialDefense.classList.add("pokeSpecialDefensa");
        pokemonSpecialDefense.innerText = `EspDefense: ${result[15][1][3].base_stat}`;

        const pokemonSpecialAttack = document.createElement("h3");
        pokemonSpecialAttack.classList.add("pokeSpecialAttack");
        pokemonSpecialAttack.innerText = `EspAttack: ${result[15][1][4].base_stat}`;
        modalTitle.innerText = pokemonName2;
        modalImage.append(pokemonImage2);
        modalBody.append(
          pokemonType2,
          pokemonAttack,
          pokemonSpecialAttack,
          pokemonDefense,
          pokemonSpecialDefense
        );

        const modal = new bootstrap.Modal(
          document.getElementById("staticBackdrop")
        );
        modal.show();
        borrarPokemon();
      });

      document.body.appendChild(contenedor);
      allItems.push(contenedor);

      appNode.append(...allItems);
    });
}
function borrarPokemon() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach((pokemons) => {
    pokemons.remove(pokemons);
  });
}
function borrarPokemonModal() {
  const modalTitle = document.getElementById("staticBackdropLabel");
  const modalImage = document.getElementById("modal-image");
  const modalBody = document.getElementById("modal-body");

  // Eliminar todos los elementos hijos del modalImage y modalBody
  while (modalTitle.firstChild) {
    modalTitle.removeChild(modalTitle.firstChild);
  }
  while (modalImage.firstChild) {
    modalImage.removeChild(modalImage.firstChild);
  }

  while (modalBody.firstChild) {
    modalBody.removeChild(modalBody.firstChild);
  }
}
