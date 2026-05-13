export interface ProductInterface {
    id: number
    image: string
    title: string
    description: string
    price: number
}

export class Product implements ProductInterface {
    id: number
    image: string
    title: string
    description: string
    price: number
    
    constructor(product: ProductInterface) {
        this.id = product?.id || 0
        this.image = product?.image || ''
        this.title = product?.title || ''
        this.description = product?.description || ''
        this.price = product?.price || 0
    }

    toJSON() {
        return {
            id: this.id,
            image: this.image,
            title: this.title,
            description: this.description,
            price: this.price
    }
}

}