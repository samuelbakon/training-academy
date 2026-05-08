<template>
    <div>
        <HeroBanner />
        <ProductCardList />

        <TaskListRow />
    </div>
</template>

<script setup>
    import HeroBanner from '~/components/HeroBanner​.vue';

    const nom = ref("Samuel");

    definePageMeta({
        layout: 'default'
    });

    defineProps({
        couleur: 'red'
    })
</script>

<style scoped>


</style>