<<<<<<< HEAD
import { searchPokemon } from "./script.js";
=======
import {searchPokemon} from "./script.js";
>>>>>>> playground

const teamPage = document.getElementById("teamPage");
const searchPage = document.getElementById("searchPage");
const switchBtn = document.getElementById("switch-btn");

const searchBar = document.getElementById("searchBar")

<<<<<<< HEAD
const addBtn = document.getElementById("addBtn")

=======
>>>>>>> playground
switchBtn.addEventListener('click', () => {
	if (teamPage.classList.contains('hide')) {

		teamPage.classList.remove('hide');
		searchPage.classList.add('hide');

<<<<<<< HEAD
=======
		switchBtn.classList.add('switch-btn')
>>>>>>> playground
		switchBtn.innerText = 'Manage Team';

	} else {

		teamPage.classList.add('hide');
		searchPage.classList.remove('hide');

<<<<<<< HEAD
=======
		switchBtn.classList.add('switch-btn')
>>>>>>> playground
		switchBtn.innerText = 'Find Pokémon';
	}
});


searchBar.addEventListener('keyup', (e) => {

	const searchString = e.target.value.toLowerCase();

	searchPokemon(searchString)

})


<<<<<<< HEAD
// ADD FUNCTION
addBtn.addEventListener('click', () => {
	// När man klickar så ska man denna Pokemon läggas in i reserv listan (En ny array antar jag, så då lär vi använda .map?)

	// Listan ska först lägga till dom tre första pokemons man lägger till i de tomma div-elementen som heter ".slot" som ligger under section #searchPage. Resterande pokemons som man lägger till från SearchPage hamnar i Reserv. Via drag & drop ska du kunna lägga till reserverna i div-elementen slot. Om man lägger en pokemon från reserv listan så ska det som ligger i rutan hamna på första plats i reserv listan.

	// När man har clickat på knappen så ska knappen ändra färg till grön och texten ska ändra till "Added"

	//
})
=======




// // ADD FUNCTION
// addBtn.addEventListener('click', () => {
// 	// När man klickar så ska man denna Pokemon läggas in i reserv listan (En ny array antar jag, så då lär vi använda .map?)

// 	// Listan ska först lägga till dom tre första pokemons man lägger till i de tomma div-elementen som heter ".slot" som ligger under section #searchPage. Resterande pokemons som man lägger till från SearchPage hamnar i Reserv. Via drag & drop ska du kunna lägga till reserverna i div-elementen slot. Om man lägger en pokemon från reserv listan så ska det som ligger i rutan hamna på första plats i reserv listan.

// 	// När man har clickat på knappen så ska knappen ändra färg till grön och texten ska ändra till "Added"

// 	//
>>>>>>> playground
