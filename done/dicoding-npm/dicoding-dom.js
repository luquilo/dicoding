const gambar = document.getElementById("gambar");

//setAttribute mengatur ukuran dari gambar
gambar.setAttribute("width", 300);
gambar.setAttribute("height", 215);

//querySelectorAll
const buttons = document.querySelectorAll(".button");
const playButton = buttons[3];
const playButtonElement = playButton.children[0];

playButtonElement.setAttribute("type", "submit");

//inner html dan inner text

const links = document.getElementById("links");

const dicoding = document.getElementById("dicodingLink");
const google = document.getElementById("googleLink");

//inner text
dicoding.innerText = "Belajar Programming di Dicoding";
google.innerText = "Mencari sesuatu di Google";

//inner html
dicoding.innerHTML = "<i>learn programming with Dicoding</i>";
google.innerHTML = "<b>wanna search for something on google?</b>";

// style.property

for (const button of buttons) {
  button.children[0].style.borderRadius = "6px";
  button.children[0].style.border = "2px black solid";
}

const body = document.getElementById("body");


//Alhamdulillah berhasil
const iniTrue = true;

const onLoadProperty = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(iniTrue){
                resolve(body.style.backgroundColor = 'red')
            } else {
                reject(alert('iniTrue berisi false'))
            }
        }, 3000)
    })
}

const onLoad = onLoadProperty();