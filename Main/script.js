
const pokeList = document.getElementById("pokeList")
let Pokemon = new Object() // GLOBAL POKEMON LIST
const promises = [] //Tom array

// ADD TO MANGER
const teamPokeList = document.getElementById("teamPokeList");
const addBtn = document.getElementById("addBtn")
const reserveList = [] //
const reserveListElement = document.getElementById("reserveList");
const slotContainer = document.querySelector(".slot-container");
const teamSlots = document.querySelectorAll(".slot");

// TEAM
const maxTeamSize = 3;
const team = [];


//Loop som hämtar data pokémons från API
for (let i = 1; i <= 900; i++) {
	const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
	promises.push(fetch(url).then((res) => res.json()));
}


// Hämtar pokemons från API
Promise.all(promises)
	.then(results => {
	const pokemons = results.map(data => ({
		name: data.name,
		id: data.id,
		image: data.sprites['front_default'],
		type: data.types.map((type) => type.type.name).join(", "),
		abilities: data.abilities.map((ability) => ability.ability.name).join(", ")
	}))
	Pokemon = pokemons
	displayPokemon(pokemons);

	const addButtons = document.querySelectorAll(".card-btn");
	addButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
		addToReserve(Pokemon[index]);
		});
	});
})

// ----- DISPLAY POKEMONS ON SEARCH PAGE ------
const displayPokemon = (pokemons) => {
	console.log(pokemons)
	const pokemonsHTMLstring = pokemons.map(pokemon => `
	<li class="card">
		<img class="card-image" src="${pokemon.image}"/>
		<h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
		<p class="card-subtitle">Type: ${pokemon.type}</p>
		<p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
		<button id="addBtn" class="card-btn">Add to Team</button>
		</li>`)
		.join("")
	pokeList.innerHTML = pokemonsHTMLstring

}
// -------SEARCH ----
const searchPokemon = (searchString, pokemons = Pokemon) => {

	const filteredPokemon = pokemons.filter((pokemon) => {

		return (pokemon.name.includes(searchString) || pokemon.type.includes(searchString))

	})
	displayPokemon(filteredPokemon)
}



// ----- MANAGE POKEMONS (REMOVE / ADD) ----q

function displayTeamPokemon(teamPokemons) {

	const teamPokemonsHTMLstring = teamPokemons
		.map((pokemon) => `
	<li class="card">
	<img class="card-image" src="${pokemon.image}"/>
	<h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
	<p class="card-subtitle">Type: ${pokemon.type}</p>
	<p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
	<button id="kickBtn" class="kick-btn">Kick from List</button>
	</li>
    `).join("");
	teamPokeList.innerHTML = teamPokemonsHTMLstring;

	const kickButtons = document.querySelectorAll(".kick-btn");
	kickButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			const pokemonToRemove = teamPokemons[index];
			removeFromTeam(pokemonToRemove);
		});
	});
}





const addToTeam = (pokemon) => {
	if (team.length < maxTeamSize){
	team.push(pokemon)
	updateTeamDisplay(team)
} else {rr
addToReserve(pokemon)
}}


// --- COUNTER --- //


function updateTeamDisplay(team) {
	teamSlots.forEach((slot, index) => {
		if (index < maxTeamSize) {
			if (index < team.length) {
				const pokemon = team[index];
				slot.innerHTML = `
        <div class="team-pokemon">
            <img class="team-image" src="${pokemon.image}" />
            <h2 class="team-title">${pokemon.name}</h2>
        </div>
        `;
			} else {
				slot.innerHTML = `
        <div class="empty-slot">
            <p>Empty Slot</p>
    	</div>
        `;
			}
		}
	});
	updateReserveList(reserveList);
}

const updateReserveList = (reserveList) => {
	displayTeamPokemon(reserveList)
}


function countPokemonsInReserve() {
	return reserveList.length;
}

function updateCountInHTML (){
	const countSpan = document.getElementById("count")
	countSpan.textContent = countPokemonsInReserve()
}

const addToReserve = (pokemon) => {
	reserveList.push(pokemon)
	updateReserveList(reserveList)
	updateCountInHTML()
}

function removeFromReserve(pokemon) {
	const index = reserveList.findIndex((item) => item.id === pokemon.id);
	if (index !== -1) {
		reserveList.splice(index, 1);
		updateReserveList(reserveList);
		updateCountInHTML();
	}
}



// ---- EXPORT ---- //
export {searchPokemon}
