let books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";



//mengecek apakah local storage disupport oleh browser atau tidak
function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak mensupport local storage");
      return false;
    }
  
    return true;
  }

  