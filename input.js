let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y != 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y != 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x != 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x != 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

export function is_touch_device() {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  var mq = function (query) {
    return window.matchMedia(query).matches;
  };

  if (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true;
  }

  var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return mq(query);
}

function handleButtonClick(event) {
  switch (event.target.id) {
    case "Right":
      if (lastInputDirection.x != 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    case "Up":
      if (lastInputDirection.y != 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "Down":
      if (lastInputDirection.y != 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "Left":
      if (lastInputDirection.x != 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
  }
}

export function addClickHandle(object) {
  object.addEventListener("click", handleButtonClick);
}
