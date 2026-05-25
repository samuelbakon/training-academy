export default defineNuxtRouteMiddleware(async (to, from) => {
  const now = new Date()
  const minutes = now.getMinutes()

  // Allow access only during odd minutes (1, 3, 5, etc.)
  if (minutes % 2 !== 0) {
    return navigateTo('/?to=' + encodeURIComponent(to.path)+'&from='+encodeURIComponent(from.path))
  }

  // Continue to the requested page during odd minutes
})