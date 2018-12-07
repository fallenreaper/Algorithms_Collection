// Google Interview
//  William Francis
//  I had to create these 2 functions below given the following text:

/*
1- Given a Date object, create a function which returns the Quarter it exists in and the year in the following format:
        "Q3 2018"
2- Given a Quarter and a year in the above format, create a function which returns a count of the number of days in the given quarter.
*/


//Utility Variables [if needed]
function parseDate(date) {
    let year = date.getFullYear();
    let m = Math.ceil((date.getMonth()+1)/3);
    return `Q${m} ${year}`;
}

function datesInQuarter(str) {
    if (!str) return -1;
    //str = Q# YYYY
    let year = parseInt(str.split(" ")[1]) || null
    let q = parseInt(str.split(" ")[0].slice(1)) || null;
    if (!q || !year) return -1;
    q -= 1;
    let d = new Date(year, q)
    //console.log(`Start Month: ${d.getMonth()}/${d.getFullYear()}`);
    //console.log(`Previous: ${new Date(new Date(year, q, 1) -1).getDate()}`)
    let days = 0
    for (let i = q; i < q+3; i++) {
        days += parseInt(new Date(new Date(year, q, 1) -1).getDate())
    }
    return days;
}
//Classes



function tests(){
    let dates = [];
    let numDates = 5;
    for (let i = 0; i < numDates; i++){
        let year = Math.random() * 100 + 1918;
        let month = Math.random() * 12 + 1;
        dates.push(new Date(year, month));
    }
    results = dates.map( d => [ `${d.getMonth()+1}/${d.getFullYear()}`, parseDate(d), datesInQuarter(parseDate(d)),d])
    console.log(results.map(item => [item[0], item[1], item[2]]))
    let daysInQuarters = results.map( item => datesInQuarter(item[1]))
    //console.log("Q Counts: ", daysInQuarters)
    //console.log("Q Date:", dates.map ( d => `${d.getMonth()}/${d.getFullYear()} => ${parseDate(d)}`));
}

// Main Function
function main() {
    tests();
}
main();