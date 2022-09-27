/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function (n) {
    "use strict";

    var array = [], primes = [], i, j, iter, k;

    iter = Math.sqrt(n);

    for(k = 1; k <= n; k++){
        array.push(1);
    }
    for(i = 0; i <= iter; i++){
        if(i < 2){
            array[i] = 0;
        }
        else{
            for(j = i + i; j <= n; j += i){
                array[j] = 0;
            }
        }        
    }
    for(i = 0; i <= n; i++){
        if(array[i] == 1){
            primes.push(i);
        }
    }
    var item = document.getElementById("result");
    item.innerHTML = "<h3>Primes:\n</h3>" + primes.toString() + "<h3>Sieve:\n</h3>" + array.toString();
    return primes;
};

//console.log(sieve(1000000));