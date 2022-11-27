<template>
    <div class="pokemon-type__container">
        <img 
            v-for="(type, i) in types" 
            v-bind:src="`/${type}.svg`" 
            v-bind:key="i"
            class="pokemon-type" />
    </div>
</template>

<script setup lang="ts">

defineProps<{ types: Array<string> }>()

</script>

<style scoped>

.pokemon-type__container {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.pokemon-type {
    transition: 400ms;
    width: 30px;
}

@media (min-width: 500px) {
    .pokemon-type {
        width: 40px;
    }
}

</style>