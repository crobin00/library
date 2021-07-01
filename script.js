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

function newBook() {
	//newBookContainer.classList.remove("hidden");
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
}

function appendBookToContainer(title, author, pages, hasRead) {
	let bookDiv = document.createElement("div");
	let bookTitle = document.createElement("h2");
	let bookAuthor = document.createElement("h3");
	let bookPages = document.createElement("h3");
	let bookHasRead = document.createElement("input");
	let bookHasReadH3 = document.createElement("h3");
	let hasReadContainer = document.createElement("div");

	bookHasRead.type = "checkbox";
	bookHasRead.name = "read";
	bookHasRead.value = "read";
	bookHasRead.id = "read";

	bookTitle.innerText = title;
	bookAuthor.innerText = author;
	bookPages.innerText = "Pages: " + pages;
	bookHasReadH3.innerText = "Read?";
	bookHasRead.checked = hasRead;
	hasReadContainer.append(bookHasReadH3, bookHasRead);
	hasReadContainer.classList.add("read-container");

	bookDiv.append(bookTitle, bookAuthor, bookPages, hasReadContainer);
	bookDiv.classList.add("book");
	return bookDiv;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());
