let allPokemons = [];
let offset = 0;
const LIMIT = 20;
function init() {
  renedrePokemons();
}

async function getData(url) {
  let responsData = await fetch(url);
  return await responsData.json();
}

async function renedrePokemons() {
  showLoading();
  let pokemons = await getData(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
  let pokemonselement = document.getElementById("pokemons");
  for (const pokemon of pokemons.results) {
    allPokemons.push(pokemon);
    let pokemonDetail = await getData(pokemon.url);
    pokemonselement.innerHTML += getPokemonTemplate(pokemonDetail, "types-" + pokemonDetail.id);
    renderPokemonTypes(pokemonDetail, "types-" + pokemonDetail.id);
  }
  hideloading();
}

function showLoading() {
  document.getElementById("loading").classList.remove("d-none");
  document.getElementById("load-more-button").classList.add("disable");
  document.getElementById("load-more-button").removeAttribute("onclick");
  hideBodyScroll();
}

function hideloading() {
  document.getElementById("loading").classList.add("d-none");
  document.getElementById("load-more-button").classList.remove("disable");
  document.getElementById("load-more-button").setAttribute("onclick", "lodeMorePokemon()");
  showBodyScroll();
}

function renderPokemonTypes(pokemonDetail, elementId) {
  let pokemonTypeElement = document.getElementById(elementId);
  pokemonTypeElement.innerHTML = "";
  pokemonDetail.types.forEach((singleType) => {
    pokemonTypeElement.innerHTML += getPokemonTypesTemplate(singleType);
  });
}

async function openDetail(pokemonId) {
  let pokemonDetail = await getData("https://pokeapi.co/api/v2/pokemon/" + pokemonId);
  document.getElementById("overlay").innerHTML = getPokemonDetailTemplate(pokemonDetail);
  renderPokemonTypes(pokemonDetail, "overlay-types-" + pokemonDetail.id);
  renderPokemonStats(pokemonDetail);
  document.getElementById("overlay").classList.remove("d-none");
  hideBodyScroll();
}

function renderPokemonStats(pokemonDetail) {
  let statusElement = document.getElementById("status");
  statusElement.innerHTML = "";
  pokemonDetail.stats.forEach((stat) => {
    statusElement.innerHTML += getPokemonStatTemplate(stat);
  });
}

function closeDetail(clickesElement, event) {
  if (event.target == clickesElement) {
    document.getElementById("overlay").classList.add("d-none");
    showBodyScroll();
  }
}

function nextPokemon(pokemonId) {
  let nextPokemonId = pokemonId + 1;
  if (pokemonId === allPokemons.length) {
    nextPokemonId = 1;
  }
  openDetail(nextPokemonId);
}

function previousPokemon(pokemonId) {
  let previousPokemonId = pokemonId - 1;
  if (pokemonId === 1) {
    previousPokemonId = allPokemons.length;
  }
  openDetail(previousPokemonId);
}

function changeTab(clickesElement, tab) {
  activeSelectedTab(clickesElement);
  showSelectedTbDetai(tab);
}

function activeSelectedTab(clickesElement) {
  let tabsSelector = document.querySelectorAll(".tabs > div");
  tabsSelector.forEach((tabSelector) => {
    tabSelector.classList.remove("active");
  });
  clickesElement.classList.add("active");
}
function showSelectedTbDetai(tab) {
  let tabsDetailSelector = document.querySelectorAll(".tabsDetail > div");
  tabsDetailSelector.forEach((tabDetailSelector) => {
    tabDetailSelector.classList.add("d-none");
  });
  document.getElementById(tab).classList.remove("d-none");
}

function showBodyScroll() {
  document.querySelector("body").classList.remove("o-hidden");
}

function hideBodyScroll() {
  document.querySelector("body").classList.add("o-hidden");
}
function lodeMorePokemon() {
  offset += LIMIT;
  renedrePokemons();
}
async function searchPokemon(element) {
  let searchValue = element.value;
  if (searchValue.length >= 3) {
    renderSearchPokemons(searchValue);
    showSearchPokemonsSection();
  } else {
    showPokemonsSection();
  }
}

async function renderSearchPokemons(searchValue) {
  let searchPokemons = allPokemons.filter((pokemon) => pokemon.name.includes(searchValue));
  let searchPokemonsElement = document.getElementById("search-pokemons");
  searchPokemonsElement.innerHTML = "";
  for (const pokemon of searchPokemons) {
    let pokemonDetail = await getData(pokemon.url);
    searchPokemonsElement.innerHTML += getPokemonTemplate(pokemonDetail, "search-types-" + pokemonDetail.id);
    renderPokemonTypes(pokemonDetail, "search-types-" + pokemonDetail.id);
  }
}

function showSearchPokemonsSection() {
  document.getElementById("pokemons").classList.add("d-none");
  document.getElementById("search-pokemons").classList.remove("d-none");
  document.getElementById("load-more-button").classList.add("d-none");
}

function showPokemonsSection() {
  document.getElementById("pokemons").classList.remove("d-none");
  document.getElementById("search-pokemons").classList.add("d-none");
  document.getElementById("load-more-button").classList.remove("d-none");
  document.getElementById("search-pokemons").innerHTML = "";
}
