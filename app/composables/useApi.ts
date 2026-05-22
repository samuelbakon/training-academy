
const useApi = () => {

    const api = async () => {
        const { $api } = useNuxtApp()
        return $api
    }

    return {
        api
    }
}

export default useApi
