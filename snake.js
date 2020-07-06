import { getInputDirection } from "./input.js";

export let SNAKE_SPEED = 4;
export let GAME_SCORE = 0;
export let timeSinceEaten = 0;

let newSegments = 0;

const snakeBody = [{ x: 11, y: 11 }];

export function resetTimeSinceEaten() {
  timeSinceEaten = 0;
}

export function slowSnake(REDUCTION_FACTOR) {
  SNAKE_SPEED = SNAKE_SPEED / REDUCTION_FACTOR;
}

export function update() {
  addSegments();
  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;

  if (inputDirection.x != 0 || inputDirection.y != 0) {
    timeSinceEaten += 1;
    if (timeSinceEaten > 20) {
      SNAKE_SPEED += 0.1;
    } else {
      SNAKE_SPEED += 0.01;
    }
    GAME_SCORE += snakeBody.length;
  }
}

export function draw(gameBoard) {
  const greenStep = Math.round(255 / snakeBody.length);
  let curRed = 0;
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    snakeElement.style.backgroundColor = `rgba(${curRed}, 255, 123, 1)`;
    curRed += greenStep;
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

function equalPositions(positionA, positionB) {
  return positionA.x === positionB.x && positionA.y === positionB.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
