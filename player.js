const DEFAULT_NAME = "Miss Nobody";
const LOCAL_KEY_PLAYER = "PLAYER_NAME";

export let playerName = DEFAULT_NAME;

export function getPlayerName() {
  playerName = loadLastPlayerName();
  if (!playerName || playerName == null || playerName == "null") playerName = DEFAULT_NAME;
  playerName = window.prompt("Please enter you name", playerName);
  saveLastPlayerName(playerName);
}

function loadLastPlayerName() {
  return localStorage.getItem(LOCAL_KEY_PLAYER);
}

function saveLastPlayerName(name) {
  localStorage.setItem(LOCAL_KEY_PLAYER, name);
}
