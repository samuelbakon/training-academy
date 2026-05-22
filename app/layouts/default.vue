<template>
    <div>
        <Notification />
        <AppHeader :links="links" />
        <div class="content">
            <slot />
        </div>
        <AppFooter />
    </div>
</template>

<script setup>
    import AppFooter from '~/components/AppFooter​.vue';
    import Notification from '~/components/Notification.vue';
    import AppHeader from '~/components/AppHeader.vue';

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
            to: "/products",
            label: "Nos produits"
        },
        {
            to: "/contact",
            label: "Contacts"
        },
    ])

    useHead({
        link: [
            {
                rel: 'stylesheet',
                href: '/assets/css/main.css'
            }
        ],
        script: [
            {
                src: '/assets/js/bootstrap.js',
                defer: true
            }
        ]
    })
</script>