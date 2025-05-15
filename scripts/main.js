const allPokemons = [];
let offset = 0;
const LIMIT = 20;
function init() {
  renedrePokemons();
}

async function getData(url) {
  const responsData = await fetch(url);
  return await responsData.json();
}

async function renedrePokemons() {
  showLoading();
  const pokemons = await getData(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
  const pokemonselement = document.getElementById("pokemons");
  for (const pokemon of pokemons.results) {
    console.log("geht");
    
    allPokemons.push(pokemon);
    const pokemonDetail = await getData(pokemon.url);
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
  const pokemonTypeElement = document.getElementById(elementId);
  pokemonTypeElement.innerHTML = "";
  pokemonDetail.types.forEach((singleType) => {
    pokemonTypeElement.innerHTML += getPokemonTypesTemplate(singleType);
  });
}

async function openDetail(pokemonId) {
  const pokemonDetail = await getData("https://pokeapi.co/api/v2/pokemon/" + pokemonId);
  document.getElementById("overlay").innerHTML = getPokemonDetailTemplate(pokemonDetail);
  renderPokemonTypes(pokemonDetail, "overlay-types-" + pokemonDetail.id);
  renderPokemonStats(pokemonDetail);
  document.getElementById("overlay").classList.remove("d-none");
  hideBodyScroll();
}

function renderPokemonStats(pokemonDetail) {
  const statusElement = document.getElementById("status");
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
  const tabsSelector = document.querySelectorAll(".tabs > div");
  tabsSelector.forEach((tabSelector) => {
    tabSelector.classList.remove("active");
  });
  clickesElement.classList.add("active");
}
function showSelectedTbDetai(tab) {
  const tabsDetailSelector = document.querySelectorAll(".tabsDetail > div");
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
function submitSearchForm(formElement, formEvent) {
  formEvent.preventDefault();
  let searchValue = formElement.search.value;
  searchPokemon(searchValue);
}
function resetSearchForm() {
  let searchValue = "";
  searchPokemon(searchValue);
}

async function searchPokemon(searchValue) {
  if (searchValue.length >= 3) {
    renderSearchPokemons(searchValue);
    showSearchPokemonsSection();
  } else {
    document.querySelector("body").classList.remove("blur-filter");
    showPokemonsSection();
  }
}

async function renderSearchPokemons(searchValue) {
  const searchPokemons = allPokemons.filter((pokemon) => pokemon.name.includes(searchValue));
  const searchPokemonsElement = document.getElementById("search-pokemons");

  if (searchPokemons.length > 0) {
    document.querySelector("body").classList.remove("blur-filter");
    searchPokemonsElement.innerHTML = "";
    for (const pokemon of searchPokemons) {
      let pokemonDetail = await getData(pokemon.url);
      searchPokemonsElement.innerHTML += getPokemonTemplate(pokemonDetail, "search-types-" + pokemonDetail.id);
      renderPokemonTypes(pokemonDetail, "search-types-" + pokemonDetail.id);
    }
  } else {
    searchPokemonsElement.innerHTML = getEmptypokemonTemplate();
    document.querySelector("body").classList.add("blur-filter");
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
