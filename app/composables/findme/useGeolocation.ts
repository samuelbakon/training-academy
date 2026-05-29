import { ref, readonly } from 'vue'

export const useGeolocation = () => {
  const position = ref<{ latitude: number; longitude: number } | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      error.value = 'La géolocalisation n\'est pas supportée par votre navigateur'
      return
    }

    loading.value = true
    error.value = null

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        position.value = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
        loading.value = false
      },
      (err) => {
        error.value = getErrorMessage(err.code)
        loading.value = false
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const getErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return 'L\'accès à la géolocalisation a été refusé'
      case 2:
        return 'La position n\'a pas pu être déterminée'
      case 3:
        return 'Le délai de demande de position a expiré'
      default:
        return 'Une erreur inconnue est survenue'
    }
  }

  const formatPosition = (pos: { latitude: number; longitude: number }): string => {
    return `${pos.latitude.toFixed(4)}° N, ${pos.longitude.toFixed(4)}° E`
  }

  return {
    position: readonly(position),
    error: readonly(error),
    loading: readonly(loading),
    getCurrentPosition,
    formatPosition,
  }
}
