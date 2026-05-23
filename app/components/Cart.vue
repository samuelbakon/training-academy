<template>
    <div class="cart-container">
        <div class="cart-header">
            <h2>Your Cart</h2>
            <button @click="emptyCart" class="btn-empty">Empty Cart</button>
        </div>

        <div v-if="items.length === 0" class="cart-empty">
            <p>Your cart is empty</p>
        </div>

        <div v-else class="cart-items">
            <CartItem v-for="item in items" :key="item.product.id" :item="item" />
        </div>

        <div v-if="items.length > 0" class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span class="total-amount">{{ total.toFixed(2) }} €</span>
            </div>
            <div class="cart-actions">
                <NuxtLink to="/cart" class="btn-view-cart">See my cart</NuxtLink>
                <NuxtLink to="/cart" class="btn-checkout">Checkout</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useCart from "~/composables/useCart"

    const { items, empty, total } = useCart

    const emptyCart = () => {
        empty()
    }
</script>

<style scoped>
    .cart-container {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .cart-header h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
    }

    .btn-empty {
        background-color: #ff4444;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .btn-empty:hover {
        background-color: #cc0000;
    }

    .cart-empty {
        text-align: center;
        padding: 2rem;
        color: #666;
    }

    .cart-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }


    .cart-footer {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e0e0e0;
    }

    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .cart-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 22px;
    }

    .total-amount {
        color: #007bff;
    }

    .btn-view-cart {
        display: block;
        width: 100%;
        background-color: #6c757d;
        color: white;
        padding: 0.75rem;
        border-radius: 4px;
        text-align: center;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 600;
        transition: background-color 0.3s;
        margin-bottom: 0.5rem;
    }

    .btn-view-cart:hover {
        background-color: #5a6268;
    }

    .btn-checkout {
        width: 100%;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: background-color 0.3s;
    }

    .btn-checkout:hover {
        background-color: #0056b3;
    }
</style>