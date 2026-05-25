import { Product } from "~/core/dataTypes/Product"

export interface CartItem {
    product: Product
    quantity: number
}

const enum BusinessErrorCode{
    INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
    PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
    INVALID_QUANTITY = 'INVALID_QUANTITY'
}

export interface BusinessErrors {
    code: BusinessErrorCode
    message: string
    field?: string
    // champ concerné
    metadata?: Record<string, any>
    suggestedAction?: string
    action: () => void
}

const useCart = () => {
    const items = ref<CartItem[]>([])
    const errors = ref<BusinessErrors[]>([])

    const validateCart = () : boolean => {
        errors.value = []
        
        items.value.forEach((item, index) => {
            if (!item.product || !item.product.id) {
                errors.value.push({
                    code: BusinessErrorCode.PRODUCT_NOT_FOUND,
                    message: `Product at position ${index + 1} is invalid or missing`,
                    field: `items[${index}].product`,
                    metadata: { itemIndex: index },
                    suggestedAction: 'Remove the invalid item from cart',
                    action: () => {
                        items.value.splice(index, 1)
                    }
                })
            }

            if (item.quantity <= 3) {
                errors.value.push({
                    code: BusinessErrorCode.INVALID_QUANTITY,
                    message: `Quantity for "${item.product.title}" must be greater than 3`,
                    field: `items[${index}].quantity`,
                    metadata: { productId: item.product.id, currentQuantity: item.quantity },
                    suggestedAction: 'Set quantity to 3',
                    action: () => {
                        item.quantity = 3
                        validateCart()
                    }
                })
            }

            if (item.quantity > 10) {
                errors.value.push({
                    code: BusinessErrorCode.INVALID_QUANTITY,
                    message: `Quantity for "${item.product.title}" exceeds maximum allowed (10)`,
                    field: `items[${index}].quantity`,
                    metadata: { productId: item.product.id, currentQuantity: item.quantity, maxAllowed: 10 },
                    suggestedAction: 'Reduce quantity to 10',
                    action: () => {
                        item.quantity = 10
                        validateCart()
                    }
                })
            }

            if (item.product.price <= 20) {
                errors.value.push({
                    code: BusinessErrorCode.INVALID_QUANTITY,
                    message: `Price for "${item.product.title}" is invalid`,
                    field: `items[${index}].product.price`,
                    metadata: { productId: item.product.id, currentPrice: item.product.price },
                    suggestedAction: 'Contact support about this product pricing',
                    action: () => {
                        items.value.splice(index, 1)
                    }
                })
            }
        })

        return errors.value.length === 0
    }

    const add = (product: Product, quantity: number = 1) => {
        const existingItem = items.value.find(item => item.product.id === product.id)
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            items.value.push({ product, quantity })
        }        
    }

    const remove = (productId: number) => {
        const index = items.value.findIndex(item => item.product.id === productId)
        if (index !== -1) {
            const item = items.value[index]!
            if (item.quantity > 1) {
                item.quantity--
            } else {
                items.value.splice(index, 1)
            }
        }
    }

    const empty = () => {
        items.value = []
    }

    const total = computed(() => {
        return items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    })

    const getQuantity = (productId: number) => {
        const item = items.value.find(item => item.product.id === productId)
        return item ? item.quantity : 0
    }

    return {
        items,
        errors,
        add,
        remove,
        empty,
        total,
        getQuantity,
        validateCart
    }
}

export default useCart()
