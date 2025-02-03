document.addEventListener("DOMContentLoaded", () => {
    fetchque();
    updateleader();
});

let currquesion = 0;
let score = localStorage.getItem("qscore") ? parseInt(localStorage.getItem("qscore")) : 0;
let questions = [];

function fetchque() {
    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            renderque();
        })
        .catch(error => console.error(error));
}

function renderque() {
    if (currquesion >= questions.length) {
        alert(`Quiz ended: ${score}`);
        storeineaderboard();
        return;
    }

    const Ques = document.getElementById("question");
    const Options = document.getElementById("options");
    const Scores = document.getElementById("score");

    let currentQuestion = questions[currquesion];
    Ques.textContent = currentQuestion.question;
    Options.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkans(option, currentQuestion.answer);
        Options.appendChild(button);
    });

    Scores.textContent = `Score: ${score}`;
}

function checkans(choosedoption, rightans) {
    if (choosedoption === rightans) {
        score += 1;
        localStorage.setItem("qscore", score);
    }

    currquesion++;
    renderque();
}

function storeineaderboard() {
    let playerName = prompt("Enter your name:");
    if (!playerName) return;

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    updateleader();
}

function updateleader() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "<h2>Leaderboard</h2>";
    leaderboard.forEach((entry, index) => {
        leaderboardElement.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score}</p>`;
    });
}

function reset() {
    localStorage.removeItem("qscore");
    currquesion = 0;
    score = 0;
    renderque();
}
