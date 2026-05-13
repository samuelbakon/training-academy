<template>
    <div class="product-list">
        <ProductCard v-for="product in products" :key="product.title" :product="product" />
    </div>
</template>

<script setup lang="ts">
    import { Product } from '~/core/dataTypes/Product';

    const products = useState('products', () => [
        {
            id: 1,
            image: 'https://picsum.photos/seed/product1/300/200.jpg',
            title: 'Product Title 1',
            description: 'This is a brief description of the first product, highlighting its key features.',
            price: 19.99
        },
        {
            id: 2,
            image: 'https://picsum.photos/seed/product2/300/200.jpg',
            title: 'Product Title 2',
            description: 'This is a brief description of the second product, explaining what makes it special.',
            price: 29.99
        },
        {
            id: 3,
            image: 'https://picsum.photos/seed/product3/300/200.jpg',
            title: 'Product Title 3',
            description: 'This is a brief description of the third product, focusing on its benefits to the user.',
            price: 39.99
        }
    ] as Product[]);

</script>

<style>
    .product-list {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        padding: 2rem 0;
    }
</style>