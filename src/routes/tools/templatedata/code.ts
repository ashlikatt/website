import { inflate, gzip } from "pako";

var dataBox: any = undefined;
var jsonBox: any = undefined;
var alertBox: any = undefined;

export function setDataBox(x: any) {
    dataBox = x;
}

export function setJsonBox(x: any) {
    jsonBox = x;
}

export function setAlertBox(x: any) {
    alertBox = x;
}

export function jsonToDataButton() {
    if (!dataBox || !jsonBox) return; // If text boxes aren't loaded, don't do anything
    
    try {
        JSON.parse(jsonBox.value)
        dataBox.value = compress(jsonBox.value);
    } catch (e) {
        notification("Invalid template data input:\n" + (e+"").substring(25))
    }
}


export function dataToJsonButton() {
    if (!dataBox || !jsonBox) return; // If text boxes aren't loaded, don't do anything

    try {
        jsonBox.value = decompress(sanitize(dataBox.value));
    } catch {
        notification("Could not decode template data.")
    }
}

export function recodeButton() {
    if (!dataBox || !jsonBox) return; // If text boxes aren't loaded, don't do anything
    
    const compressed = sanitize(dataBox.value);

    const templateData = JSON.stringify({
        author: "Kitsli",
        name: "Cool",
        version: 1,
        code: compressed
    });

    const packet = JSON.stringify({
        source: "Ashli's Site",
        type: "nbt",
        data: `{id:"minecraft:stone",Count:1,tag:{PublicBukkitValues:{"hypercube:codetemplatedata":'${templateData}'}}}`
    });
    
    const ws = new WebSocket("ws://localhost:31371");
    ws.addEventListener('open', _ => {
        ws.send(packet);
    })
}

const compress = (s: any) => btoa(String.fromCharCode.apply(null, [...new Uint16Array(gzip(s))]))
const decompress = (s: any) => inflate(new Uint8Array(atob(s).split('').map(e => e.charCodeAt(0))), {to: 'string'});

function sanitize(s: any) {
    if (s.startsWith(`'{"author"`)) { // Very likely just a copy-pasted templateData
        return s.split(`,"code":"`)[1].split(`"}'`)[0];
    } else return s
}

function notification(message: any) {
    console.log("Sending message " + message)
    const elem = document.createElement("div");
    elem.addEventListener('click', function() { this.remove() })
    elem.classList.add("alertBox");
    elem.innerHTML = message;
    alertBox?.appendChild(elem);
}