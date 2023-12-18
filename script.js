//WELCOME TO THE POKEMON WORLD

const pokeList = document.getElementById("pokeList")
let Pokemon = new Object() // GLOBAL POKEMON LIST
const promises = [] //Tom array

// ADD TO > MANAGER
const teamPokeList = document.getElementById("teamPokeList");

const reserveListElement = document.getElementById("reserveList");
const slotContainer = document.querySelector(".slot-container");



const teamSlots = document.querySelectorAll(".slot");
// TEAM
const team = []; // TEAM
const maxTeamSize = 3;
const reserveList = [] //RESERVE LIST



//MAIN FETCH LOOP
for (let i = 1; i <= 1017; i++) {
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
	<button id="changeName" class="change-btn">Change name</button>
	<div>
	<button id="kickBtn" class="kick-btn">Kick from List</button>
	<button id="addBtn" class="card-btn">Add to Team</button>
	</div>
	</li>
    `).join("");
	teamPokeList.innerHTML = teamPokemonsHTMLstring;


	// KICK FROM RESERVE LIST BUTTON
	const kickButtons = document.querySelectorAll(".kick-btn");
	kickButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			const pokemonToRemove = teamPokemons[index];
			removeFromReserve(pokemonToRemove);
		});
	});
}



function removeFromTeam(pokemonToRemove) {
	console.log(pokemonToRemove)
	const index = team.findIndex(pokemon => pokemon.id === pokemonToRemove.id);
	if (index !== -1) {
		team.splice(index, 1);
		moveToReserveList(pokemonToRemove);
	}
	updateTeamDisplay(team);
}



function removeFromReserve(pokemonToRemove) {
	const index = reserveList.findIndex(pokemon => pokemon.id === pokemonToRemove.id);
	if (index !== -1) {
		reserveList.splice(index, 1);
		updateReserveList(reserveList);
	}
}


// const status = getElementById('fightStatus')
// function teamStatus() {
// 	if (maxTeamSize == 3) {
// 		status.innerTEXT = 'Ready to Fight'

// 	}

// }



function updateTeamDisplay(team) {
    teamSlots.forEach((slot, index) => {
        if (index < maxTeamSize) {
            if (index < team.length) {
                const pokemon = team[index];

                slot.innerHTML = `
    <li class="card">
    <img class="card-image" src="${pokemon.image}"/>
    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
    <p class="card-subtitle">Type: ${pokemon.type}</p>
    <p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
    <form class="card-form">
    <input type="text" class="card-input" placeholder="Nickname">
    </form>
	<div>
    <button class="kickFromTeam-btn">Kick from Team</button>
    <button class="change-btn">Change name</button>
    </div>
    </li>
    `;

                // Assign the event listener directly to the button in this slot
                const kickButton = slot.querySelector(".kickFromTeam-btn");
                kickButton.addEventListener("click", () => {
                    console.log("Kicking", index);
                    transferPokemon(team, reserveList, index);
                    // Update the displays to reflect changes
                    updateTeamDisplay(team);
                    updateReserveList(reserveList);
                });
            } else {
                slot.innerHTML = `
        <div class="empty-slot">
            <p>Empty Slot</p>
    	</div>
        `;
            }
        }
    });

}


function moveToReserveList(pokemon) {
	reserveList.unshift(pokemon);
	updateReserveList(reserveList);
}

// UPDATE THE RESERVE LIST
const updateReserveList = (reserveList) => {
	displayTeamPokemon(reserveList)
}

// ADD TO RESERVE
const addToTeam = (pokemon) => {
	if (team.length < maxTeamSize) {
		team.push(pokemon);
		updateTeamDisplay(team);
	} else {
		reserveList.push(pokemon);
		updateReserveList(reserveList);
	}
	updateCountInHTML();
};

// COUNT POKEMONS
function countPokemonsInReserve() {
	return reserveList.length + team.length;
}


// COUNTER UPDATE
function updateCountInHTML() {
	const countSpan = document.getElementById("count")
	countSpan.textContent = countPokemonsInReserve()
}


function transferPokemon(team1, team2, pokemonIndex) {
	console.log(pokemonIndex);
	if (pokemonIndex >= 0 && pokemonIndex < team1.length) {
		const [pokemonToTransfer] = team1.splice(pokemonIndex, 1);
		team2.unshift(pokemonToTransfer);
	} else {
		console.error("Invalid index:", pokemonIndex);
	}
}
// ---- EXPORT ---- //
export { searchPokemon }


