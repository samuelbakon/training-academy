import useProductState from "../states/useProductState"

const { product, productId } = useProductState

const useProductMeta = () => {
    const meta = computed(() => ({
        title: product.value.title,
        description: product.value.description,
        author: 'Equipe Digitale',
        ogTitle: product.value.title,
        ogDescription: product.value.description,
        ogImage: product.value.image,
        ogUrl: `https://mon-site.cm/produits/${productId}`,
        ogType: 'website',
        ogSiteName: 'Ma Boutique Tech',
        ogLocale: 'fr_FR',
        twitterCard: 'summary_large_image',
        twitterTitle: product.value.title,
        twitterDescription: product.value.description,
        twitterImage: product.value.image,
        twitterSite: '@MaBoutiqueTech',
        robots: 'index, follow',
    }))

    const setupProductMeta = () => {
        useSeoMeta(meta.value as any)
    }

    return {
        setupProductMeta
    }
}

export default useProductMeta