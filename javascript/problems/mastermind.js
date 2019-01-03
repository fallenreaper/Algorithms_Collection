
// Mastermind
// Array will be any size but should match per game regs. 
//   Im not validating against it.
// the resulting array will have 3 states, true, false, and null.
//   If it is a hit, it is TRUE
//   If it is a nearhit, it is FALSE.
//   If it is not found, it is NULL.


function solution ( guess, answer ) {
    // both guess and answer are arrays
    results = [];
    m = {};
    for (let i = 0; i < answer.length; i++){
        results.push(null)
        if (guess[i] == answer[i]){
            results[i] = true
        }else {
            if (!m[answer[i]]){
                m[answer[i]] = 0
            }
            m[answer[i]] ++;
        }
    }
    for (let i = 0; i < results.length; i++){
        if (results[i] == null){
            if (m[guess[i]] && m[guess[i]] > 0){
                results[i] = false;
                m[guess[i]] --;
            }
        }
    }
    return results;
}


function main(){
    console.log(solution(["R","R","Y","B"], ["Y","R","Y","G"]))
    console.log(solution(["R","G","Y","Y"], ["R","B","G","Y"]))
}
main();