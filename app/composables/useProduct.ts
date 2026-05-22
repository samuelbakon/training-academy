import { Product } from "~/core/dataTypes/Product"
import useApi from "./useApi"

const useProduct = () => {

    const product = ref(new Product({
        id: 0,
        image: '',
        title: '',
        description: '',
        price: 0
    }))

    const { api } = useApi()

    const productId = ref(0)
    const products = ref([] as Product[])

    const getProducts = async () => {
        
        const $api = await api()
        const response = await $api('products-api/all.json')

        console.log(response)

        products.value = response as Product[]
    }

    const getProduct = async () => {

        try {
            const $api = await api()
            const response : any = await $api(`products-api/${productId.value}.json`)
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
