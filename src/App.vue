<script setup>
// Import
import Board from './components/Board.vue';
</script>

<template>
  <h1>Tic tac toe game</h1>
  <p class="subheader">Built with VueJS</p>
  <!-- Board -->
  <Board></Board>
</template>


<style scoped>
.subheader {
  font-size: 1.25rem;
  margin-bottom: 1em;
}
</style>
