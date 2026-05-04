<template>
    <div>
        <h1>Counter {{ counter }}</h1>
        <button @click="incrementer()">Increment</button>
        <p>{{ user.name }} - {{ user.age }} ans</p>
        <button @click="user.age++">Age +1</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    let counter = ref(0 as number);
    const user = ref({
        name: 'Samy',
        age: 30,
    });
    
    function incrementer() {
        counter.value++;
    }
</script>

<style scoped>
    
</style>