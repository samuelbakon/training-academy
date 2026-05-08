import { Product } from "~/core/dataTypes/Product"

const useProduct = () => {
    
    const product = ref(new Product(0, '', '', '', 0))

    const productId = ref(0)
    const products = ref([] as Product[])

    const getProducts = async () => {
        const response = await $fetch('http://localhost:3001/products-api/all.json')

        console.log(response)

        products.value = response as Product[]
    }

    const getProduct = async (id: number) => {
        const response : any = await $fetch(`http://localhost:3001/products-api/${id}.json`)

        console.log(response)

        product.value =  new Product(response?.id, response?.name, response?.description, response?.image, response?.price)
    }

    return {
        product,
        products,
        productId,
        getProducts,
        getProduct
    }
}

export default useProduct()
