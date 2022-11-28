<template>
    <main class="pokemon" v-if="pokemon.getCurrentPokemon">
        <div class="pokemon-informations">
            <TypesComponent class="desktop-hidden" v-bind:types="pokemon.getCurrentPokemon.types" />

            <img 
                class="pokemon-image"
                v-bind:src="pokemon.getCurrentPokemon.spriteUrl" 
                alt="umbreon"
                v-bind:class="{ 'view-stats' : activateIndexTab != 0 }"/>

            <div class="right-container">
                <TypesComponent class="desktop-show" v-bind:types="pokemon.getCurrentPokemon.types" />

                <Transition>
                    <StatusComponent 
						v-show="activateIndexTab == 1" 
						v-bind:stats="pokemon.getCurrentPokemon.stats" class="show" />
                </Transition>
            </div>
        </div>


        <div class="bucket">
            <BulletComponent 
				v-bind:count="2" 
				v-bind:bulletActivate="activateIndexTab"
				v-bind:min="-1"
				v-on:change="update" />
        </div> 
    </main>
	
	<main v-else>
		<p class="message">Pokemon not found!</p>
	</main>
</template>

<script setup lang="ts">

import { ref } from "vue"

import StatusComponent from "./Status.vue"
import BulletComponent from "./Bullets.vue"
import TypesComponent from "./Types.vue"

import { usePokemonStore } from "../store/pokemon"

const activateIndexTab = ref(0)
const pokemon = usePokemonStore()

function update(value: number) {
    activateIndexTab.value = value;
}

</script>

<style scoped>


.pokemon {
    max-width: 660px;
    width: 100%;
}

.pokemon-informations {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.pokemon-image {
    max-width: 255px;
    width: 100%;
    transition: 400ms;
}

.bucket {
    width: 100%;
    height: 40px;

    position: absolute;
	bottom: 10px;

    display: flex;
    justify-content: center;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.button {
    width: 30px;
    height: 30px;
    font-size: 20px;
    margin: 0 10px;

    cursor: pointer;
    background: none;
    border: none;
}

.bullet { 
    width: 10px; 
    height: 10px;
    border-radius: 5px;
    background: rgb(172, 172, 172);
}

.activate {
    transform: scale(1.2);
    background: rgb(12, 198, 223);
}

.view-stats {
    width: 40%;
}

.right-container {
	flex: 1;
	padding: 0 10px;
}

.desktop-show {
    display: none;
}

.message {
	font-size: 3.6rem;
	font-weight: bold;
	font-family: Roboto, Arial, Helvetica, sans-serif;
	color: rgb(156, 156, 156);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


@media (min-width: 530px) {
    .bucket,
    .desktop-hidden {
        display: none;
    }

    .pokemon-informations {
        flex-direction: row;
        justify-content: space-between;
    }

    .desktop-show, 
    .show {
        display: flex !important;
    }

    .pokemon-image {
        max-width: 300px;
        width: 100%;
    }
}

</style>