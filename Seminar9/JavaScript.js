// 1. Model - doar ce nu există în DOM
let editor, selectie, elementSelectat = null;
let mx = 0, my = 0, x1 = 0, y1 = 0;

// 2. Desenare - nu mai este necesar pentru DOM (redesenare automată)

// 3. Actualizare model - nu este cazul pentru editor

// 4. Tratare evenimente

function mousedown(e) {
    if (e.button === 0) {
        x1 = mx;
        y1 = my;
        selectie.style.display = 'block';
        setareCoordonate(selectie, x1, y1, mx, my);
    }
}

function mouseup(e) {
    if (e.button === 0) {
        selectie.style.display = 'none';

        let element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        setareCoordonate(element, x1, y1, mx, my);
        document.querySelector('#elemente').appendChild(element);
        element.addEventListener('mousedown', elementMouseDown);
    }
}

function elementMouseDown(e) {
    if (e.button === 2) {
        elementSelectat = e.target;

        for (let element of document.querySelectorAll('#elemente *')) {
            element.classList.remove('selectat');
        }
        elementSelectat.classList.add('selectat');
    }
}

function mousemove(e) {
    mx = Math.round(e.x - editor.getBoundingClientRect().x);
    my = Math.round(e.y - editor.getBoundingClientRect().y);

    // (mx, my), (x1, y1)
    setareCoordonate(selectie, x1, y1, mx, my);
}

function setareCoordonate(element, x1, y1, x2, y2) {
    element.setAttribute('x', Math.min(x1, x2));
    element.setAttribute('y', Math.min(y1, y2));
    element.setAttribute('width', Math.max(x1, x2) - Math.min(x1, x2));
    element.setAttribute('height', Math.max(y1, y2) - Math.min(y1, y2));
}

function aplicatie() {
    editor = document.querySelector('#editor');
    selectie = document.querySelector('#selectie');

    editor.addEventListener('mousedown', mousedown);
    editor.addEventListener('mouseup', mouseup);
    editor.addEventListener('mousemove', mousemove);
    editor.addEventListener('contextmenu', e => e.preventDefault());
}
document.addEventListener('DOMContentLoaded', aplicatie);