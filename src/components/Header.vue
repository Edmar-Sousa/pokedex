<template>
    <header class="header">
        <p class="heaer-id">#{{ id }}</p>
        <h1 class="header-title">{{ pokemonName }}</h1>
    </header>
</template>

<script setup lang="ts">

defineProps<{ id: number, pokemonName: string }>();

</script>

<style scoped>

.header {
    max-width: 660px;
    width: 100%;
    padding: 20px;

    font-family: Roboto, Arial, Helvetica, sans-serif;
}

.heaer-id {
    font-size: 1.8rem;
    font-weight: bold;
}

.header-title {
    font-size: 3rem;
}

</style>