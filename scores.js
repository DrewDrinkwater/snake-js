const LOCAL_KEY_SCORES = "SCORE_STORE";

var firebaseConfig = {
  apiKey: "AIzaSyCaC4gSIBoGE6xEHq8dR9EGBSzACbH18Cg",
  authDomain: "drinkwaters.firebaseapp.com",
  databaseURL: "https://drinkwaters.firebaseio.com",
  projectId: "drinkwaters",
  storageBucket: "drinkwaters.appspot.com",
  messagingSenderId: "740226667010",
  appId: "1:740226667010:web:82a6401543f80cf3b00d1b",
  measurementId: "G-TSV6J20RCQ",
};

export let scores = [];

function haveHighScore(thisScore) {
  return scores.find((score) => score.score < thisScore);
}

export function displayHighScores(name, score) {
  let highScores = `Your score: ${score}\n\n`;

  if (haveHighScore(score)) {
    highScores += "##### You Made the Top 10 #####\n\n";
    pushScoreToFireBase(name, score);
  } else {
    highScores += "You need to try harder to get on the Leaderboard\n\n";
  }
  highScores += "High Scores\n";

  scores.forEach(
    (score) => (highScores += `${score.player} - ${score.score}\n`)
  );

  if (confirm(highScores)) {
    window.location = "/";
  }
}

function pushScoreToFireBase(name, score) {
  firebase
    .database()
    .ref()
    .child("snakeScores")
    .push({ player: name, score: score });
}

export function loadScoresFromFireBase() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  var topScores = database
    .ref("snakeScores")
    .orderByChild("score")
    .limitToLast(10);
  topScores.on("value", function (dataSet) {
    scores = Object.values(dataSet.val()).map((score) => score);
    scores = scores.sort((a, b) => b.score - a.score);
  });
}
