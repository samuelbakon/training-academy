<template>
  <div class="product-detail">

    <h1>You are on product {{ productId }}</h1>

    <img :src="product.image" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <div class="price">{{ product.price }} FCFA</div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/core/dataTypes/Product';

  const { productId } = useProduct
  const { setupProductMeta } = useProductMeta()
  
  defineProps({
    product: {
      type: Product,
      required: true
    }
  });

  setupProductMeta()
  
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
}

.product-detail img {
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-detail h2 {
  margin: 0;
}

.product-detail .price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}
</style>
