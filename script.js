const background = document.querySelector("body");
const hideNewBook = document.querySelector(".bg");
const newBookButton = document.querySelector(".add-book-button");
const newBookContainer = document.querySelector(".new-book-container");
const bookContainer = document.querySelector(".book-container");
const addBookButton = document.querySelector(".new-book-add-button");
const addBookTitle = document.getElementById("book-title");
const addBookAuthor = document.getElementById("author");
const addBookPages = document.getElementById("pages");
const addBookHasRead = document.getElementById("hasRead");
let bookArray = [];
newBookButton.addEventListener("click", newBook);
addBookButton.addEventListener("click", addBook);
let bookArrayPos = -1;

const removeBookButton = document.querySelectorAll(".remove");
document.body.addEventListener("click", function (e) {
	if (e.target.classList.contains("remove")) {
		removeBook(e.target.getAttribute("data-key"));
	}
});

hideNewBook.addEventListener("click", closeMenu);
function closeMenu() {
	newBookButton.classList.remove("hidden-background");
	bookContainer.classList.remove("hidden-background");
	newBookContainer.classList.add("hidden-book");
}

const readBook = document.querySelectorAll(".read");
document.body.addEventListener("click", function (e) {
	if (e.target.classList.contains("read")) {
		swapReadStatus(e.target.getAttribute("data-read"));
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

function swapReadStatus(index) {
	if (
		bookContainer.querySelector(`[data-read="${index}"]`).innerText ==
		"Read"
	) {
		//bookArray[index].hasRead = false;
		bookContainer.querySelector(`[data-read="${index}"]`).innerText =
			"Not Read";
	} else {
		//bookArray[index].hasRead = true;
		bookContainer.querySelector(`[data-read="${index}"]`).innerText =
			"Read";
	}
}

function removeBook(index) {
	bookContainer.querySelector(`[data-key="${index}"]`).remove();
	bookArray.splice(index);
}

function newBook() {
	newBookButton.classList.add("hidden-background");
	bookContainer.classList.add("hidden-background");
	newBookContainer.classList.remove("hidden-book");
}

function clickedAddBookButton() {
	newBookButton.classList.remove("hidden-background");
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
	let bookTitle = document.createElement("div");
	let bookAuthor = document.createElement("div");
	let bookPages = document.createElement("div");
	let bookButtons = document.createElement("div");
	let bookHasRead = document.createElement("button");
	let removeButton = document.createElement("button");

	if (hasRead) {
		bookHasRead.innerText = "Read";
	}
	if (!hasRead) {
		bookHasRead.innerText = "Not Read";
	}

	removeButton.innerText = "Remove";
	bookTitle.innerText = title;
	bookAuthor.innerText = author;
	bookPages.innerText = "Pages: " + pages;
	bookButtons.append(bookHasRead, removeButton);
	bookTitle.classList.add("title");

	bookDiv.append(bookTitle, bookAuthor, bookPages, bookButtons);
	bookDiv.classList.add("book");
	bookArrayPos++;
	removeButton.classList.add("remove");
	removeButton.classList.add("book-button");
	bookHasRead.classList.add("read");
	bookHasRead.classList.add("book-button");
	removeButton.setAttribute("data-key", bookArrayPos);
	bookHasRead.setAttribute("data-read", bookArrayPos);
	bookDiv.setAttribute("data-key", bookArrayPos);
	return bookDiv;
}

//const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
//console.log(theHobbit.info());
