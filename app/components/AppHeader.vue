<template>
    <header class="modern-nav">
        <div class="menu-amburger-box">
            <button class="menu-amburger" @click="toggleShow">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="nav-box" :class="isShow ? 'show': ''">
            <nav>
                <NuxtImg :src="logo" alt="Logo" width="60" />
                <ul>
                    <li v-for="link in links" :key="link.to">
                        <NuxtLink :to="link.to" class="nav-link">{{ link.label }}</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'



const props = defineProps({
    links: {
        type: Array as () => Array<{ to: string; label: string }>,
        default: [
            {
                to: "#",
                label: "Définissez votre navigation"
            }
        ]
    },
    logo: {
        type: String,
        default: '/logo.png'
    }
})

const isShow = ref(false)

function toggleShow(){
    isShow.value = !isShow.value
}

</script>

<style scoped>
.modern-nav {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    height: 60px;
    z-index: 1000;
}

nav {
    display: flex;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
}

.nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
    background-color: #f0f0f0;
    color: #007bff;
}

.menu-amburger-box{
    display: none;
}

.nav-box{
    display: flex;
    justify-content: center;
}

.menu-amburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
}

.menu-amburger span {
    width: 25px;
    height: 3px;
    background-color: #333;
    border-radius: 2px;
}

@media (max-width: 768px) {
    .menu-amburger-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .nav-box {
        display: none;
    }

    .nav-box.show {
        display: block;
        position: fixed;
        right: 12px;
        top: 60px;
        width: 200px;
        padding: 22px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    }

    .nav-box.show nav ul {
        flex-direction: column;
    }
}
</style>