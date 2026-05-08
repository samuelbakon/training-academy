<template>
    <div>
        <ProductDetail :product="product" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import ProductDetail from '~/components/ProductDetail.vue'
    import { Product } from '~/core/dataTypes/Product'
    import useProduct from '~/composables/useProduct'

    const route = useRoute()
    const { product, products, productId, getProducts, getProduct } = useProduct
    
    onMounted(async () => {
        productId.value = parseInt(route.params.productId as string)
        
        // await getProducts()
        await getProduct(productId.value)
        
        // if(products.length){
        //     product.value = products.find(p => p.id === parseInt(route.params.productId as string)) || product.value
        // }
    })

</script>
