function getPokemonTemplate(pokemonDetail){
    return ` <div class="pokemon" onclick="openDetail()">
            <div class="big-circle bg-${pokemonDetail.types[0].type.name}"></div>
            <div class="hp">
                <span>HP</span>
                <span>${pokemonDetail["stats"][0]["base_stat"]}</span>
            </div>
            <div class="main-info">
                <img src="${pokemonDetail["sprites"]["other"]["official-artwork"]["front_default"]}" alt="" />
                <h2 class="fc-${pokemonDetail.types[0].type.name}">${pokemonDetail.name}</h2>
                <div class="types" id="types-${pokemonDetail.id}">
                <span>Fire</span>
                <span>Grass</span>
                </div>
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
    return  `<span class="bg-${singleType.type.name}">${singleType.type.name}</span>`;
    
}