<template>
  <div>
    <h1>Total des produits {{ total }}</h1>
    <ProductCardList />
  </div>
</template>

<script setup>
import ProductCardList from '~/components/ProductCardList.vue';

const products = useState('products');

const total = computed(() => products.value?.length || 0);

onMounted(() => {

});
</script>
