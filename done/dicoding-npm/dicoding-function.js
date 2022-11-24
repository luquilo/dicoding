const minimal = (a,b) => {
    if(a < b){
        return a;
    } else {
        return b;
    }
}
console.log(minimal(1, 4))
console.log(minimal(3, 2))
console.log(minimal(3, 3))



//unfortunately isnt work on dicoding kuis
function power(a,b){
    let result = 1;
    if(b<1){
      result =a*b
    }else{
       for (let i=0;i<b;i++){
       result*=a;
     }
    }
     return result;
  };

  console.log(power(7,3))





 