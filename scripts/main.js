function init() {
  renedrePokemons();
}
async function getData(url) {
   let responsData = await fetch(url);
     return  await responsData.json();

}
async function renedrePokemons() {
   showLoading();
  // let pokemonsRespon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  // let pokemons = await pokemonsRespon.json();
let pokemons =await getData("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")

  let pokemonselement = document.getElementById("pokemons");
  pokemonselement.innerHTML = "";
  for (const pokemon of pokemons.results) {
    // let pokemonRespon = await fetch(pokemon.url);
    // let pokemonDetail = await pokemonRespon.json();
    let pokemonDetail = await getData(pokemon.url)

    pokemonselement.innerHTML += getPokemonTemplate(pokemonDetail);
    renderPokemonTypes(pokemonDetail );
  }
  hideloading();
}

function showLoading() {
  document.getElementById('loading').classList.remove('d-none');
  document.querySelector('body').classList.add('o-hidden');
}

function hideloading() {
  document.getElementById('loading').classList.add('d-none');
   document.querySelector('body').classList.remove('o-hidden');
  
}
function renderPokemonTypes(pokemonDetail) {
   let pokemonTypeElement = document.getElementById("types-" + pokemonDetail.id);
    pokemonTypeElement.innerHTML ='';
    pokemonDetail.types.forEach(singleType => {
       pokemonTypeElement.innerHTML += getPokemonTypesTemplate(singleType);
    });
  
}
function openDetail() {
  document.getElementById('overlay').classList.remove('d-none');
}
function closeDetail() {
  document.getElementById('overlay').classList.add('d-none');
  
}
function changeTab(clickesElement, tab){

let tabsSelector = document.querySelectorAll('.tabs > div');
tabsSelector.forEach(tabSelector => {
tabSelector.classList.remove('active');
});
clickesElement.classList.add('active');
 let tabsDetailSelector = document.querySelectorAll('.tabsDetail > div');
 tabsDetailSelector.forEach(tabDetailSelector => {
  tabDetailSelector.classList.add('d-none');
 });
 document.getElementById(tab).classList.remove('d-none');
}
