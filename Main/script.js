
const fetchPokemon = () => {

	for (let i = 1; i <= 150; i++) {
	const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
	fetch(url)
		.then ((res) => res.json())
		.then((data) =>{
			console.log( '1' + data);
			const pokemon = {};
			pokemon['name'] = data.name
			pokemon['id'] = data.id
			pokemon['image'] = data.sprites
			['front_default']
			data.types.forEach( type => {
				pokemon ['type'] = pokemon ['type'] + ", " + type.type.name
			})
			console.log(pokemon);

	})

	}}

	fetchPokemon()