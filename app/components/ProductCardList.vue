<template>
    <div class="product-list">
        <ProductCard v-for="product in products" :key="product.title" :product="product" />
    </div>
</template>

<script setup lang="ts">
    import { Product } from '~/core/dataTypes/Product';


    const products = [
        new Product(
            'https://picsum.photos/seed/product1/300/200.jpg',
            'Product Title 1',
            'This is a brief description of the first product, highlighting its key features.',
            19.99
        ),
        new Product(
            'https://picsum.photos/seed/product2/300/200.jpg',
            'Product Title 2',
            'This is a brief description of the second product, explaining what makes it special.',
            29.99
        ),
        new Product(
            'https://picsum.photos/seed/product3/300/200.jpg',
            'Product Title 3',
            'This is a brief description of the third product, focusing on its benefits to the user.',
            39.99
        )
    ]
</script>

<style>
    .product-list {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        padding: 2rem 0;
    }
</style>