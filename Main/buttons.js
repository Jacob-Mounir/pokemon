import { searchPokemon } from "./script.js";

const teamPage = document.getElementById("teamPage");
const searchPage = document.getElementById("searchPage");
const switchBtn = document.getElementById("switch-btn");

const searchBar = document.getElementById("searchBar")

switchBtn.addEventListener('click', () => {
	if (teamPage.classList.contains('hide')) {

		teamPage.classList.remove('hide');
		searchPage.classList.add('hide');

		switchBtn.innerText = 'Manage Team';

	} else {

		teamPage.classList.add('hide');
		searchPage.classList.remove('hide');

		switchBtn.innerText = 'Find Pokémon';
	}
});


searchBar.addEventListener('keyup', (e) => {

	const searchString = e.target.value.toLowerCase();

	searchPokemon(searchString)

})