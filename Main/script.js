
const pokeList = document.getElementById("pokeList")
let Pokemon = new Object() // GLOBAL POKEMON LIST
const promises = [] //Tom array

// ADD TO MANGER
const teamPokeList = document.getElementById("teamPokeList");
// const addBtn = document.getElementById("addBtn")
const teamList = [] //
const reserveListElement = document.getElementById("teamList");
const slotContainer = document.querySelector(".slot-container");
const teamSlots = document.querySelectorAll(".slot");


// TEAM
const maxTeamSize = 3;
const team = [];



//MAIN FETCH LOOP
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


		// ADD POKEMON + EFFECT
		const addButtons = document.querySelectorAll(".card-btn");
		addButtons.forEach((button, index) => {
			button.addEventListener("click", () => {
				addToTeam(Pokemon[index]);

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
// ------- SEARCH & FILTER  ------
const searchPokemon = (searchString, pokemons = Pokemon) => {
	const filteredPokemon = pokemons.filter((pokemon) => {

		return (pokemon.name.includes(searchString) || pokemon.type.includes(searchString) || pokemon.id.toString().includes(searchString))

	})
	displayPokemon(filteredPokemon)
}



// ----- MANAGE POKEMONS (REMOVE / ADD) -----

function displayTeamPokemon(teamPokemons) {

	const teamPokemonsHTMLstring = teamPokemons
		.map((pokemon) => `
	<li class="card">
	<img class="card-image" src="${pokemon.image}"/>
	<h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
	<p class="card-subtitle">Type: ${pokemon.type}</p>
	<p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
	<form class="card-form">
	<input type="text" class="card-input" placeholder="Nickname">
	</form>
	<div>
	<button id="changeName" class="change-btn">Change name</button>
	<button id="kickBtn" class="kick-btn">Kick from List</button>
	</div>
	</li>
    `).join("");
	teamPokeList.innerHTML = teamPokemonsHTMLstring;


	// KICK FROM TEAM BUTTON
	const kickButtons = document.querySelectorAll(".kick-btn");
	kickButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			const pokemonToRemove = teamPokemons[index];
			removeFromTeam(pokemonToRemove);
		});
	});
}



// --- COUNTER --- //

//REMOVE FROM TEAM LIST
function removeFromTeam(pokemonToRemove) {
	const index = teamList.findIndex(pokemon => pokemon.id === pokemonToRemove.id);
	if (index !== -1) {
		teamList.splice(index, 1);
		updateReserveList(teamList);
	}
}


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
	updateReserveList(teamList);
}


// UPDATE THE RESERVE LIST
const updateReserveList = (teamList) => {
	displayTeamPokemon(teamList)
}

// ADD TO RESERVE
const addToTeam = (pokemon) => {
	if (team.length < maxTeamSize) {
		team.push(pokemon);
		updateTeamDisplay(team);
	} else {
		teamList.push(pokemon);
		updateReserveList(teamList);
	}
	updateCountInHTML();
};

// COUNT POKEMONS
function countPokemonsInReserve() {
	return teamList.length + team.length;
}


// COUNTER UPDATE
function updateCountInHTML() {
	const countSpan = document.getElementById("count")
	countSpan.textContent = countPokemonsInReserve()
}


function removeFromReserve(pokemon) {
	const index = teamList.indexOf(pokemon);
	if (index > -1) {
		teamList.splice(index, 1);
	}
}



// ---- EXPORT ---- //
export { searchPokemon }
