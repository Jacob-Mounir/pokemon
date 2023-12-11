
const fetchPokemon = () => {

	for (let i = 1; i <= 150; i++) {
	const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
	fetch(url)
		.then ((res) => res.json())
		.then((data) =>{
			console.log( '1' + data);
		})

		}
	}

	fetchPokemon()