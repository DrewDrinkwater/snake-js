const GRID_SIZE = 30;

export function initialiseGrid() {
  const globalSettings = document.querySelector("html");
  globalSettings.style.setProperty("--grid-cells", GRID_SIZE);
}

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}
