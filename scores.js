const LOCAL_KEY_SCORES = "SCORE_STORE";

const startScores = [
  { name: "slick snake", score: 1000 },
  { name: "fumble fingers", score: 10 },
];

export let scores = [];

export function getScoresFromDisk() {
  try {
    scores = JSON.parse(localStorage.getItem(LOCAL_KEY_SCORES));
  } catch (error) {
    saveScoresToDisk();
  }  
  if (!scores) saveScoresToDisk();  
}

export function saveScore(name, score) {
  scores.push({ name, score });
  scores = scores.sort((a, b) => b.score - a.score);
  saveScoresToDisk();
}

function saveScoresToDisk() {
  if (!scores || scores.length == 0) scores = startScores;
  if (scores.length > 10) scores = scores.slice(0, 10);
  localStorage.setItem(LOCAL_KEY_SCORES, JSON.stringify(scores));
}

export function displayHighScores(name, score) {
  saveScore(name, score);

  let highScores = `Your score: ${score}\n\n`;
  highScores += "You lost. Press ok to restart.\n\n";
  highScores += "High Scores\n";

  scores.forEach((score) => (highScores += `${score.name} - ${score.score}\n`));

  if (confirm(highScores)) {
    window.location = "/";
  }
}
