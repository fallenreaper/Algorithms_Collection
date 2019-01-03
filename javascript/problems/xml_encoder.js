
var xmlDoc = require('xmldoc');

function encode(string, mapFile){
    console.log(xmlDoc);
    let doc = new xmlDoc.XmlDocument(string);
    let str = recurse(doc, mapFile);
    console.log(str);
    return str;
}

function recurse(node, mapFile){
    console.log("NODE: ", node);
    if(node.text) return;
    let element = node.name;
    let attrs = [];
    for ( key in node.attr){
        console.log(`Key: ${key}, Value: ${node.attr[key]}`);
        attrs.push(`${mapFile[key]} ${node.attr[key]}`)
    }
    let children = [];
    if (node.children) children = node.children.map( item => recurse(item, mapFile))
    return `${mapFile[element]} ${attrs.join(" ")} 0 ${node.val ? node.val : ''}${children.join(" ")} 0`;
}


function main(){
    string = '<family lastName="McDowell" state="CA"><person firstName="Gayle">Some Message</person></family>';
    let mapFile = {
        "family": 1,
        "person": 2,
        "firstName": 3,
        "lastName": 4,
        "state": 5
    }
    console.log(`Result = ${encode(string, mapFile)}`);
}
main();