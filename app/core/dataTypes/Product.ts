export interface ProductInterface {
    image: string
    title: string
    description: string
    price: number
}

export class Product implements ProductInterface {
    image: string
    title: string
    description: string
    price: number
    
    constructor(image: string, title: string, description: string, price: number) {
        this.image = image
        this.title = title
        this.description = description
        this.price = price
    }
}