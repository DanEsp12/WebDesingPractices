/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
    "use strict";
    function isPrime(m) {
        var i;

        for (i = 2; i <= Math.sqrt(m); i++) {
            if (m % i === 0) {
                return false;
            }
        }
        return true;
    }

    var i, sequence = [];

    //TODO: Check which numbers are factors of n and also check if
    // that number also happens to be a prime

    for(i = 2; i <=  n; i++){
        if(n % i === 0 && isPrime(i)){
            sequence.push(i);
        }
    };

    var item = document.getElementById("result");
    console.log(sequence);
    item.innerHTML = sequence.toString();
    return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));