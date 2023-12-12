const pokeList = document.getElementById("pokeList")


	const promises = [] //Tom array
	for (let i = 1; i <= 200; i++) {
	const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
	promises.push(fetch(url).then((res) => res.json()))
	}

	//KÖRS PARALLELT IST FÖR EN EFTER EN
	Promise.all(promises).then(results => {
		const pokemons = results.map( data => ({
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			type: data.types.map((type) => type.type.name).join(", ")
		}))
		displayPokemon(pokemons);
	})


const displayPokemon = (pokemons) => {
	console.log(pokemons)
	const pokemonsHTMLstring = pokemons.map (pokemon => `
	<li class="card">
		<img class="card-image" src="${pokemon.image}"/>
		<h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
		<p class="card-subtitle">Type: ${pokemon.type}</p>
		<button class="card-btn">Add To team</button>
		</li>`)
		.join("")
	pokeList.innerHTML = pokemonsHTMLstring
}


	fetchPokemons()