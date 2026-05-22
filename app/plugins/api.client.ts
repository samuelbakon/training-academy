export default defineNuxtPlugin(() => {
  const { addNotification } = useNotifications

  const detectTag = (url: string): string | undefined => {
    if (url.includes('products')) return 'products'
    return undefined
  }

  const api = $fetch.create({
    baseURL: 'http://localhost:3001',
    ignoreResponseError: true,
    onRequest({ options }) {
      const token = useCookie('auth-token').value
      if (token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token}`)
        options.headers = headers
      }
    },
    onResponse({ response, request }) {
      const tag = detectTag(request.toString())

      if (response.status === 401) {
        navigateTo('/login')
      } else {
        addNotification(response.status, tag)
      }
    }
  })
  return { provide: { api } }
})