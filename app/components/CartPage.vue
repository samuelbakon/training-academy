<template>
    <div class="cart-page">
        <div class="cart-page-header">
            <h1>Your Cart</h1>
            <button @click="emptyCart" class="btn-empty">Empty Cart</button>
        </div>

        <div v-if="items.length === 0" class="cart-page-empty">
            <p>Your cart is empty</p>
            <NuxtLink to="/" class="btn-continue">Continue Shopping</NuxtLink>
        </div>

        <div v-else class="cart-page-content">
            <div class="cart-items-list">
                <CartItem v-for="item in items" :key="item.product.id" :item="item" />
            </div>

            <div class="cart-page-summary">
                <div class="summary-card">
                    <h2>Order Summary</h2>
                    <div class="summary-row">
                        <span>Subtotal ({{ totalItems }} items)</span>
                        <span>{{ total.toFixed(2) }} €</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span class="total-amount">{{ total.toFixed(2) }} €</span>
                    </div>
                    <NuxtLink to="/cart" class="btn-checkout">Proceed to Checkout</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import useCart from "~/composables/useCart"

    const { items, empty, total } = useCart

    const totalItems = computed(() => {
        return items.value.reduce((sum, item) => sum + item.quantity, 0)
    })

    const emptyCart = () => {
        empty()
    }
</script>

<style scoped>
    .cart-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .cart-page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #e0e0e0;
    }

    .cart-page-header h1 {
        margin: 0;
        font-size: 2rem;
        color: #333;
    }

    .btn-empty {
        background-color: #ff4444;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: background-color 0.3s;
    }

    .btn-empty:hover {
        background-color: #cc0000;
    }

    .cart-page-empty {
        text-align: center;
        padding: 4rem 2rem;
        color: #666;
    }

    .cart-page-empty p {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    .btn-continue {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 0.75rem 2rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: 600;
        transition: background-color 0.3s;
    }

    .btn-continue:hover {
        background-color: #0056b3;
    }

    .cart-page-content {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 2rem;
    }

    .cart-items-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .cart-page-summary {
        position: sticky;
        top: 2rem;
        height: fit-content;
    }

    .summary-card {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
    }

    .summary-card h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        color: #333;
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #e0e0e0;
    }

    .summary-row:last-child {
        border-bottom: none;
    }

    .summary-row.total {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid #e0e0e0;
        border-bottom: none;
    }

    .total-amount {
        color: #007bff;
    }

    .btn-checkout {
        display: block;
        width: 100%;
        background-color: #007bff;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        text-align: center;
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 1.5rem;
        transition: background-color 0.3s;
    }

    .btn-checkout:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        .cart-page {
            padding: 1rem;
        }

        .cart-page-content {
            grid-template-columns: 1fr;
        }

        .cart-page-summary {
            position: static;
        }

        .cart-page-header h1 {
            font-size: 1.5rem;
        }
    }
</style>
