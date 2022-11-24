

// const welcome = () => {
//     const classContent = document.getElementsByClassName('contents');//get element by classname tidak berfungsi
//     classContent.removeAttribute('hidden');
// }

function welcome() {
    alert('Sim salabim muncullah elemen-elemen HTML!');
    const contents = document.querySelector('.contents');//tapi penggunaan query selector berfungsi disini
    contents.removeAttribute('hidden');
  }

// document.body.onload = welcome();


const increment = () => {
    //menambah jumlah count
    document.getElementById('count').innerText++;



    if (document.getElementById('count').innerText == 7) {
        const hiddenMessage = document.createElement('h4');
        hiddenMessage.innerText = 'Selamat! Anda menemukan hadiah tersembunyi...';
        const image = document.createElement('img');
        image.setAttribute('src', 'https://i.ibb.co/0V49VRZ/catto.jpg');
        const contents = document.querySelector('.contents');
        contents.appendChild(hiddenMessage).appendChild(image);
      }
}

// document.getElementById('incrementButton').onclick = increment;

window.addEventListener('load', welcome)
document.getElementById('increment').addEventListener('click', increment)

