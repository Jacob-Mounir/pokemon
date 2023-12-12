const teamPage = document.getElementById("teamPage");
const searchPage = document.getElementById("searchPage");
const switchBtn = document.getElementById("switch-btn"); // Assuming you have a button with this ID

switchBtn.addEventListener('click', () => {
	if (teamPage.classList.contains('hide')) {
		// Show teamPage and hide searchPage
		teamPage.classList.remove('hide');
		searchPage.classList.add('hide');
		// Update button text to indicate the current page is teamPage
		switchBtn.textContent = 'Search Page';
	} else {
		// Show searchPage and hide teamPage
		teamPage.classList.add('hide');
		searchPage.classList.remove('hide');
		// Update button text to indicate the current page is searchPage
		switchBtn.textContent = 'Team Page';
	}
});