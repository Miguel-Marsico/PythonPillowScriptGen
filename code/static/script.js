const CM_TO_PX = 37.7952755906;

let elements = [];
let canvas, ctx;
let selectedElement = null;
let offsetX, offsetY;

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
});

function resizeCanvas() {
    const canvasWidthCm = document.getElementById('canvasWidthCm').value;
    const canvasHeightCm = document.getElementById('canvasHeightCm').value;
    const canvasWidth = Math.ceil(canvasWidthCm * CM_TO_PX);
    const canvasHeight = Math.ceil(canvasHeightCm * CM_TO_PX);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawElements();
}

function addElement(type) {
    let element = { type: type, x: 50, y: 50, color: 'black' };
    if (type === 'text') {
        element.text = 'Hello';
        element.size = 20;
        element.font = 'Arial';
    } else if (type === 'rectangle') {
        element.width = 2;
        element.height = 1;
        element.border_width = 2;
    } else if (type === 'circle') {
        element.width = 1.5;
        element.height = 1.5;
        element.border_width = 2;
    } else if (type === 'line') {
        element.length = 2.5;
        element.rotation = 0;
        element.thickness = 2;
    } else if (type === 'triangle') {
        element.width = 2;
        element.height = 1.5;
        element.border_width = 2;
    }
    elements.push(element);
    displayElements();
    drawElements();
}

function displayElements() {
    const elementsDiv = document.getElementById('elements');
    elementsDiv.innerHTML = '';
    elements.forEach((element, index) => {
        elementsDiv.innerHTML += `<div class="element-control">
            <label>${element.type} ${index + 1}</label>
            <input type="color" value="${element.color}" onchange="updateElement(${index}, 'color', this.value)">
            ${element.type === 'text' ? `<input type="text" value="${element.text || ''}" placeholder="Text" onchange="updateElement(${index}, 'text', this.value)">` : ''}
            ${element.type === 'text' ? `<input type="number" value="${element.size || ''}" placeholder="Size" onchange="updateElement(${index}, 'size', this.value)">` : ''}
            ${element.type === 'text' ? `<select onchange="updateElement(${index}, 'font', this.value)">${getFontOptions(element.font)}</select>` : ''}
            ${element.type === 'rectangle' || element.type === 'circle' || element.type === 'triangle' ? `<input type="number" value="${element.width || ''}" placeholder="Width (cm)" onchange="updateElement(${index}, 'width', this.value)">` : ''}
            ${element.type === 'rectangle' || element.type === 'circle' || element.type === 'triangle' ? `<input type="number" value="${element.height || ''}" placeholder="Height (cm)" onchange="updateElement(${index}, 'height', this.value)">` : ''}
            ${element.type === 'line' ? `<input type="number" value="${element.length || ''}" placeholder="Length (cm)" onchange="updateElement(${index}, 'length', this.value)">` : ''}
            ${element.type === 'line' ? `<input type="number" value="${element.rotation || ''}" placeholder="Rotation" onchange="updateElement(${index}, 'rotation', this.value)">` : ''}
            ${element.type === 'line' ? `<input type="number" value="${element.thickness || ''}" placeholder="Thickness" onchange="updateElement(${index}, 'thickness', this.value)">` : ''}
            <button class="icon-button" onclick="removeElement(${index})" title="Remove Element">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    });
}

function updateElement(index, key, value) {
    elements[index][key] = value;
    drawElements();
}

function removeElement(index) {
    elements.splice(index, 1);
    displayElements();
    drawElements();
}

function drawElements() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(element => {
        ctx.fillStyle = element.color;
        ctx.strokeStyle = element.color;
        if (element.type === 'text') {
            ctx.font = `${element.size}px ${element.font}`;
            ctx.fillText(element.text, element.x, element.y);
        } else if (element.type === 'rectangle') {
            ctx.lineWidth = element.border_width;
            ctx.strokeRect(element.x, element.y, element.width * CM_TO_PX, element.height * CM_TO_PX);
        } else if (element.type === 'circle') {
            ctx.lineWidth = element.border_width;
            ctx.beginPath();
            ctx.ellipse(element.x + (element.width * CM_TO_PX) / 2, element.y + (element.height * CM_TO_PX) / 2, (element.width * CM_TO_PX) / 2, (element.height * CM_TO_PX) / 2, 0, 0, 2 * Math.PI);
            ctx.stroke();
        } else if (element.type === 'line') {
            const endX = element.x + (element.length * CM_TO_PX) * Math.cos(element.rotation * Math.PI / 180);
            const endY = element.y + (element.length * CM_TO_PX) * Math.sin(element.rotation * Math.PI / 180);
            ctx.lineWidth = element.thickness;
            ctx.beginPath();
            ctx.moveTo(element.x, element.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        } else if (element.type === 'triangle') {
            ctx.lineWidth = element.border_width;
            ctx.beginPath();
            ctx.moveTo(element.x, element.y);
            ctx.lineTo(element.x + element.width * CM_TO_PX, element.y);
            ctx.lineTo(element.x + (element.width * CM_TO_PX) / 2, element.y - element.height * CM_TO_PX);
            ctx.closePath();
            ctx.stroke();
        }
    });
}

function onMouseDown(event) {
    const { offsetX, offsetY } = event;
    selectedElement = elements.find(element => isElementClicked(element, offsetX, offsetY));
    if (selectedElement) {
        this.offsetX = offsetX - (selectedElement.x || selectedElement.x1);
        this.offsetY = offsetY - (selectedElement.y || selectedElement.y1);
    }
}

function onMouseUp() {
    selectedElement = null;
}

function onMouseMove(event) {
    if (selectedElement) {
        const { offsetX, offsetY } = event;
        selectedElement.x = offsetX - this.offsetX;
        selectedElement.y = offsetY - this.offsetY;
        drawElements();
    }
}

function isElementClicked(element, x, y) {
    if (element.type === 'text') {
        return x >= element.x && x <= element.x + ctx.measureText(element.text).width && y >= element.y - element.size && y <= element.y;
    } else if (element.type === 'rectangle') {
        return x >= element.x && x <= element.x + element.width * CM_TO_PX && y >= element.y && y <= element.y + element.height * CM_TO_PX;
    } else if (element.type === 'circle') {
        const centerX = element.x + (element.width * CM_TO_PX) / 2;
        const centerY = element.y + (element.height * CM_TO_PX) / 2;
        const radiusX = (element.width * CM_TO_PX) / 2;
        const radiusY = (element.height * CM_TO_PX) / 2;
        return (Math.pow((x - centerX) / radiusX, 2) + Math.pow((y - centerY) / radiusY, 2)) <= 1;
    } else if (element.type === 'line') {
        const endX = element.x + (element.length * CM_TO_PX) * Math.cos(element.rotation * Math.PI / 180);
        const endY = element.y + (element.length * CM_TO_PX) * Math.sin(element.rotation * Math.PI / 180);
        const distance = Math.abs((endY - element.y) * x - (endX - element.x) * y + endX * element.y - endY * element.x) /
                         Math.sqrt(Math.pow(endY - element.y, 2) + Math.pow(endX - element.x, 2));
        return distance < element.thickness;
    } else if (element.type === 'triangle') {
        const [x1, y1] = [element.x, element.y];
        const [x2, y2] = [element.x + element.width * CM_TO_PX, element.y];
        const [x3, y3] = [element.x + (element.width * CM_TO_PX) / 2, element.y - element.height * CM_TO_PX];
        const area = 0.5 * Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
        const area1 = 0.5 * Math.abs(x * (y2 - y3) + x2 * (y3 - y) + x3 * (y - y2));
        const area2 = 0.5 * Math.abs(x1 * (y - y3) + x * (y3 - y1) + x3 * (y1 - y));
        const area3 = 0.5 * Math.abs(x1 * (y2 - y) + x2 * (y - y1) + x * (y1 - y2));
        return Math.abs(area - (area1 + area2 + area3)) < 0.1;
    }
    return false;
}

async function generateScript() {
    const canvasWidthCm = document.getElementById('canvasWidthCm').value;
    const canvasHeightCm = document.getElementById('canvasHeightCm').value;
    const response = await fetch('/generate_script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ width: canvasWidthCm, height: canvasHeightCm, elements: elements }),
    });
    const data = await response.json();
    document.getElementById('generatedScript').innerText = data.script;
}
