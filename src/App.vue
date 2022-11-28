<template>
    <div class="app" v-bind:style="`background: ${ colorPokemon };`">
        <template v-if="!loadding && pokemon.getCurrentPokemon">
            <BulletComponent 
                v-bind:count="10" 
                v-bind:min="0"
                v-bind:bulletActivate="bulletActivatePokemon"
                v-on:next="handleNextPokemon" 
                v-on:back="handleBackPokemon" />
    
            <HeaderComponent 
				v-bind:id="pokemon.getCurrentPokemon.id" 
				v-bind:pokemonName="pokemon.getCurrentPokemon.name" />
            <MainComponent />
        </template>

        <template v-else>
            <p class="loading">loadding...</p>
        </template>
    </div>
</template>

<script setup lang="ts">

import { onMounted, computed } from "vue"
import { storeToRefs } from "pinia"

import HeaderComponent from "./components/Header.vue"
import MainComponent from "./components/Main.vue"
import BulletComponent from "./components/Bullets.vue"

import { usePokemonStore } from "./store/pokemon"

interface colorsType {
	[key: string]: string
}

const colors: colorsType = {
    bug: "#caef8b",
    dark: "#888097",
    dragon: "#7cbcf5",
    electric: "#ffed9c",
    fire: "#ffbe8e",
    flying: "#c1d2ef",
    ghost: "#abbbed",
    grass: "#a5f39d",
    ground: "#fbb692",
    ice: "#a9f5e9",
    normal: "#dfdfdf",
    poison: "#d79aeb",
    psychic: "#ffbabe",
    rock: "#f5eac8",
    steel: "#9bcfe3",
    water: "#9fc9f7",
    fairy: "#f9cbf6"
}

const { loadding, current } = storeToRefs(usePokemonStore())
const { getPokemons, nextPokemon, backPokemon } = usePokemonStore()
const pokemon = usePokemonStore()

onMounted(async () => {
    await getPokemons()
})

const colorPokemon = computed(() => {
    const index = pokemon.getCurrentPokemon?.types[0]
    return index ? colors[index] : '#fff'
})

const bulletActivatePokemon = computed(() => (current.value - 1) % 10)

async function handleNextPokemon() {
    await nextPokemon()
}

async function handleBackPokemon() {
    await backPokemon()
}

</script>

<style>

.app {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loading {
    font-size: 3.6rem;
    font-weight: bold;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    color: rgb(156, 156, 156);
}

</style>