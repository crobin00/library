const background = document.querySelector("body");
const titleContainer = document.querySelector(".title-container");
const newBookButton = document.querySelector(".new-button");
const newBookContainer = document.querySelector(".new-book-container");
const bookContainer = document.querySelector(".book-container");
const addBookButton = document.querySelector(".add-book-button");
const addBookTitle = document.getElementById("book-title");
const addBookAuthor = document.getElementById("author");
const addBookPages = document.getElementById("pages");
const addBookHasRead = document.getElementById("hasRead");
let bookArray = [];
newBookButton.addEventListener("click", newBook);
addBookButton.addEventListener("click", addBook);
let bookArrayPos = -1;
const removeBookButton = document.querySelectorAll(".remove-button");
document.body.addEventListener("click", function (e) {
	if (e.target.classList.contains("remove-button")) {
		removeBook(e.target.getAttribute("data-key"));
	}
});

function Book(title, author, pages, hasRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.hasRead = hasRead;
	this.info = function () {
		if (hasRead) return `${title} by ${author}, ${pages} pages, has read`;
		if (!hasRead)
			return `${title} by ${author}, ${pages} pages, has not read`;
	};
}

function addBookToLibrary() {}

function removeBook(index) {
	bookContainer.querySelector(`[data-key="${index}"]`).remove();
	bookArray.splice(index);
}

function newBook() {
	titleContainer.classList.add("hidden-background");
	bookContainer.classList.add("hidden-background");
	newBookContainer.classList.remove("hidden-book");
}

function clickedAddBookButton() {
	titleContainer.classList.remove("hidden-background");
	bookContainer.classList.remove("hidden-background");
	newBookContainer.classList.add("hidden-book");
}

function addBook() {
	let readChecked;
	if (addBookHasRead.checked) readChecked = true;
	if (!addBookHasRead.checked) readChecked = false;

	let newBook = new Book(
		addBookTitle.value,
		addBookAuthor.value,
		addBookPages.value,
		readChecked
	);
	bookArray.push(newBook);
	console.log(bookArray);
	bookContainer.appendChild(
		appendBookToContainer(
			newBook.title,
			newBook.author,
			newBook.pages,
			newBook.hasRead
		)
	);

	clickedAddBookButton();
}

function appendBookToContainer(title, author, pages, hasRead) {
	let bookDiv = document.createElement("div");
	let bookTitle = document.createElement("h2");
	let bookAuthor = document.createElement("h3");
	let bookPages = document.createElement("h3");
	let bookHasRead = document.createElement("input");
	let bookHasReadH3 = document.createElement("h3");
	let hasReadContainer = document.createElement("div");
	let removeButton = document.createElement("button");

	bookHasRead.type = "checkbox";
	bookHasRead.name = "read";
	bookHasRead.value = "read";
	bookHasRead.id = "read";

	removeButton.innerText = "Remove";
	bookTitle.innerText = title;
	bookAuthor.innerText = author;
	bookPages.innerText = "Pages: " + pages;
	bookHasReadH3.innerText = "Read?";
	bookHasRead.checked = hasRead;
	hasReadContainer.append(bookHasReadH3, bookHasRead, removeButton);
	hasReadContainer.classList.add("read-container");

	bookDiv.append(bookTitle, bookAuthor, bookPages, hasReadContainer);
	bookDiv.classList.add("book");
	bookArrayPos++;
	removeButton.classList.add("remove-button");
	removeButton.setAttribute("data-key", bookArrayPos);
	bookDiv.setAttribute("data-key", bookArrayPos);
	return bookDiv;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());
