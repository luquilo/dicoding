const nyoba = document.createElement("p");
const text = document.createTextNode('hapus buku');
nyoba.appendChild(text); 
const hapus = document.getElementsByTagName("body")[0];
hapus.appendChild(nyoba)




//contoh dari google

// const tag = document.createElement("p"); // <p></p>
// const text = document.createTextNode("TEST TEXT"); 
// tag.appendChild(text); // <p>TEST TEXT</p>
// const element = document.getElementsByTagName("body")[0];
// element.appendChild(tag); // <body> <p>TEST TEXT</p> </body>

