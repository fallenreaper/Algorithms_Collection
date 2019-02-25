





function calc(str){
    let arr = str.split(new RegExp("[+-]"))
    console.log("breakup:", arr);
    for (let i = 0; i < arr.length; i++){
        let sub = arr[i]
        let mult = sub.split(new RegExp("[*/]"))
        console.log("Split Again", mult)

        let start = 0;
        let test = 0
        for (let j = 0; j < mult.length -1; j++){
            console.log("Substr: ", sub.substr(start))
            if (sub.substr(start).startsWith(mult[j])){
                start += mult[j].length -1;
                let operand = sub[start + 1];
                console.log("Operand", operand);
                if (operand == "/"){
                    let val = mult[i] / mult[i+1]
                    console.log("Val", val);
                    test += val
                }else if (operand == "*"){
                    let val = mult[i] * mult[i+1]
                    console.log("Val", val);
                    test += val
                }
            }
        }
        // let regex = new RegExp(/([\*\/])+/, "g")
        // let list = regex.exec(sub);
        // console.log("Information: ", list)
    }
}

function calcOptionTwo(str) {
    let option = {
        "*": (a,b) => { return a*b; },
        "/": (a,b) => { return a/b; },
        "+": (a,b) => { return a+b; },
        "-": (a,b) => { return a-b; }
    }
    let cast = (a) => a.constructor == "".constructor ? parseInt(a) : a;
    let iterate = (list, keys) => {
        for (let i = 1; i < list.length; i++){
            let row = list[i];
            let value = null;
            if (keys.indexOf(row) >= 0){
                let a = cast(list[i-1])
                let b = cast(list[i+1]);
                value = option[row](a, b);
                list.splice(i-1, 3, value);
                i --;
            }
        }
    }
    let list = str.split(" ");
    if (list.length < 3) return null;
    iterate(list, ["*", "/"]);
    iterate(list, ["+", "-"]);

    if (list.length == 1) return list[0]
}

function calcWithParen(str) {
    let paren = {"(": ")"};
    let stack = [];
    str = str.split(" ");
    for (let i = 0; i < str.length; i++){
        let row = str[i];
        if (paren[row]){
            stack.push(new Node(paren[row], i))
        }else if (stack.length > 0 && stack[stack.length -1].id == row){
            let node = stack.pop();
            let endIdx = i;
            let value = calcOptionTwo(str.slice(node.idx + 1, endIdx).join(" "))
            str.splice(node.idx, endIdx - node.idx +1, value);
            i = node.idx;
        }
    }
    return calcOptionTwo(str.join(" "))
}

class Node {
    constructor(id, idx) { this.id = id; this.idx = idx; }
}

function main(){
    let str = "2 * 3 + 5 / 6 * 3 + 15"
    // console.log(calc(str));
    console.log(calcOptionTwo(str));
    console.log(calcOptionTwo("1 5"));
    console.log(calcOptionTwo("5 + 3"));

    console.log(calcWithParen("4 + ( ( 5 * 4 + 2 ) * 3 )"))
}
main();