export {
    dimension, baseDistance, minLocation, maxLocation,
    mapArea, tank, castle
};
import {getLocation, moveTank} from "./functionScript.js";

let width = screen.width < screen.height
    ? screen.width
    : screen.height;
let widthRatio = screen.width <= 500
    ? width / 500
    : 1.3;
alert(screen.width + ' ' + screen.height);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.transform = `scale(${widthRatio})`;
} else {

}

let mapArea = document.getElementById('mapArea');
let dimension = 5,
    baseDistance = 65,
    minLocation = '2px',
    maxLocation = getLocation(dimension - 1);

let table = document.createElement('table');
mapArea.appendChild(table);
for (let i = 0; i < dimension; i++) {
    let row = document.createElement('tr');
    table.appendChild(row);

    for (let i = 0; i < dimension; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell)
    }
}

let tankPosition = [0, 0];
localStorage.setItem('tankPosition', JSON.stringify(tankPosition));
let tank = document.createElement('div');
tank.className = 'mapArea tank';
tank.style.top = getLocation(tankPosition[0]);
tank.style.left = getLocation(tankPosition[1]);
mapArea.appendChild(tank);

let castlePosition = [dimension - 1, dimension - 1];
localStorage.setItem('castlePosition', JSON.stringify(castlePosition));
let castle = document.createElement('div');
castle.className = 'mapArea castle';
castle.style.top = getLocation(castlePosition[0]);
castle.style.left = getLocation(castlePosition[1]);
mapArea.appendChild(castle);

let bombPosition = [[0, 1], [1, 3], [3, 2], [4, 0], [3, 4]];
localStorage.setItem('bombPosition', JSON.stringify(bombPosition));
for (let i = 0; i < bombPosition.length; i++) {
    let bomb = document.createElement('div');
    bomb.className = 'mapArea bomb';
    bomb.style.left = getLocation(bombPosition[i][0]);
    bomb.style.top = getLocation(bombPosition[i][1]);
    mapArea.appendChild(bomb);
}

let arrowName = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
let controlArea = document.getElementById('controlArea');
for (let i = 0; i < arrowName.length; i++) {
    let arrow = document.createElement('div');
    arrow.className = 'controlArea ' + arrowName[i].toLowerCase();
    arrow.onclick = function () {
        moveTank(arrowName[i]);
    };
    controlArea.appendChild(arrow);
}

let circle = document.createElement('div');
circle.className = 'circle';
controlArea.appendChild(circle);

window.onkeydown = function (event) {
    arrowName.includes(event.key)
        ? moveTank(event.key)
        : event.preventDefault();
}

// window.addEventListener("DOMContentLoaded", function () {
//     let backgroundSound = document.getElementById('backgroundSound');
//     backgroundSound.play();
//     backgroundSound.volume = 0.9;
// });