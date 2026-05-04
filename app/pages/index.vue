<template>
    <div>
        <HeroBanner />
        <ProductCardList />

        <TaskList />
    </div>
</template>

<script setup>
    import HeroBanner from '~/components/HeroBanner​.vue';

    const nom = ref("Samuel");

    definePageMeta({
        layout: 'default'
    });
</script>

<style scoped>


</style>