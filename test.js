var numBeads = 0;

var bundle = 
[
    A0  = 5,
    A1 = 4,
    A2 = 0,
    A4 = 3,
    A5 = 1,
    A6 = 2
]

if(a0 = )

console.log(bundle.length);


// ** This is a little flawed as a time period difference of 1 second up and one 1 second down is very small difference and can be caused by many environmental factors and occurs I am sure regularly. Perhaps a longer period of specified time could give a better answer for this. For example fluctuation over 5 seconds. 
// OR Alternatively the function to be able to take a variable in which this could be measured given environmental factors.
//

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");


// Declare L=0 and R=1 = 0;
var L = 0;
var R = 1;
// Create commands 'L' and 'R'
// 'L' = L = (2 * L) - R
// L = (L * 2) - R;
// 'R' = R = (2 * R) - L
// R = (R * 2) - L;
// n = parseInt(givenNumber) (givenNumber is input by user)
// starting by declaring givenNumber in code 
var givenNumber = -11;

// n is the amount of times calculations were made to match givenNumber with L or R
var n = 0;

// while L && R < n => run commands L && R

while( L || R < givenNumber) {
    R = (R * 2) - L;
    L = (L * 2) - R;
}

//return number of times loop was run 
n++;

console.log(n);

// next step I was unable to complete is the timeout function where time > 5000 => console.log("impossible");


// class Solution {
//     public String solution(int N) {
//         // write your code in Java SE 8
//     }
// }

// function solution(N) {
//     // write your code in JavaScript (Node.js 8.9.4)
// }