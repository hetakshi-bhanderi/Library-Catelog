// Object Creation
function Book(title, author) {
    this.title = title;
    this.author = author;
    this.borrowed = false;

    // Object Method to toggle borrowed status
    this.toggleBorrow = function() {
        this.borrowed = !this.borrowed;
    }
}


// Library Object
const library = {
    books: [],

    // Add Book 
    addBook(title, author) {
        this.books.push(new Book(title, author));
        renderBooks();
    },

    // Remove Book 
    removeBook(index) {
        this.books.splice(index, 1);
        renderBooks();
    },
};

// Add Book

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if(title && author) {
        library.addBook(title , author);
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
    }
}

// Search Book

function searchBooks() {
    const query = document.getElementById("search").value.toLowerCase().trim();
    renderBooks("all", query);
}

// Render Book

function renderBooks(filter = 'all', searchQuery = '') {
    const table = document.getElementById("bookTable")
    table.innerHTML = `<tr>
    <th>Title</th>
    <th>Author</th>
    <th>Status</th>
    <th>Actions</th>
    </tr>`;


    library.books.forEach((book, index) => {
        if(filter === 'available' && book.borrowed) return;
        if(filter === 'borrowed' && !book.borrowed) return;

        if (searchQuery && !book.title.toLowerCase().includes(searchQuery) && !book.author.toLowerCase().includes(searchQuery)) {
            return;
        }
        
        const row = table.insertRow(-1);
        row.insertCell(0).textContent = book.title;
        row.insertCell(1).textContent = book.author;
        row.insertCell(2).textContent = book.borrowed ? 'Borrowed' : 'Available';

        // Change the background color in row
        row.style.backgroundColor = book.borrowed ? "#ffcccc" : "#ccffcc" 

        const actionCell = row.insertCell(3);
        actionCell.innerHTML = `
        <button onclick = "toggleBorrow(${index})">${book.isBorrowed ? 'Return' : 'Borrow'}</button>
        <button onclick = "library.removeBook(${index})">Remove</button>`;
    });
}


function toggleBorrow(index) {
    library.books[index].toggleBorrow();
    renderBooks();
}

// Display 

function displayBook(filter) {
    renderBooks(filter);
}
