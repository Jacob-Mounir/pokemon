//WELCOME TO THE POKEMON WORLD

const pokeList = document.getElementById("pokeList")
let Pokemon = new Object() // GLOBAL POKEMON LIST
const promises = [] //Tom array

// ADD TO > MANAGER
const teamPokeList = document.getElementById("teamPokeList");

const reserveListElement = document.getElementById("reserveList");
const slotContainer = document.querySelector(".slot-container");

let displayedPokemons = [];

const teamSlots = document.querySelectorAll(".slot");
// TEAM
const team = []; // TEAM
const maxTeamSize = 3;
const reserveList = [] //RESERVE LIST

let uuidCounter = 0;
function generateUUID() {
  return `uuid-${uuidCounter++}`; // This will generate a unique string like "uuid-0", "uuid-1", etc.
}

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
			nickname: "",
			type: data.types.map((type) => type.type.name).join(", "),
			abilities: data.abilities.map((ability) => ability.ability.name).join(", ")

		}))
		Pokemon = pokemons
		displayPokemon(pokemons);
		attachAddToTeamListeners()


		// ADD POKEMON BUTTON
		const addButtons = document.querySelectorAll(".card-btn");
		addButtons.forEach((button, index) => {
			button.addEventListener("click", () => {
				addToTeam(Pokemon[index]);
				teamStatus(team);
				updateCountInHTML()
			});
		});
	})

// ----- DISPLAY POKEMONS ON SEARCH PAGE ------
const displayPokemon = (pokemons) => {
	displayedPokemons = pokemons;
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
	attachAddToTeamListeners()

}
// ------- SEARCH & FILTER  ------
const searchPokemon = (searchString, pokemons = Pokemon) => {
	const filteredPokemon = pokemons.filter((pokemon) => {

		return (pokemon.name.includes(searchString) || pokemon.type.includes(searchString) || pokemon.id.toString().includes(searchString))
		attachAddToTeamListeners()
	})

	displayPokemon(filteredPokemon)

}


// ----- MANAGE TEAM SITE -----

// DISPLAY POKEMONS RESERVLIST

function displayTeamPokemon(teamPokemons) {

	const teamPokemonsHTMLstring = teamPokemons
		.map((pokemon) => `
	<li class="card">
	<h3 class="nickname" id="nicknameHolder-${pokemon.uniqueId}">${pokemon.nickname}</h3>
	<img class="card-image" src="${pokemon.image}"/>
	<h2 class="card-title" id="name-${pokemon.uniqueId}">${pokemon.id}. ${pokemon.name}</h2>
	<p class="card-subtitle">Type: ${pokemon.type}</p>
	<p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
	<form class="card-form">
		<input type="text" class="card-input" placeholder="Nickname" id="nickname-${pokemon.uniqueId}">
	</form>
	<button id="changeName-${pokemon.uniqueId}" class="change-btn">Change name</button>
	<div>
		<button id="kickBtn-${pokemon.id}" class="kick-btn">Kick from List</button>
		<button id="addToTeamBtn" class="card-btn">Add to Team</button>
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
			teamStatus(team);
			updateCountInHTML()
		});
	});

	// ADD TO TEAM FROM RESERV LIST
	const addToTeamFromReserve = document.querySelectorAll('#addToTeamBtn')
	addToTeamFromReserve.forEach((button, index) =>{

		button.addEventListener('click', () => {
			if (team.length == 3) {
				updateReserveList(reserveList);
				return
			}
			const PokemonToAdd = reserveList[index];
			console.log(PokemonToAdd);
			transferPokemon(reserveList, team, PokemonToAdd.uniqueId);
			updateReserveList(reserveList);
			updateTeamDisplay(team);
			teamStatus(team)


	});
	})


// CHANGE NAME ON FIGHT CARD
	teamPokemons.forEach((pokemon) => {
		const changeNameBtn = document.getElementById(`changeName-${pokemon.uniqueId}`);
		changeNameBtn.addEventListener('click', () => {
		  changePokemonNameAtIndex(teamPokemons, pokemon.uniqueId, 'reserve');
		});
	  });
}


// function removeFromTeam(pokemonToRemove) {
// 	console.log(pokemonToRemove)
// 	const index = team.findIndex(pokemon => pokemon.id === pokemonToRemove.id);
// 	if (index !== -1) {
// 		team.splice(index, 1);
// 		moveToReserveList(pokemonToRemove);
// 	}
// 	updateTeamDisplay(team);
// }

// CHANGE THE NAME
function changePokemonNameAtIndex(array, uniqueId, arrayName) {

	const pokemonIndex = array.findIndex(p => p.uniqueId == uniqueId);
	const nicknameInput = document.getElementById(`nickname-${uniqueId}`);
	const newName = nicknameInput.value.trim();
	if (newName && pokemonIndex !== -1) {
	  array[pokemonIndex].nickname = newName; // Change the name in the array
	  document.getElementById(`nicknameHolder-${uniqueId}`).textContent = `${newName}`;

	  if (arrayName === "reserve") {
		updateReserveList(array);
	  } else {
		updateTeamDisplay(array);
	  }
	}
  }

// KICK FROM RESERV LIST
function removeFromReserve(pokemonToRemove) {
	const index = reserveList.findIndex(pokemon => pokemon.id === pokemonToRemove.id);
	if (index !== -1) {
		reserveList.splice(index, 1);
		updateReserveList(reserveList);
	}
}

//FIGHT STATUS
const status = document.getElementById('fightStatus');

function teamStatus(team) {
	if (team.length >= 3) {
		status.innerHTML = `<h4 class="green">READY TO FIGHT</h4>`;
	} else {
		status.innerHTML = `<h4 class="red">NOT READY TO FIGHT</h4>`;
	}
}
teamStatus(team);


// FIGHT CARD
function updateTeamDisplay(team) {
    teamSlots.forEach((slot, index) => {
        if (index < maxTeamSize) {
            if (index < team.length) {
                const pokemon = team[index];

                slot.innerHTML = `
    <li class="card">
		<h3 class=nickname id="nicknameHolder-${pokemon.uniqueId}">${pokemon.nickname}</h3>
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title" id="name-${pokemon.uniqueId}">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">Type: ${pokemon.type}</p>
        <p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
        <form class="card-form">
            <input type="text" id="nickname-${pokemon.uniqueId}" class="card-input" placeholder="Nickname">
        </form>
        <div>
            <button id="kickFromTeam-${pokemon.uniqueId}" class="kickFromTeam-btn">Kick from Team</button>
            <button id="changeName-${pokemon.uniqueId}" class="change-btn">Change name</button>
        </div>
    </li>
                `;

                const kickButton = slot.querySelector(`#kickFromTeam-${pokemon.uniqueId}`);
                kickButton.addEventListener("click", () => {
                    transferPokemon(team, reserveList, pokemon.uniqueId);
                    // Update the displays to reflect changes
                    updateTeamDisplay(team);
                    updateReserveList(reserveList);
                    teamStatus(team);


                });

               // CHANGE NAME IN FIGHT CARD
                const changeNameButton = slot.querySelector(`#changeName-${pokemon.uniqueId}`);
                changeNameButton.addEventListener("click", () => {
                    changePokemonNameAtIndex(team, pokemon.uniqueId, "team");
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

// MOVE TO RESERVLIST FROM FIGHT CARD
function moveToReserveList(pokemon) {
	reserveList.unshift(pokemon);
	updateReserveList(reserveList);
}

// UPDATE THE RESERVE LIST
const updateReserveList = (reserveList) => {
	displayTeamPokemon(reserveList);

}

// GENERATES NEW ID TO BE ABLE TO CHANGE THE NAME

function generateUniqueId(pokemon) {
	return `${pokemon.id}-${new Date().getTime()}`;
  }


// ADD TO TEAM
const addToTeam = (pokemon) => {
	const pokemonWithUniqueId = { ...pokemon, uniqueId: generateUniqueId(pokemon) };

	let message = '';

	if (team.length < maxTeamSize) {
		team.push(pokemonWithUniqueId);
		updateTeamDisplay(team);
		message = 'Pokémon added to your team!';
	} else {
		reserveList.push(pokemonWithUniqueId);
		updateReserveList(reserveList);
		message = 'Team full! Pokémon added to reserve.';
	}

	updateCountInHTML();
	showNotis(message);
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

//TRANSFER POKEMON BETWEEN FIGHTCARD AND RESERVLIST
function transferPokemon(team1, team2, uniqueId) {

    const pokemonIndex = team1.findIndex(p => p.uniqueId === uniqueId);
    console.log(pokemonIndex);

    if (pokemonIndex >= 0 && pokemonIndex < team1.length) {

        const [pokemonToTransfer] = team1.splice(pokemonIndex, 1);
        team2.unshift(pokemonToTransfer);
    } else {
        console.error("Invalid uniqueId:", uniqueId);
    }
	updateCountInHTML()
}

//ADD FROM SEARCH PAGE
const attachAddToTeamListeners = () => {
	const addButtons = document.querySelectorAll(".card-btn");
	addButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			addToTeam(displayedPokemons[index]);
			teamStatus(team);

		});
	});
};


const showNotis = (message) => {
	const notis = document.querySelector('.notis');
	const notisText = document.querySelector('.notisText')
	notisText.textContent = message;
	notis.style.left = '70%';


	setTimeout(() => {
		notis.style.left = '100%';
	}, 2000); // Adjust the time as needed
};


// ---- EXPORT ---- //
export { searchPokemon }
