<template>
    <div>
        <AppHeader :links="links" />
        <div class="content">
            <slot />
        </div>
        <AppFooter />
    </div>
</template>

<script setup>
import AppFooter from '~/components/AppFooter​.vue';

const links = ref([
    {
        to: "/",
        label: "Accueil"
    },
    {
        to: "/about",
        label: "A propos"
    },
    {
        to: "/services",
        label: "Services"
    },
    {
        to: "/contact",
        label: "Contacts"
    },
])
</script>