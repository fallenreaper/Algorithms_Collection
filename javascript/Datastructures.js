// Basic Structure Implementations.

class Queue {
    constructor(){
        this.structure = [];
    }

    append(item){
        this.structure.push(item)
    }

    remove(){ 
        return this.structure.shift();
    }

}

class Stack {
    constructor(){
        this.structure = [];
    }
    push(item) {
        this.structure.push(item);
    }
    pop() {  
        return this.structure.pop(); 
    }
}

class Node {
    constructor(value){
        this.value = value;
        this.previous = null;
        this.next = null;
    }
}

class LinkedList {
    
    constructor(){
        this.structure = [];
        this.current = null;
        this.head = null;
        this.tail = null;
    }

    get length() { return this.structure.length; }

    append(item){
        let n = new Node (item);
        if (this.current){
            this.current.next = n;
            n.previous = this.current;
        }
        this.current = n;
        this.structure.push(n);
        if (this.head == null){
            this.head = this.current;
        }
        this.tail = this.structure[this.structure.length -1];
    }
    remove(){
        if (this.current.previous == null){
            this.current.next.previous = null;
        } else {
            this.current.previous.next = this.current.next;
        }
        if (this.current.next == null){
            this.current.previous.next = null;
        } else {
            this.current.next.previous = this.current.previous
        }
        let idx = this.structure.indexOf(current);
        this.structure.splice(idx, 1);
    }

    next() { 
        this.current = this.current.next;
        return this.current;
    }
    previous() {
        this.current = this.current.previous;
        return this.current;
    }

    dump () { 
        return this.structure.map( item => item.value )
    }


}

class HashMap {
    constructor(){
        this.structure = {};
    }
    append(key, value){
        //assume that you will just override.
        this.structure[key] = value;
    }
    remove(key){
        if (this.structure[key]) delete this.structure[key];
    }
    contains(key){
        // also: return !!this.structure[key]
        return this.structure.contains(key);
    }
    keys() { return Object.keys(this.structure)}
    dump() { return this.structure;}
}

function main() {
    //Linked List.
    let LL = new LinkedList();
    let HM = new HashMap();
    for (i = 0; i < 20; i++){
        LL.append(100 - i)
        HM.append("key-"+i, i);
    }
    LL.current = LL.head;
    while (LL.current != null){
        console.log("Value: ", LL.current.value);
        LL.next();
    }

    console.log("Map Keys: ", HM.keys())
    console.log("HashMap: ", HM.dump());

}

main();