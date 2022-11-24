const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    const searchButton = document.getElementById('searchbtn');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    searchButton.addEventListener('submit', (event)=> {
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()) {
        loadDataFromStorage();
    }
});


//membuat data Buku
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isCompleted = document.getElementById('isCompleted').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(
        generatedID, 
        title, 
        author, 
        year, 
        isCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//search book by title
const searchBook = () => {
    const title = document.getElementById('searchBookTitle').value;
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);
    const searchBooks = data.filter(function(book){
        return book.title.toLowerCase().includes(title);
    });
    if(searchBooks.length ===0) {
        alert('Buku tidak ditemukan !');
        return location.reload();
    }

    if(title !== '') {
        books = [];
        for (const book of searchBooks) {
            books.push(book);
        }
        document.dispatchEvent(new Event(RENDER_EVENT));
    }else {
        books = [];
        loadDataFromStorage();
    }
}

//menambahkan object buku baru
function addNewBook(bookObject) {
    const bookTitle = document.createElement('h2');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerHTML = "Author: " +bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerHTML = "Year: " +bookObject.year;

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('inner');
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(bookContainer);
    container.setAttribute('id', `bookItem-${bookObject.id}`);

    if(bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function() {
            undoReadCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', function() {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(undoButton, deleteButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function(){
            addReadToCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', function() {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(checkButton, deleteButton);
    }

    return container;

}

//menambahkan buku ke "rak yang sudah dibaca"
function addReadToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if(bookTarget== null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//menghapus buku dari rak yang sudah dibaca
function removeBookFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId)

    if(bookTarget=== -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//memindah buku ke "rak yang belum dibaca"
function undoReadCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//save on localstorage
function saveData() {
    if(isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}


//menampilkan data yang disimpan dalam local storage
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null) {
        for(const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT))
}

function findBook(bookId) {
    for(const readBookItem of books ) {
        if(readBookItem.id === bookId) {
            return readBookItem;
        }
    }
    return  null;
}

function findBookIndex(bookId) {
    for(const index in books) {
        if(books[index].id=== bookId) {
            return index;
        }
    }

    return -1;
}


function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id, 
        title, 
        author, 
        year, 
        isCompleted
    }
}

document.addEventListener(RENDER_EVENT, function() {
    const uncompletdReadBooks = document.getElementById('uncomplete-read');
    uncompletdReadBooks.innerHTML = '';

    const completeReadBooks = document.getElementById('complete-read');
    completeReadBooks.innerHTML = '';

    for(const readBookItem of books) {
        const bookElement = addNewBook(readBookItem);
        if(!readBookItem.isCompleted) {
            uncompletdReadBooks.append(bookElement);
        } else {
            completeReadBooks.append(bookElement);
        }
    }
});

document.addEventListener(SAVED_EVENT, function() {
    console.log(localStorage.getItem(STORAGE_KEY));
})

//searchForm event handler
