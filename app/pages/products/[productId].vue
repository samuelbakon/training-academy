<template>
  <div>
    <ProductDetail :product="product" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductDetail from '~/components/ProductDetail.vue'
import { Product } from '~/core/dataTypes/Product'

const route = useRoute()
const product = ref(new Product(0, '', '', '', 0))

const products = [
        new Product(
            1,
            'https://picsum.photos/seed/product1/300/200.jpg',
            'Product Title 1',
            'This is a brief description of the first product, highlighting its key features.',
            19.99
        ),
        new Product(
            2,
            'https://picsum.photos/seed/product2/300/200.jpg',
            'Product Title 2',
            'This is a brief description of the second product, explaining what makes it special.',
            29.99
        ),
        new Product(
            3,
            'https://picsum.photos/seed/product3/300/200.jpg',
            'Product Title 3',
            'This is a brief description of the third product, focusing on its benefits to the user.',
            39.99
        )
    ]

onMounted(() => {
    product.value = products.find(p => p.id === parseInt(route.params.productId))
})
</script>
