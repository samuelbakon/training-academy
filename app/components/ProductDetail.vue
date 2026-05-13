<template>
  <div class="product-detail">

    <h1>You are on product {{ productId }}</h1>

    <img :src="product.image" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <span>{{ product.description }}</span>
    <div class="price">{{ product.price }} FCFA</div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/core/dataTypes/Product';
import useProductState from '~/states/useProductState';

  const { productId } = useProductState
  
  defineProps({
    product: {
      type: Product,
      required: true
    }
  });

  onMounted(() => {
    console.log('ProductDetail mounted', productId.value);
  });
  
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
