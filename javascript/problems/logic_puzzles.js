// Chapter 6: Math and Logic Puzzles.


function solve6p1 (){
    // The Heavy Pill.  
    //  You have 20 bottles of Pills. 19 have pills weighing 1.0g, 1 has pills weighing 1.1g.
    //  How do you find the heaviest bottle.  You can only use a scale once to check weight.

    // Thoughts:
    //  - It is unknown the number of pills in each bottle.
    //  - We could look at 1 pill in each bottle and compare them to each other.
    //  - Pills arent necessarily the same size / shape.

    // ANSWER:
    //  1 pill from bottle 1, 2 pills bottle 2, 3 pills bottle 3....
    //  sum = 10*(numberOfBottle+1)
    //  weigh all pills.    (weight - sum/.1) => Heavy Bottle.
}

function solve7p2 () {
    //Call center

    employees = [];
    function initEmployees(){
        this.employees = [];
        for (let i = 0; i < 20; i++){
            let rand = Math.floor(Math.random() * 3);
            if (rand == 0){
                this.employees.push(new Respondent(`Bob${Math.random() * 100 + 1}`));
            }else if (rand == 1){
                this.employees.push(new Manager(`Tom${Math.random() * 100 + 1}`));
            }else if (rand == 2){
                this.employees.push(new Director(`Jack${Math.random() * 100 + 1}`));
            }
        }
    }

    this.dispatchCall = function(){
        let res = this.employees.filter( employee => employee instanceof Respondent);
        let man = this.employees.filter( employee => employee instanceof Manager);
        let dir = this.employees.filter( employee => employee instanceof Director);

        let notInCall = item => !item.inCall;

        let rAvail = res.filter( notInCall );
        let rMan = man.filter( notInCall );
        let rDir = dir.filter( notInCall );

        let current = null;
        if (rAvail.length > 0){
            current = rAvail[0];
        }else if ( rMan.length > 0) {
            current = rMan[0];
        }else if ( rDir.length > 0) {
            current = rDir[0];
        }else {
            console.log("None Available.")
            setTimeout(function(){}, 6000);
            return;
        }
        current.inCall = true;
        current.call();
    }

    class Employee {
        constructor(name) {
            this.name = name;
            this.inCall = false;

            this.call = function () { console.log("Call Started with " + this.name); setTimeout( function(){ console.log("Call Ending"); this.inCall = false; }, 4000 ) };
        }
    }
    class Respondent extends Employee {
        constructor(name){ super(name); }
    }

    class Manager extends Employee {
        constructor(name){ super(name); }
    }

    class Director extends Employee {
        constructor(name) { super(name); }
    }

    initEmployees.bind(this)();
    return this;
}



function main(){
    let data = solve7p2();
    for (let i = 0; i < 100; i++){
        data.dispatchCall();
    }
}

main();