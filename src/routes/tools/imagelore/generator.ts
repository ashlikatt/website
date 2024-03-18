const MIN_SIZE = 5;
const MAX_SIZE = 100;
const MAX_COMMAND_LENGTH = 32500;

var recodeButtonDOM: HTMLElement | undefined = undefined;
var copyButtonDOM: HTMLElement | undefined = undefined;
var inputFileDOM: HTMLInputElement | undefined = undefined;
var inputRangeDOM: HTMLInputElement | undefined = undefined;
var pixelDisplay: HTMLElement | undefined = undefined;

export function setRecodeButtonDOM(x:any) {recodeButtonDOM=x;}
export function setCopyButtonDOM(x:any) {copyButtonDOM=x;}
export function setInputFileDOM(x:any) {inputFileDOM=x;}
export function setInputRangeDOM(x:any) {inputRangeDOM=x;}
export function setPixelDisplay(x:any) {pixelDisplay=x;}

var inputImage: any = undefined;
var imageBitmap: any = undefined;
var imageBitmapURL: any = undefined;
var tellraw: any = undefined;
var valid = false;

export function inputChanged() {
    if (!inputFileDOM || !inputRangeDOM) return;

    try {
        // Get file input
        const file = inputFileDOM.files?.[0]!;

        // Get quality input
        const quality = parseInt(inputRangeDOM.value) - 1;
    
        // Validate input
        if (!(file instanceof File)) throw new Error("Input file is invalid - Invalid data.");
        if (!file.type.startsWith("image")) throw new Error("Input file is invalid - Not an image.");
        if (quality < 0 || quality > 99) throw new Error("Input quality is invalid - Out of range.");

        inputImage = URL.createObjectURL(file);
        createImageBitmap(file).then(bitmap => {
            // Figure out size
            const scale = Math.min(MAX_SIZE / bitmap.width, MAX_SIZE / bitmap.height)
            const targetWidth = interpInt(MIN_SIZE, bitmap.width * scale, quality/100);
            const targetHeight = interpInt(MIN_SIZE, bitmap.height * scale, quality/100);
            
            // Create canvas with size
            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // Draw image
            const context = canvas.getContext("2d");
            context?.drawImage(bitmap, 0, 0, targetWidth, targetHeight)

            // Save drawn image (Resized lmao)
            imageBitmap = context?.getImageData(0, 0, targetWidth, targetHeight);
            imageBitmapURL = canvas.toDataURL();
            
            // Cleanup
            canvas.remove();
            updateOutput();
        });
    } catch (e) {
        invalidate();
        console.log(e);
    }
}

function updateOutput() {
    if (imageBitmapURL) {
        if (pixelDisplay) {
            const img = new Image();
            img.src = imageBitmapURL;
            img.id = "pixelImage";
            
            pixelDisplay.innerHTML = "";
            pixelDisplay.appendChild(img);
        }
    }

    if (imageBitmap) {
        // Init
        const data = imageBitmap.data;
        let currentIndex = 0;
        const lines = [];

        // For every line
        for (let line = 0; line < imageBitmap.height; line++) {
            let lineData: any[] = [];
            
            // For every pixel in line
            for (let column = 0; column < imageBitmap.width; column++) {
                // Grab pixel data
                let r = data[currentIndex++];
                let g = data[currentIndex++];
                let b = data[currentIndex++];
                currentIndex++; // Skip alpha
                
                // Determine what to do
                let color = hex(r, g, b);
                if (lineData.length > 0 && lineData[lineData.length-1].color === color) { // Identical to last pixel, merge
                    lineData[lineData.length-1].count++;
                } else { // New pixel data
                    lineData.push({ 
                        first: lineData.length === 0,
                        color: color,
                        count: 1  
                    });
                }

            }
            lines.push("'[" + lineData.map(pixelDataToString).join(",") + "]'");
        }
        tellraw = "[" + lines.join(",") + "]";

        validate();
    } else {
        invalidate();
    }
}

function interpInt(min: any, max: any, percent: any) {
    return Math.round(((max-min)*percent)+min)
}

function hex(r: any, g: any, b: any) {
    return "#" + 
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0")
}

export function invalidate() {
    valid = false;
    if (recodeButtonDOM) recodeButtonDOM.classList.add("disabled");

    if (copyButtonDOM) {
        copyButtonDOM.classList.add("disabled");
        copyButtonDOM.classList.remove("warning");
    }
}

function validate() {
    valid = true;

    if (recodeButtonDOM) recodeButtonDOM.classList.remove("disabled");

    if (copyButtonDOM) {
        copyButtonDOM.classList.remove("disabled");
        if (tellraw.length + 19 > MAX_COMMAND_LENGTH) { // Too large for command block
            copyButtonDOM.classList.add("warning");
        } else {
            copyButtonDOM.classList.remove("warning");
        }
    }
}

export function copyButton() {
    if (!valid) return;
    const nbt = "{display:{Lore:" + tellraw + "}}"
    const command = "/give @p cod" + nbt;
    navigator.clipboard.writeText(command);
}

export function recodeButton() {
    if (!valid) return;
    const packet = `{"source":"Ashli's Site","type":"nbt","data":"{'id':'minecraft:stone','Count':1,tag:{display:{Lore:${tellraw.replaceAll('"', '\\"')}}}}"}`;
    const ws = new WebSocket("ws://localhost:31371");
    ws.addEventListener('open', _ => {
        ws.send(packet);
    })
}

function pixelDataToString(data: any) {
    if (data.first) {
        return `{"italic":false,"color":"${data.color}","text":"${"█".repeat(data.count)}"}`
    } else {
        return `{"color":"${data.color}","text":"${"█".repeat(data.count)}"}`
    }
}