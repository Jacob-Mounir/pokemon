const listItems = document.querySelectorAll("#list li");
const target = document.querySelector("#target");
let originalParent; // Lägger till en variabel för att lagra ursprungliga föräldern

for (const listItem of listItems) {
	listItem.addEventListener("dragstart", dragStart);
	listItem.addEventListener("dragend", dragEnd); // Lägger till en 'dragend' händelselyssnare
}

target.addEventListener("dragover", dragOver);
target.addEventListener("drop", drop);

function dragStart(event) {
	originalParent = event.target.parentNode; // Spara elementets ursprungliga förälder
	event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
	event.preventDefault();
	target.style.borderColor = "#718096";
}

function drop(event) {
	event.preventDefault();
	const itemId = event.dataTransfer.getData("text/plain");
	const item = document.getElementById(itemId);
	target.appendChild(item);
	target.style.borderColor = "#d1d5db";
}

function dragEnd(event) {
	// Om elementet inte ligger i målområdet, flytta det tillbaka till dess ursprungliga förälder
	if (event.target.parentNode !== target) {
		originalParent.appendChild(event.target);
	}
}
