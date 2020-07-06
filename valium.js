let valium = getRandomPosition();
const SLOW_FACTOR = 2;

let valiumVisible = false;

import { onSnake, slowSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

export function update() {
  if (valiumVisible) {
    if (onSnake(valium)) {
      slowSnake(SLOW_FACTOR);
      valium = getRandomPosition();
      valiumVisible = false;
    }
  } else {
    if (Math.floor(Math.random() * 30) < 1) {
      valiumVisible = true;
    }
  }
}

export function draw(gameBoard) {
  if (valiumVisible) {
    const element = document.createElement("div");
    element.style.gridRowStart = valium.y;
    element.style.gridColumnStart = valium.x;
    element.classList.add("valium");
    gameBoard.appendChild(element);
  }
}

function getRandomPosition() {
  let newPosition;
  while (newPosition == null || onSnake(newPosition)) {
    newPosition = randomGridPosition();
  }
  return newPosition;
}
