const pokeList = document.getElementById("pokeList")
let Pokemon = new Object() // GLOBAL POKEMON LIST

const addBtn = document.getElementById("addBtn")




const promises = [] //Tom array

//Loop som hämtar data pokémons från API
for (let i = 1; i <= 900; i++) {
	const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
	promises.push(fetch(url).then((res) => res.json()));
}


// Hämtar pokemons från API
Promise.all(promises).then(results => {
	const pokemons = results.map(data => ({
		name: data.name,
		id: data.id,
		image: data.sprites['front_default'],
		type: data.types.map((type) => type.type.name).join(", "),
		abilities: data.abilities.map((ability) => ability.ability.name).join(", ")
	}))
	Pokemon = pokemons
	displayPokemon(pokemons);
})

// ----- DISPLAY POKEMONS ------
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

export { searchPokemon }


// ----- MANAGE POKEMONS ----

const addedPokemons = (pokemon) => {
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