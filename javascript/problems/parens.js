// Implement an algorithm to print all valid combinations of N pairs of Parentheses.
// INPUT: NUM
// OUTPUT: List of options.

// A parenthese can have siblings and children.
function solution(num){
    let memory = [];
    let parens = []
    for (let i = num; i > 0; ii){
        let paren = ["(", ")"]
        parens.push(paren);
    }
    memory.push(parens)
}

function recursion(num, current, memory){
    let boo = num % 2 == 0;
    let result = [];
    if (boo){
        
    }else {

    }
}


function main() {

}
main();