<script setup>
// Props
defineProps(["gameMsg", "winner"]);
</script>

<template>
    <Transition name="bounce">
        <div v-if="gameMsg" class="messagebox" @click="$emit('msgclicked')">
            <p v-if="winner">{{ winner }} is the Winner</p>
            <p v-if="!winner">The game is a draw!</p>
        </div>
    </Transition>
</template>

<style scoped>
.messagebox {
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
    cursor: pointer;
}
</style>