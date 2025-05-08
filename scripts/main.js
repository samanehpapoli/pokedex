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
                                            <span>32</span>
                                        </div>
                                        <div class="main-info">
                                            <img src="${pokemonDetail['sprites']['other']['official-artwork']['front_default']}" alt="" />
                                            <h2>${pokemon.name}</h2>
                                            <div class="ability">
                                            <span>Fire</span>
                                            <span>Grass</span>
                                            </div>
                                        </div>
                                        <div class="powers">
                                            <div>
                                            <span>52</span>
                                            <span>Attack</span>
                                            </div>
                                            <div>
                                            <span>43</span>
                                            <span>Defence</span>
                                            </div>
                                            <div>
                                            <span>65</span>
                                            <span>speed</span>
                                            </div>
                                        </div>
                                        </div>`
                                    
  }
  
}
