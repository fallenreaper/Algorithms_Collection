// Breaking a string into words.

class Dictionary {
    constructor(){
        this.list = ["pea", "nut", "peanut", "butt", "butter", "asd", "fgh", "asdfgh", "jkl", "asdfghjkl"]
    }
    static contains(word) { 
        if (this.list === undefined){
            this.list = new Dictionary().list;
        }
        //console.log("Word ", word, " Exists? ", this.list.includes(word))
        return this.list.includes(word)
    }
}

//Brute
function breakingUpString(str){
    for (let i = 1; i < str.length; i++){
        let left = str.slice(0,i);
        let right = str.slice(i, str.length);
        if (Dictionary.contains(left) && Dictionary.contains(right)){
            return left + " " + right;
        }
    }
    return str;
}

// iterative.  does:  'pea nut butter'
function recurse(list, str){
    let startIdx = 0;
    for (let i = 1; i <= str.length; i++){
        let word = str.slice(startIdx, i);
        if (Dictionary.contains(word)){
            list.push([startIdx,i])
            startIdx = i;
            console.log("MATCH: ", word)
        }

        if (i == str.length){
            console.log("I:", i)
            if (startIdx == 0) return str;
            let lastMatchedIndex = list[list.length -1][1];
            if (lastMatchedIndex != str.length){
                startIdx = list.length > 0 ? list[list.length -1][0] : 0;
                i = list.length > 0 ? list[list.length -1][1] : 1;
                list.pop();
            }
        }
    }
    return list.map( tuple => str.slice(tuple[0], tuple[1])).join(" ");
}

/// Function will keep trying to combine words.
function peanut(list, str){
    let startIdx = 0;
    for (let i = 1; i <= str.length; i++){
        let word = str.slice(startIdx, i);
        if (Dictionary.contains(word)){
            list.push([startIdx,i])
            startIdx = i;
            console.log("MATCH: ", word)
        }

        if (i == str.length){
            if (startIdx == 0) return str;
            let lastMatchedIndex = list[list.length -1][1];
            if (lastMatchedIndex != str.length){
                startIdx = list.length > 0 ? list[list.length -1][0] : 0;
                i = list.length > 0 ? list[list.length -1][1] : 1;
                list.pop();
            }
        }
    }

    for (let i = 0; i < list.length; i++){
        let tuple = list[i];
        if (list[i+1] !== undefined){
            let start = tuple[0];
            let end = list[i+1][1];
            let word = str.slice(start,end);
            if (Dictionary.contains(word)){
                list[i][1] = end;
                list.splice(i+1, 1);
                i--;
            }
        }
    }

    return list.map( tuple => str.slice(tuple[0], tuple[1])).join(" ");
}

function main(){
    listofwords = ["peanutbutter", "thishasnokeywords","asdfghjklbutter"];
    //let results = listofwords.map( word => breakingUpString(word) );
    //console.log(results)

    let results = listofwords.map ( word => peanut([], word));
    console.log("RESULTS: ", results);
}
main();