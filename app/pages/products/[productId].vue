<template>
    <div>
        <h1>Total des produits {{ total }}</h1>
        <input type="text" v-model="productId">
        <ProductDetail :product="product" />
    </div>
</template>

<script setup lang="ts">
    import ProductDetail from '~/components/ProductDetail.vue'
    import { useProductMeta } from '#imports'
    import useProductState from '~/states/useProductState'
    import type { Product } from '~/core/dataTypes/Product'

    const route = useRoute()
    const { product, productId, getProduct } = useProductState
    const { setupProductMeta } = useProductMeta()

    const products = useState('products');

    const total = computed(() => {
        if (!products.value) return 0;
        return (products.value as Product[]).length || 0;
    });

    onMounted(async () => {
        productId.value = parseInt(route.params.productId as string)
        
        await getProduct()

        if(product.value.id){
            setupProductMeta()
        }else{
            // navigateTo('/e/404')
        }

        
        // await useFetch(`http://localhost:3001/products-api/all.json`, {
        //     onResponse: ({ response }: any) => {
        //         product.value = new Product(response.data.value)
        //     }
        // })
    })


// watch(productId, async (newId) => {
//     if (newId) {
//         await getProduct()
//         if (product.value.id) {
//             setupProductMeta()
//         }
//     }
// })


// definePageMeta({
//     middleware: () => {
//         const token = useCookie('auth_token')
//         if (!token.value) return false
        
//         try {
//             const decoded = JSON.parse(atob(token.value!.split('.')[1]!))
//             const now = Math.floor(Date.now() / 1000)
            
//             if (decoded.exp && decoded.exp < now) return false
//             if (decoded.maxAge && decoded.maxAge < now) return false
            
//             return true
//         } catch (e) {
//             console.error('Token validation error:', e)
//             return false
//         }
//     }
// })
</script>
