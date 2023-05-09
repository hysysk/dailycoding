const GENE_NUMBER = 10;
const CELL_NUMBER = 64;
let genes = [];
let correctAnswer = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 1, 0, 1, 1, 0,
  0, 1, 0, 0, 1, 0, 0, 1,
  0, 1, 0, 0, 0, 0, 0, 1,
  0, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 1, 0, 0, 0, 1, 0,
  0, 0, 0, 1, 0, 1, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 0,
];
const correctCanvas = document.getElementById("correct");
const answerCanvas = document.getElementById("answer");
const correctCtx = correctCanvas.getContext("2d");
const answerCtx = answerCanvas.getContext("2d");

function start() {
  for (let i = 0; i < CELL_NUMBER; i++) {
    if (correctAnswer[i] === 1) {
      let x = i % 8 * 40;
      let y = Math.floor(i / 8) * 40;
      correctCtx.fillRect(x, y, 40, 40);
    }
  }

  for (let i = 0; i < GENE_NUMBER; i++) {
    genes[i] = {};
    genes[i].answers = [];
    genes[i].point = 0;
    for (let j = 0; j < CELL_NUMBER; j++) {
      genes[i].answers.push(Math.floor(Math.random() * 2));
    }
  }

  checkAnswers(genes);
  sortAnswersByPoints();

  let count = 0;
  let id = setInterval(() => {
    crossOver();
    count++;

    let generationsElement = document.getElementById("generations");
    generationsElement.innerText = count;
    answerCtx.clearRect(0, 0, 320, 320);
    for (let i = 0; i < CELL_NUMBER; i++) {
      if (genes[0].answers[i] === 1) {
        let x = i % 8 * 40;
        let y = Math.floor(i / 8) * 40;
        answerCtx.fillRect(x, y, 40, 40);
      }
    }

    if (genes[0].point === 640) {
      clearInterval(id);
    }
  }, 30);
}

function checkAnswers(gs) {
  for (let i = 0; i < gs.length; i++) {
    for (let j = 0; j < gs[i].answers.length; j++) {
      if (gs[i].answers[j] === correctAnswer[j]) {
        gs[i].point += 10;
      }
    }
  }
}

function sortAnswersByPoints() {
  genes.sort((a, b) => b.point - a.point);
}

function crossOver() {
  let index = Math.floor(Math.random() * correctAnswer.length);
  let tmpA = genes[0].answers.slice(0, index);
  let tmpB = genes[1].answers.slice(0, index);
  let nextA = { answers: [...genes[0].answers], point: 0 };
  let nextB = { answers: [...genes[1].answers], point: 0 };
  nextA.answers.splice(0, tmpB.length, ...tmpB);
  nextB.answers.splice(0, tmpA.length, ...tmpA);

  let mutateA = Math.floor(Math.random() * correctAnswer.length);
  let mutateB = Math.floor(Math.random() * correctAnswer.length);
  nextA.answers[mutateA] = (nextA.answers[mutateA] + 1) % 2;
  nextB.answers[mutateB] = (nextB.answers[mutateB] + 1) % 2;
  checkAnswers([nextA, nextB]);

  genes.splice(-2, 2);
  genes.unshift(nextA, nextB);
  sortAnswersByPoints();
}

start();