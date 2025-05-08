function init() {
  renedrePokemon();
}
async function renedrePokemon() {
  let pokemonsRespon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
  let pokemons =await pokemonsRespon.json();
  
  let pokemonselement = document.getElementById('pokemons');
  pokemonselement.innerHTML='';
  for (const pokemon of pokemons.results) {
    let pokemonRespon = await fetch(pokemon.url);
    let pokemonDetail = await pokemonRespon.json();
    pokemonselement. innerHTML +=` <div class="pokemon">
                                        <div class="big-circle"></div>
                                        <div class="hp">
                                            <span>HP</span>
                                            <span>${pokemonDetail['stats'][0]['base_stat']}</span>
                                        </div>
                                        <div class="main-info">
                                            <img src="${pokemonDetail['sprites']['other']['official-artwork']['front_default']}" alt="" />
                                            <h2>${pokemon.name}</h2>
                                            <div class="types" id="types-${pokemonDetail.id}>
                                            <span>Fire</span>
                                            <span>Grass</span>
                                            </div>
                                        </div>
                                        <div class="powers">
                                            <div>
                                            <span>${pokemonDetail['stats'][1]['base_stat']}</span>
                                            <span>Attack</span>
                                            </div>
                                            <div>
                                            <span>${pokemonDetail['stats'][2]['base_stat']}</span>
                                            <span>Defence</span>
                                            </div>
                                            <div>
                                            <span>${pokemonDetail['stats'][5]['base_stat']}</span>
                                            <span>speed</span>
                                            </div>
                                        </div>
                                        </div>`
                                    
  }
  
}
