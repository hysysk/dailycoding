const GENE_NUMBER = 10;
const QUESTION_NUMBER = 10;
let genes = [];
let correctAnswers = [];
let count = 0;

function start() {
  for (let i = 0; i < QUESTION_NUMBER; i++) {
    correctAnswers.push(Math.floor(Math.random() * 3));
    let correctAnswersElement = document.getElementById("correctAnswers");
    correctAnswersElement.innerText = correctAnswers;
  }

  for (let i = 0; i < GENE_NUMBER; i++) {
    genes[i] = {};
    genes[i].answers = [];
    genes[i].point = 0;
    for (let j = 0; j < QUESTION_NUMBER; j++) {
      genes[i].answers.push(Math.floor(Math.random() * 3));
    }
  }

  checkAnswers(genes);
  sortAnswersByPoints();

  let id = setInterval(() => {
    crossOver();
    count++;

    let answersElement = document.getElementById("answers");
    let generationsElement = document.getElementById("generations");
    answersElement.innerText = genes[0].answers;
    generationsElement.innerText = count;
    if (genes[0].point === 100) {
      clearInterval(id);
      answersElement.style.backgroundColor = "#ff0";
    }
  }, 300);
}

function checkAnswers(gs) {
  for (let i = 0; i < gs.length; i++) {
    for (let j = 0; j < gs[i].answers.length; j++) {
      if (gs[i].answers[j] === correctAnswers[j]) {
        gs[i].point += 10;
      }
    }
  }
}

function sortAnswersByPoints() {
  genes.sort((a, b) => b.point - a.point);
}

function crossOver() {
  let index = Math.floor(Math.random() * correctAnswers.length);
  let tmpA = genes[0].answers.slice(0, index);
  let tmpB = genes[1].answers.slice(0, index);
  let nextA = { answers: [...genes[0].answers], point: 0 };
  let nextB = { answers: [...genes[1].answers], point: 0 };
  nextA.answers.splice(0, tmpB.length, ...tmpB);
  nextB.answers.splice(0, tmpA.length, ...tmpA);

  let mutateA = Math.floor(Math.random() * correctAnswers.length);
  let mutateB = Math.floor(Math.random() * correctAnswers.length);
  nextA.answers[mutateA] = (nextA.answers[mutateA] + 1) % 3;
  nextB.answers[mutateB] = (nextB.answers[mutateB] + 1) % 3;
  checkAnswers([nextA, nextB]);

  genes.splice(-2, 2);
  genes.unshift(nextA, nextB);
  sortAnswersByPoints();
}

start();