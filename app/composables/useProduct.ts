import { Product } from "~/core/dataTypes/Product"

const useProduct = () => {
    
    const product = ref(new Product({
        id: 0,
        image: '',
        title: '',
        description: '',
        price: 0
    }))

    const productId = ref(0)
    const products = ref([] as Product[])

    const getProducts = async () => {
        const response = await $fetch('http://localhost:3001/products-api/all.json')

        console.log(response)

        products.value = response as Product[]
    }

    const getProduct = async () => {
        
        try {
            const response : any = await $fetch(`http://localhost:3001/products-api/${productId.value}.json`)
            product.value = new Product(response)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        product,
        products,
        productId,
        getProducts,
        getProduct
    }
}

export default useProduct
