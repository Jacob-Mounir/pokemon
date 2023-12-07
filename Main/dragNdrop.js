const listItems = document.querySelectorAll("#list li");
const target = document.querySelector("#target");

for (const listItem of listItems) {
	listItem.addEventListener("dragstart", dragStart);
}

target.addEventListener("dragover", dragOver);
target.addEventListener("drop", drop);

function dragStart(event) {
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
	target.style.borderColor = "#d1d5db"; // This resets the border color to the original 'border-gray-300'
}
