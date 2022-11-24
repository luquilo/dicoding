let books = [];
const myEvent = "render-book";
// const SAVED_EVENT = "saved-book"; --ok aman
// const STORAGE_KEY = "BOOK_APPS"; ---ok aman (diganti line ke 5)
const STORAGE_KEY = "perpustakaan_mini";


//mengecek apakah web client support local storage atau tidak
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Maaf browser anda tidak support local storage");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("masukkanBuku");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

//membuat data Buku
function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("penulis").value;
  const year = document.getElementById("tahun").value;
  const isCompleted = document.getElementById("isCompleted").checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    title,
    author,
    year,
    isCompleted
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(myEvent));
  saveData();
}

// //search book by title
// const searchBook = () => {
//   const title = document.getElementById("searchBookTitle").value;
//   const serializedData = localStorage.getItem(STORAGE_KEY);
//   const data = JSON.parse(serializedData);
//   const searchBooks = data.filter(function (book) {
//     return book.title.toLowerCase().includes(title);
//   });
//   if (searchBooks.length === 0) {
//     alert("Buku tidak ditemukan !");
//     return location.reload();
//   }

//   if (title !== "") {
//     books = [];
//     for (const book of searchBooks) {
//       books.push(book);
//     }
//     document.dispatchEvent(new Event(RENDER_EVENT));
//   } else {
//     books = [];
//     loadDataFromStorage();
//   }
// };

//menambahkan object buku baru
function tambahkanBukuBaru(bookObject) {
  const bookTitle = document.createElement("h2");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = "Penulis: " + bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerHTML = "Tahun: " + bookObject.year;

  const bookContainer = document.createElement("div");
  bookContainer.classList.add("inner");
  bookContainer.append(bookTitle, bookAuthor, bookYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(bookContainer);
  container.setAttribute("id", `bookItem-${bookObject.id}`);
  

  //tandai buku selesai dibaca atau belum dibaca;
  if (bookObject.isCompleted) {
    const pindahRak = document.createElement("button");
    pindahRak.classList.add("undo-button");

    pindahRak.addEventListener("click", function () {
      undoReadCompleted(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      removeBookFromCompleted(bookObject.id);
    });

    container.append(pindahRak, deleteButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addReadToCompleted(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      removeBookFromCompleted(bookObject.id);
    });

    container.append(checkButton, deleteButton);
  }

  return container;
}

//menambahkan buku ke "rak yang sudah dibaca"
function addReadToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(myEvent));
  saveData();
}

//menghapus buku dari rak yang sudah dibaca
function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(myEvent));
  saveData();
}

//memindah buku ke "rak yang belum dibaca"
function undoReadCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(myEvent));
  saveData();
}

//save on localstorage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

//menampilkan data yang disimpan dalam local storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(myEvent));
}

function findBook(bookId) {
  for (const readBookItem of books) {
    if (readBookItem.id === bookId) {
      return readBookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
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
    isCompleted,
  };
}

document.addEventListener(myEvent, function () {
  const uncompletdReadBooks = document.getElementById("uncomplete-read");
  uncompletdReadBooks.innerHTML = "";

  const completeReadBooks = document.getElementById("complete-read");
  completeReadBooks.innerHTML = "";

  for (const readBookItem of books) {
    const bookElement = tambahkanBukuBaru(readBookItem);
    if (!readBookItem.isCompleted) {
      uncompletdReadBooks.append(bookElement);
    } else {
      completeReadBooks.append(bookElement);
    }
  }
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});
