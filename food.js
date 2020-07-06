let food = getRandomFoodPosition();
const EXANPSION_RATE = 5;

import { onSnake, expandSnake, resetTimeSinceEaten } from "./snake.js";
import { randomGridPosition } from "./grid.js";

export function update() {
  if (onSnake(food)) {
    expandSnake(EXANPSION_RATE);
    food = getRandomFoodPosition();
    resetTimeSinceEaten();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
