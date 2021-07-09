// Book Class: Handle Books
class Book {
	constructor(title, author, pages, hasRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.hasRead = hasRead;
	}
}

//Handle UI Class
class UI {
	static showNewBookDisplay() {
		document
			.querySelector(".book-container")
			.classList.add("hidden-background");
		document
			.querySelector(".add-book-button")
			.classList.add("hidden-background");
		document
			.querySelector(".new-book-container")

			.classList.remove("hidden-book");
	}

	static disableNewBookButton() {
		const newBookButton = document.querySelector(".add-book-button");
		newBookButton.disabled = true;
	}

	static enableNewBookButton() {
		const newBookButton = document.querySelector(".add-book-button");
		newBookButton.disabled = false;
	}

	static hideNewBookDisplay() {
		document
			.querySelector(".book-container")
			.classList.remove("hidden-background");
		document
			.querySelector(".add-book-button")
			.classList.remove("hidden-background");
		document
			.querySelector(".new-book-container")

			.classList.add("hidden-book");
	}

	static addBookToContainer(newBook) {
		const div = document.createElement("div");
		let hasReadText;
		if (newBook.hasRead) {
			hasReadText = "Read";
		} else {
			hasReadText = "Not Read";
		}

		div.innerHTML = `<div class="book">
            <div class="title">${newBook.title}</div>
            <div class="author">${newBook.author}</div>
            <div class="page">Pages: ${newBook.pages}</div>
            <div class="book-buttons">
            <button class="book-button read">${hasReadText}</button>
            <button class="book-button remove">Remove</button>
            </div></div>
            `;
		document.querySelector(".book-container").appendChild(div);
	}

	static resetForms() {
		document.getElementById("book-title").value = "";
		document.getElementById("author").value = "";
		document.getElementById("pages").value = "";
		document.getElementById("hasRead").checked = false;
	}

	static closeOutOfForm() {
		UI.hideNewBookDisplay();
		UI.enableNewBookButton();
	}
}

//Event New Book Button
document.querySelector(".add-book-button").addEventListener("click", (e) => {
	UI.showNewBookDisplay();
	UI.disableNewBookButton();
});

//Event Add Book To List
document
	.querySelector(".new-book-add-button")
	.addEventListener("click", (e) => {
		const title = document.getElementById("book-title").value;
		const author = document.getElementById("author").value;
		const pages = document.getElementById("pages").value;
		const hasRead = document.getElementById("hasRead").checked;
		if (title == "" || author == "" || pages == "") {
			alert("Please fill out all fields");
			return;
		}
		const newBook = new Book(title, author, pages, hasRead);
		UI.addBookToContainer(newBook);
		//Reset form to empty
		UI.resetForms();
		UI.hideNewBookDisplay();
		UI.enableNewBookButton();
	});

//Event Remove Book
document.querySelector(".book-container").addEventListener("click", (e) => {
	if (e.target.classList.contains("remove")) {
		e.target.parentElement.parentElement.remove();
	}
});

//Event change read status
document.querySelector(".book-container").addEventListener("click", (e) => {
	if (e.target.classList.contains("read")) {
		if (e.target.innerText == "Read") {
			e.target.innerText = "Not Read";
		} else {
			e.target.innerText = "Read";
		}
	}
});

//Event close new book container on background click
document.querySelector(".bg").addEventListener("click", (e) => {
	UI.resetForms();
	UI.closeOutOfForm();
});
