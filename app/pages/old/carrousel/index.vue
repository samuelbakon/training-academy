<template>
    <div class="carrousel-box">​
        <h1>Carousel Home</h1>
    </div>
</template>

<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    
    onBeforeMount(() => {
        setTimeout(() => {
            console.log('Carousel Home');
        }, 10000);
    });
</script>

<style>

</style>