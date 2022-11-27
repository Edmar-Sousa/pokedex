<template>
    <div class="pokemon-stats">
        <ul>
            <li v-for="(stat, i) in stats" v-bind:key="i">
                <span class="stats">
                    <i class="fa-solid" v-bind:class="iconsStats[i]"></i> {{ stat.name }}
                </span>
                <p>{{ stat.value }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

interface StatsProp {
    name: string
    value: number
}

defineProps<{
    stats: Array<StatsProp>,
}>()


const iconsStats = ['fa-heart', 'fa-arrow-up', 'fa-shield', 'fa-bolt', 'fa-bolt', 'fa-bolt']

</script>

<style scoped>

.pokemon-stats {
    width: 200px;
    margin: auto;
    font-size: 1.8rem;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-weight: bold;
}

.pokemon-stats ul {
    width: 90%;
    list-style: none;
}

.pokemon-stats ul li {
    display: flex;
    justify-content: space-between;
}

.stats i {
    width: 20px;
}

</style>