let randomWords = [
  "JavaScript",
  "Java",
  "Python",
  "C++",
  "C",
  "TypeScript",
  "Go",
  "Rust",
  "Swift",
  "PHP",
  "Ruby",
  "Kotlin",
  "React",
  "Angular",
  "Vue",
  "Node",
  "Express",
  "Django",
  "Flask",
  "Spring",
  "Laravel",
  "CodeIgniter",
  "Yii",
  "CakePHP",
  "Zend",
  "Perl",
  "Tcl",
  "Haskell",
  "Lisp",
  "Erlang",
];
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
const selectLvls = document.querySelector("select[name=levels]");
const time = document.querySelector(".time");
const startGame = document.querySelector(".start");
const mainRandomWord = document.querySelector(".randomWord");
const input = document.querySelector("input");
const reloadButton = document.querySelector(".input i");
const words = document.querySelector(".words");
const detailTime = document.querySelector(".detail-time span");
const score = document.querySelector(".score span:nth-child(1)");
const totalWords = document.querySelector(".score span:nth-child(2)");
const gameOver = document.querySelector(".game-over");
const excellent = document.querySelector(".excellent");

time.textContent = lvls[selectLvls.value];
detailTime.textContent = lvls[selectLvls.value];
totalWords.textContent = randomWords.length;
selectLvls.addEventListener("change", () => {
  time.textContent = lvls[selectLvls.value];
  detailTime.textContent = lvls[selectLvls.value];
});
input.onpaste = () => false;
reloadButton.addEventListener("click", () => window.location.reload());
startGame.addEventListener("click", () => {
  startGame.style.display = "none";
  input.focus();
  input.value = "";
  selectLvls.disabled = true;
  detailTime.textContent = lvls[selectLvls.value] + 2;
  generateRandomWord();
});
function generateRandomWord() {
  const randomWord =
    randomWords[Math.trunc(Math.random() * randomWords.length)];
  const indexRandomWord = randomWords.indexOf(randomWord);
  randomWords.splice(indexRandomWord, 1);
  mainRandomWord.textContent = randomWord;
  words.innerHTML = "";
  randomWords.forEach((e) => {
    let div = document.createElement("div");
    div.textContent = e;
    words.appendChild(div);
  });
  timing();
}
function timing() {
  const startTime = setInterval(() => {
    detailTime.textContent--;
    if (detailTime.textContent == 0) {
      clearInterval(startTime);
      if (
        input.value.toLowerCase() == mainRandomWord.textContent.toLowerCase()
      ) {
        input.value = "";
        detailTime.textContent = lvls[selectLvls.value];
        score.textContent++;
        if (randomWords.length > 0) {
          generateRandomWord();
        } else {
          excellent.style.display = "block";
          mainRandomWord.style.display = "none";
          words.style.display = "none";
          input.value = "";
          input.disabled = true;
          detailTime.textContent = 0;
        }
      } else {
        input.blur();
        input.disabled = true;
        gameOver.style.display = "block";
      }
    }
  }, 1000);
}
