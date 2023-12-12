const teamPage = document.getElementById("teamPage")
const searchPage = document.getElementById("searchPage")
const teamBtn = document.getElementById("team-btn")
const searchBtn = document.getElementById("search-btn")

teamBtn.addEventListener('click',()=> {

	searchPage.classList.add('hide')
	teamPage.classList.remove('hide')
})

searchBtn.addEventListener('click', () => {

	searchPage.classList.remove('hide')
	teamPage.classList.add('hide')
})

