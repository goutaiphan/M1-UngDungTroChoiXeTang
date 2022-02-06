export {result, moveTank, getPosition, getLocation}
import {
    playArea, tank, castle,
    baseDistance, minLocation, maxLocation,
    tankPosition, bombPosition, castlePosition
} from "./baseScript.js";

function result() {
    let explosionSound = document.getElementById('explosionSound');
    explosionSound.playbackRate = 1.2;
    explosionSound.volume = 0.5;
    let victorySound = document.getElementById('victorySound');
    victorySound.volume = 0.5;

    for (let i = 0; i < bombPosition.length; i++) {
        if (String(tankPosition) === String(bombPosition[i])) {
            let explosion = document.createElement('div');
            explosion.id = 'explosion';
            explosion.style.left = getLocation(tankPosition[0]);
            explosion.style.top = getLocation(tankPosition[1]);
            playArea.removeChild(tank);
            playArea.appendChild(explosion);
            explosionSound.play();
        }
    }

    if (String(tankPosition) === String(castlePosition)) {
        let firework = document.createElement('div');
        firework.id = 'firework';
        firework.style.left = getLocation(tankPosition[0]);
        firework.style.top = getLocation(tankPosition[1]);
        playArea.removeChild(tank);
        playArea.removeChild(castle);
        playArea.appendChild(firework);
        victorySound.play();
    }
}

function moveTank(key) {
    if (playArea.contains(tank)) {
        let boundary, distance;
        if (key === 'ArrowUp' || key === 'ArrowLeft') {
            boundary = minLocation;
            distance = -baseDistance;
        } else {
            boundary = maxLocation;
            distance = baseDistance;
        }

        if (key === 'ArrowUp' || key === 'ArrowDown') {
            tank.style.top = tank.style.top === boundary
                ? tank.style.top
                : parseInt(tank.style.top) + distance + 'px';
        } else {
            tank.style.left = tank.style.left === boundary
                ? tank.style.left
                : parseInt(tank.style.left) + distance + 'px';
        }
        tankPosition = [getPosition(tank.style.left), getPosition(tank.style.top)];
        result();

        let control = document.getElementsByClassName(key.toLowerCase())[0];
        control.classList.add('active');
        setTimeout(function () {
            control.classList.remove('active');
        }, 100);
    }
}

function getLocation(position) {
    return (parseInt(minLocation) + baseDistance * position) + 'px';
}

function getPosition(location) {
    return (parseInt(location) - parseInt(minLocation)) / baseDistance;
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}