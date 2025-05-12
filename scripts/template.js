function getPokemonTemplate(pokemonDetail) {
  return ` <div class="pokemon" onclick="openDetail(${pokemonDetail.id})">
            <div class="big-circle bg-${pokemonDetail.types[0].type.name}"></div>
            <div class="hp">
                <span>HP</span>
                <span>${pokemonDetail["stats"][0]["base_stat"]}</span>
            </div>
            <div class="main-info">
                <img src="${pokemonDetail["sprites"]["other"]["official-artwork"]["front_default"]}" alt="" />
                <h2 class="fc-${pokemonDetail.types[0].type.name}">${pokemonDetail.name}</h2>
                <div class="types" id="types-${pokemonDetail.id}"></div>
            </div>
            <div class="powers">
                <div>
                <span>${pokemonDetail["stats"][1]["base_stat"]}</span>
                <span>Attack</span>
                </div>
                <div>
                <span>${pokemonDetail["stats"][2]["base_stat"]}</span>
                <span>Defence</span>
                </div>
                <div>
                <span>${pokemonDetail["stats"][5]["base_stat"]}</span>
                <span>speed</span>
                </div>
            </div>
            </div>`;
}
function getPokemonTypesTemplate(singleType) {
  return `<span class="bg-${singleType.type.name}">${singleType.type.name}</span>`;
}
function getPokemonDetailTemplate(pokemonDetail) {
  return `<div class="pokemon-overlay bg-lg-${pokemonDetail.types[0].type.name}">
          <img src="./assets/img/loso2.svg" class="logo" alt="logo" />
          <div class="icons">
            <img src="./assets/icon/left-arrow (1).png" alt="" onclick = "previousPokemon(${pokemonDetail.id})" />
            <img src="./assets/icon/close.png" alt="" onclick="closeDetail(this,event)" />
            <img src="./assets/icon/right-arrow (1).png" alt="${pokemonDetail.name}" onclick="nextPokemon(${pokemonDetail.id})" />
          </div>
          <div class="top">
            <img src="${pokemonDetail["sprites"]["other"]["official-artwork"]["front_default"]}" alt="${pokemonDetail.name}" />
            <div class="code">#${pokemonDetail.id}</div>
            <h2 class="name">${pokemonDetail.name}</h2>
            <div class="abilities" id="overlay-types-${pokemonDetail.id}"></div>
          </div>
          <div class="tabs">
            <div class="active" onclick="changeTab(this, 'detail')">Details</div>
            <div onclick="changeTab(this, 'status')">Status</div>
          </div>
          <div class="tabsDetail">
            <div class="detail" id="detail">
            <div>
              <div>
                <span>Height</span>
                <span>${pokemonDetail.height}m</span>
              </div>
              <div>
                <span>Weight</span>
                <span>${pokemonDetail.weight}k</span>
              </div>
            </div>
          </div>
          <div class="status d-none" id="status"></div>
          </div>
        </div>`;
}

function getPokemonStatTemplate(stat) {
    let baseStat =Math.max(1 ,Math.min (stat.base_stat, 100))
  return `<div>
            <div class="title">${stat.stat.name}</div>
            <div class="progressbar">
            <span style="width: ${baseStat}%"></span>
        </div>`;
}
