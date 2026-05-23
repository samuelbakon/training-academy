<template>
    <div class="add-to-cart-container">
        <div class="quantity-selector">
            <button @click="decrementQuantity" class="quantity-btn">-</button>
            <span class="quantity-input">{{ getQuantity(props.product.id) }}</span>
            <button @click="incrementQuantity" class="quantity-btn">+</button>
        </div>
        <button @click="addToCart" class="add-to-cart-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Add to Cart</span>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import useCart from "~/composables/useCart"
    import { Product } from "~/core/dataTypes/Product"

    interface AddToCartProps {
        product: Product
    }

    const props = defineProps<AddToCartProps>()
    const { add, getQuantity, remove } = useCart

    const incrementQuantity = () => {
        add(props.product, 1)
    }

    const decrementQuantity = () => {
        remove(props.product?.id)
    }

    const addToCart = () => {
        add(props.product, 1)
    }
</script>

<style scoped>
    .add-to-cart-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .quantity-selector {
        display: flex;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .quantity-btn {
        background: none;
        border: none;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background-color 0.3s;
    }

    .quantity-btn:hover {
        background-color: #f0f0f0;
    }

    .quantity-input {
        width: 50px;
        text-align: center;
        border: none;
        font-size: 1rem;
        padding: 0.5rem 0;
    }

    .quantity-input::-webkit-inner-spin-button,
    .quantity-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .quantity-input {
        -moz-appearance: textfield;
    }

    .add-to-cart-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: background-color 0.3s;
    }

    .add-to-cart-btn:hover {
        background-color: #0056b3;
    }
</style>
