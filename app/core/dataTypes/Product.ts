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
    
    constructor(id: number, image: string, title: string, description: string, price: number) {
        this.id = id
        this.image = image
        this.title = title
        this.description = description
        this.price = price
    }
}