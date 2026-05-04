<template>
    <div class="product-card">
        <img :src="product.image" :alt="product.title">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <div class="price">{{ product.price }} FCFA</div>
        <NuxtLink :to="`/products/${product.id}`">Voir plus</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { Product } from '~/core/dataTypes/Product';
    defineProps({
        product: {
            type: Product,
            required: true
        }
    })
</script>

<style>
.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    width: 30%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.product-card img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

.product-card h3 {
    margin: 0.5rem 0;
}

.product-card .price {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
}
</style>