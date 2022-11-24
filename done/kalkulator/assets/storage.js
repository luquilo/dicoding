//buat cache key sebagai key untuk mengakses dan simpan data di local storage
const CACHE_KEY = "calculation_history";

//json.parse digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript
//JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String.
//karena local storage hanya bisa menyimpan data primitif, karena itu harus di konversi
//unshift buat nambah nilai baru di array
//array pop untuk menghapus array terakhir (diberi value 5 agar hanya menampilkan 5 hsitory terakhir)
function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);

    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

//membuat fungsi untuk menapilkan history
function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

//merender data dari localstorage
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

//memanggil function render history
putHistory();
renderHistory();
