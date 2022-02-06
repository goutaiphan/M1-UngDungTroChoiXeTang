export {
    playArea, tank, castle,
    baseDistance, minLocation, maxLocation, tankPosition, bombPosition, castlePosition
};
import {getLocation, moveTank} from "./functionScript.js";

let playArea = document.getElementById('playArea');

let dimension = 5,
    baseDistance = 66,
    minLocation = '2px',
    maxLocation = getLocation(dimension - 1);

let table = document.createElement('table');
playArea.appendChild(table);
for (let i = 0; i < dimension; i++) {
    let tableRow = document.createElement('tr');
    table.appendChild(tableRow);

    for (let i = 0; i < dimension; i++) {
        let tableCell = document.createElement('td');
        tableRow.appendChild(tableCell)
    }
}

let tankPosition = [0, 0];
let tank = document.createElement('div');
tank.id = 'tank';
tank.style.top = getLocation(tankPosition[0]);
tank.style.left = getLocation(tankPosition[1]);
playArea.appendChild(tank);

let castlePosition = [dimension - 1, dimension - 1];
let castle = document.createElement('div');
castle.id = 'castle';
castle.style.top = getLocation(castlePosition[0]);
castle.style.left = getLocation(castlePosition[1]);
playArea.appendChild(castle);

let bombArray = [];
let bombPosition = [[0, 1], [1, 3], [3, 2], [4, 0], [3, 4]];

for (let i = 0; i < bombPosition.length; i++) {
    let bomb = document.createElement('div');
    bomb.id = 'bomb';
    bomb.style.left = getLocation(bombPosition[i][0]);
    bomb.style.top = getLocation(bombPosition[i][1]);
    playArea.appendChild(bomb);
    bombArray.push(bomb);
}

let arrowName = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
let controlArea = document.getElementById('controlArea');
for (let i = 0; i < arrowName.length; i++) {
    let arrow = document.createElement('div');
    arrow.className = arrowName[i].toLowerCase();
    arrow.onclick = function () {
        moveTank(arrowName[i]);
    };
    controlArea.appendChild(arrow);
}

let circle = document.createElement('div');
circle.id = 'circle';
controlArea.appendChild(circle);

window.onkeydown = function (event) {
    if (arrowName.includes(event.key)) {
        moveTank(event.key);
    } else {
        event.preventDefault();
    }
}

// window.addEventListener("DOMContentLoaded", function () {
//     let backgroundSound = document.getElementById('backgroundSound');
//     backgroundSound.play();
//     backgroundSound.volume = 0.9;
// });