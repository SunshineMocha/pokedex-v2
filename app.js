console.log("hello pokemon world")

let actualPageIndex;

getNextPage();

function getNextPage() {
    if (actualPageIndex === undefined) {
        actualPageIndex = 0;
    } else{
        actualPageIndex++;
    }

    PokeService.getPage(actualPageIndex).then(pokemons =>{
        displayPokemons(pokemons);
    })
}

function getPreviousPage() {
    actualPageIndex--;
    PokeService.getPage(actualPageIndex).then(pokemons =>{
        displayPokemons(pokemons);
    })
}

function displayPokemons(pokemons) {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';
    for (const pokemon of pokemons) {
        
        pokemonContainer.innerHTML += `
        <details>
            <summary>
                <span>
                    #${pokemon.id}
                </span>
                <img class="list-img" src="${pokemon.sprites.front_default}" alt="pokemon-ico">
                <span>
                    ${pokemon.name}
                </span>
                <div class="spacer"></div>
                ${pokemon.types.map(obj => `<span class="type">
                                                ${obj.type.name}
                                            </span>`).join('')}
            </summary>

            <h3>
                Abilities:
            </h3>
            <div>
                <ul>
                ${createAbilitiesList(pokemon)}
                </ul>
                <h3>
                Stats:
                </h3>
                <ul>
                ${createStatsList(pokemon)}
                </ul>
            </div>
        </details>
        `
    }
}

function createAbilitiesList(pokemon) {
    let abilitiesHtml = '';
    for (const object of pokemon.abilities) {
        abilitiesHtml += `<li>${object.ability.name}</li>`
    }
    return abilitiesHtml;
}

function createStatsList(pokemon){
    let statsHtml = '';
    for (const object of pokemon.stats) {
        // statsHtml += `<li>${object.base_stat}</li>`
        statsHtml += `<li>${object.stat.name} ${object.base_stat}</li>`
    }
    return statsHtml;
}