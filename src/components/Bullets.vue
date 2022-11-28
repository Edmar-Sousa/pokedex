<template>
    <div class="bullets-container">
        <div>
            <button 
                class="button"
                v-on:click="back"
				v-bind:disabled="bulletActivate == min">
                    <i class="fa-solid fa-angle-left"></i>
            </button>
        </div>

        <div class="flex">
            <div 
                v-for="b in count" 
                v-bind:key="b" 
                class="bullet" 
                v-bind:class="{ 'activate' : bulletActivate == b - 1 }">
            </div>
        </div>

        <div>
            <button 
                class="button"
                v-on:click="next">
                    <i class="fa-solid fa-angle-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, watch } from "vue";

const props = defineProps<{ 
	count: number, 
	bulletActivate: number,
	min: number }>()

const emit = defineEmits<{
    (event: 'change', value: number): void,
    (event: 'next'): void,
    (event: 'back'): void
}>()

const bulletActivate = ref(Number(props.bulletActivate))

watch(bulletActivate, (newValue, oldValue) => {
    bulletActivate.value = (Number(props.count) + newValue) % Number(props.count)
    emit('change', bulletActivate.value)
})


function next() {
    bulletActivate.value++
    emit('next')
}

function back() {
    bulletActivate.value--
    emit('back')
}

</script>

<style scoped>

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

.bullets-container {
    display: flex;
	align-items: center;
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

</style>