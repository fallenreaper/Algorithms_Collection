
function freq(words){
    // words do not have punctuation except apostrophes
    let freq = {}
    words.split(" ").forEach( word => {
        if (word == "" || word == " ") return;
        let regex = new RegExp( /[a-zA-Z0-9\'']+/,  "gi");
        word = regex.exec(word.toLowerCase().trim())[0];
        if (!freq[word]) freq[word] = 0;

        freq[word] += 1;
    });

    return freq;
}

function main(){
    let book = "'Tis is the story about a man named hal and how his life got flipped upside down.  I listened for a cab and when it came near, it said words.";
    console.log(freq(book));
}
main();