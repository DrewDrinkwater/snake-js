import {
  SNAKE_SPEED,
  GAME_SCORE,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  timeSinceEaten,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";
import { update as updateValium, draw as drawValium } from "./valium.js";
import { outsideGrid } from "./grid.js";
import { getScoresFromDisk, displayHighScores } from "./scores.js";
import { playerName, getPlayerName } from "./player.js";
import { is_touch_device, addClickHandle } from "./input.js";

let lastRenderTime = 0;
let gameOver = false;

let showButtons = is_touch_device();

const gameBoard = document.getElementById("game-board");
const score = document.getElementById("score");
const speed = document.getElementById("speed");
const tse = document.getElementById("tse");
const buttonBar = document.getElementById("button-bar");

function main(currentTime) {
  if (gameOver) {
    displayHighScores(playerName, GAME_SCORE);
    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  if (!gameOver) {
    draw();
  }
}

getPlayerName();
getScoresFromDisk();
window.requestAnimationFrame(main);
addClickHandle(buttonBar);

function update() {
  updateFood();
  updateValium();
  updateSnake();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawFood(gameBoard);
  drawValium(gameBoard);
  drawSnake(gameBoard);
  speed.innerHTML = Math.round(SNAKE_SPEED * 100) / 100;
  score.innerHTML = GAME_SCORE;
  tse.innerHTML = timeSinceEaten;
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
