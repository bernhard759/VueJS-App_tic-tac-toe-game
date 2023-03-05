<script setup>
// Imports
import { ref } from "vue"; // reactive state

// Data
let square = ref([]); // Init square state as empty array
for (let i = 0; i < 9; i++) {
  square.value.push("");
};
let gameOver = ref(false);
let gameMsg = ref(false);

// Variables
const TURNS = { "X": "X", "O": "O" };
let currentTurn = TURNS.X; // X starts
let winner;

// Functions
function clickedSquare(n) {
  //console.log(n)
  if (square.value[n-1] !== "") return;
  square.value[n-1] = currentTurn;
  // Do we have a winner?
  isWinner(square.value);
  if (gameOver.value) return;
  // Is the game a draw?
  isDraw(square.value);
  // Switch turns
  currentTurn =
    TURNS[Object.keys(TURNS).find((key) => TURNS[key] !== currentTurn)];
  //console.log(currentTurn);
}

// Check for a winner
function isWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  possibleLines.forEach((line) => {
    const [a, b, c] = line;
    if (
      squares[a] !== "" &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      //console.log(a, squares[a], b, squares[b], c, squares[c])
      winner = Object.keys(TURNS).find((key) => TURNS[key] === currentTurn);
      //console.log("winner", winner);
      gameOver.value = true;
      gameMsg.value = true;
      setTimeout(() => gameMsg.value = false, 2000)
    }
  });
}

// Do we have a draw?
function isDraw(squares) {
  console.log(squares);
  let draw = squares.filter(s => s === "").length === 0;
  gameOver.value = draw;
  if (draw) {
    gameMsg.value = true;
    setTimeout(() => gameMsg.value = false, 2000);
  }
}

// We start the game
function startGame() {
  gameOver.value = false;
  gameMsg.value = false;
  square.value = square.value.map((x) => ""); // Reset the square array
}
</script>

<template>
  <h1>Tic tac toe game</h1>
  <p class="subheader">Built with VueJS</p>
  <!-- Board -->
  <div v-if="!gameOver" id="board">
    <!-- Squares -->
    <div class="square" v-for="n in 9" v-bind:key="n" @click="clickedSquare(n)">
      <!-- SVG icons -->
      <ph-x v-if="square[n-1] === 'X'" :size='32' color='white' />
      <ph-circle v-if="square[n-1] === 'O'" :size='32' color='white' />
    </div>
  </div>
  <!-- Gameover div -->
  <div v-if="gameOver" class="gameover">
    <h2 v-if="winner">{{ winner }} is the Winner</h2>
    <h2 v-if="!winner">The game is a draw!</h2>
    <button @click="startGame()">Play a new game</button>
  </div>
  <Transition name="bounce">
    <div v-if="gameMsg" class="bounce-message">
      <p v-if="winner">{{ winner }} is the Winner</p>
      <p v-if="!winner">The game is a draw!</p>
    </div>
  </Transition>
</template>


<style scoped>
#board {
  width: 50vmin;
  aspect-ratio: 1;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.subheader {
  font-size: 1.25rem;
  margin-bottom: 1em;
}

.gameover {
  height: 50vmin;
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  grid-template-rows: 50% 50%;
  justify-content: center;
  align-items: center;
}

.gameover button {
  border: none;
  padding: 12px 16px;
  color: white;
  background: steelblue;
  cursor: pointer;
}

.gameover button:hover {
  background: hsl(207, 44%, 39%);
}

.square {
  background-color: steelblue;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}

.bounce-message {
  position: absolute;
  top: 1%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: var(--bg-color2);
  color: var(--color2);
  font-weight: bold;
}
</style>
