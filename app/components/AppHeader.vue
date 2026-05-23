<template>
    <header class="modern-nav">
        <div class="menu-amburger-box">
            <button class="menu-amburger" @click="toggleShow">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="nav-box" :class="isShow ? 'show' : ''">
            <nav>
                <NuxtImg :src="logo" alt="Logo" width="60" />
                <ul>
                    <li v-for="link in links" :key="link.to">
                        <NuxtLink :to="link.to" class="nav-link">{{ link.label }}</NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="cart-icon-box">
                <button class="cart-icon-btn" @click="toggleCart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
                </button>
            </div>
        </div>
        <Teleport to="body">
            <div v-if="isCartOpen" class="cart-overlay" @click="toggleCart"></div>
            <div v-if="isCartOpen" class="cart-dropdown">
                <Cart />
            </div>
        </Teleport>
    </header>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import useCart from '~/composables/useCart'

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
    const isCartOpen = ref(false)
    const { items } = useCart

    const cartItemCount = computed(() => {
        return items.value.reduce((sum, item) => sum + item.quantity, 0)
    })

    function toggleShow() {
        isShow.value = !isShow.value
    }

    function toggleCart() {
        isCartOpen.value = !isCartOpen.value
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

    .menu-amburger-box {
        display: none;
    }

    .nav-box {
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

    .cart-icon-box {
        position: relative;
        border-radius: 4px;
        padding: 0.5rem;
    }

    .cart-icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: color 0.3s;
    }

    .cart-icon-btn:hover {
        color: #007bff;
    }

    .cart-badge {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #ff4444;
        color: white;
        font-size: 0.7rem;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 18px;
        text-align: center;
    }

    .cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1001;
    }

    .cart-dropdown {
        position: fixed;
        top: 60px;
        right: 2rem;
        z-index: 1002;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

        .cart-dropdown {
            right: 1rem;
            left: 1rem;
            top: 60px;
        }
    }
</style>