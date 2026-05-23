<template>
    <div class="cart-item">
        <NuxtImg :src="item.product.image" :alt="item.product.title" width="80" height="80" class="item-image" />
        <div class="item-details">
            <h3>{{ item.product.title }}</h3>
            <p class="item-price">{{ item.product.price }} €</p>
            <div class="item-controls">
                <button @click="removeItem" class="btn-remove">-</button>
                <span class="item-quantity">{{ item.quantity }}</span>
                <button @click="addItem" class="btn-add">+</button>
            </div>
        </div>
        <div class="item-total">
            {{ (item.product.price * item.quantity).toFixed(2) }} €
        </div>
    </div>
</template>

<script setup lang="ts">
    import useCart from "~/composables/useCart"
    import { Product } from "~/core/dataTypes/Product"

    interface CartItemProps {
        item: {
            product: Product
            quantity: number
        }
    }

    const props = defineProps<CartItemProps>()
    const { add, remove } = useCart

    const addItem = () => {
        add(props.item.product)
    }

    const removeItem = () => {
        remove(props.item.product.id)
    }
</script>

<style scoped>
    .cart-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
    }

    .item-image {
        border-radius: 4px;
        object-fit: cover;
    }

    .item-details {
        flex: 1;
    }

    .item-details h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #333;
    }

    .item-price {
        margin: 0 0 0.5rem 0;
        color: #666;
        font-size: 0.9rem;
    }

    .item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .btn-remove,
    .btn-add {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
    }

    .btn-remove:hover,
    .btn-add:hover {
        background-color: #f0f0f0;
    }

    .item-quantity {
        font-weight: 600;
        min-width: 30px;
        text-align: center;
    }

    .item-total {
        font-weight: 600;
        color: #333;
        font-size: 1.1rem;
    }
</style>
