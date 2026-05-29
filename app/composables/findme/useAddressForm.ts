import { ref, readonly } from 'vue'

export const useAddressForm = () => {
  const form = ref({
    country: '',
    city: '',
    neighborhood: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    gpsPosition: null as { latitude: number; longitude: number } | null,
    buildingPhoto: null as File | null,
  })

  const errors = ref<Record<string, string>>({})
  const isSubmitting = ref(false)

  const validateForm = (): boolean => {
    errors.value = {}

    if (!form.value.country) {
      errors.value.country = 'Le pays est requis'
    }

    if (!form.value.city) {
      errors.value.city = 'La ville est requise'
    }

    if (!form.value.neighborhood) {
      errors.value.neighborhood = 'Le quartier est requis'
    }

    if (!form.value.street) {
      errors.value.street = 'La rue est requise'
    }

    if (!form.value.houseNumber) {
      errors.value.houseNumber = 'Le numéro de domicile est requis'
    }

    if (!form.value.gpsPosition) {
      errors.value.gpsPosition = 'La position GPS est requise'
    }

    return Object.keys(errors.value).length === 0
  }

  const submitForm = async () => {
    if (!validateForm()) {
      return false
    }

    isSubmitting.value = true

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', form.value)
      return true
    } catch (error) {
      console.error('Error submitting form:', error)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  const resetForm = () => {
    form.value = {
      country: '',
      city: '',
      neighborhood: '',
      street: '',
      houseNumber: '',
      postalCode: '',
      gpsPosition: null,
      buildingPhoto: null,
    }
    errors.value = {}
  }

  const setGpsPosition = (position: { latitude: number; longitude: number }) => {
    form.value.gpsPosition = position
    delete errors.value.gpsPosition
  }

  const setBuildingPhoto = (file: File) => {
    form.value.buildingPhoto = file
  }

  return {
    form: readonly(form),
    errors: readonly(errors),
    isSubmitting: readonly(isSubmitting),
    submitForm,
    resetForm,
    setGpsPosition,
    setBuildingPhoto,
  }
}
