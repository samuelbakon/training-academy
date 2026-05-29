<template>
  <section class="py-24 bg-surface px-margin-mobile md:px-margin-desktop dark:bg-surface" id="formulaire">
    <div
      class="max-w-[900px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-outline-variant dark:bg-surface-container-high dark:border-outline-variant">
      <div class="grid md:grid-cols-[1fr_2fr]">
        <div
          class="bg-primary p-12 text-on-primary flex flex-col justify-between relative overflow-hidden dark:bg-primary-container dark:text-on-primary-container">
          <div class="relative z-10">
            <h3 class="font-headline-md text-headline-md mb-6">{{ formTitle }}</h3>
            <p class="text-on-primary-container opacity-90 leading-relaxed dark:text-on-primary-container">
              {{ formDescription }}
            </p>
          </div>
          <div class="mt-12 space-y-6 relative z-10">
            <div v-for="feature in features" :key="feature.icon" class="flex items-center gap-4">
              <FMIcon :icon="feature.icon" />
              <span class="text-label-sm font-label-sm">{{ feature.label }}</span>
            </div>
          </div>
          <div
            class="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-5 rounded-full dark:bg-on-primary-container dark:opacity-10">
          </div>
        </div>

        <div class="p-12">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="grid md:grid-cols-2 gap-6">
              <FMSelect id="country" label="Pays" v-model="form.country" :options="countryOptions"
                :error="errors.country" required />
              <FMInput id="city" label="Ville" v-model="form.city" placeholder="Ex: Douala" :error="errors.city"
                required />
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <FMInput id="neighborhood" label="Quartier" v-model="form.neighborhood" placeholder="Ex: Akwa"
                :error="errors.neighborhood" required />
              <FMInput id="street" label="Rue" v-model="form.street" placeholder="Nom de la rue" :error="errors.street"
                required />
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <FMInput id="houseNumber" label="Numéro de domicile" v-model="form.houseNumber" placeholder="Ex: 42B"
                :error="errors.houseNumber" required />
              <FMInput id="postalCode" label="Code postal (optionnel)" v-model="form.postalCode" placeholder="0000" />
            </div>

            <div class="bg-surface-container-high rounded-xl p-6 space-y-4 dark:bg-surface-container">
              <div class="flex justify-between items-center">
                <span class="font-label-sm text-label-sm flex items-center gap-2">
                  <FMIcon icon="uil:map-marker" />
                  GPS Position
                </span>
                <FMButton variant="outline" size="sm" label="Détecter ma position" icon="uil:location-point"
                  :loading="geolocationLoading" @click="handleDetectPosition" />
              </div>
              <div v-if="form.gpsPosition"
                class="flex items-center gap-3 text-secondary font-label-sm bg-secondary-container/30 p-3 rounded-lg border border-secondary/20 dark:bg-secondary-container/30 dark:border-secondary/20">
                <FMIcon icon="uil:check-circle" />
                Position détectée : {{ formattedPosition }}
              </div>
              <p v-else-if="errors.gpsPosition" class="text-error text-sm font-label-sm">
                {{ errors.gpsPosition }}
              </p>
            </div>

            <FMFileUpload label="Photo du bâtiment" v-model="form.buildingPhoto" accept="image/*" />

            <FMButton variant="primary" size="lg" label="Enregistrer mon adresse" type="submit" :loading="isSubmitting"
              full-width class="mt-8" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  /*
   * FMAddressForm - Formulaire d'adressage complet
   * 
   * Ce composant fournit le formulaire d'adressage avec géolocalisation.
   * Utilise les composables useGeolocation et useAddressForm pour la logique.
   * Supporte le mode sombre et la validation des champs.
   * 
   * Props principales :
   * - formTitle: Titre du formulaire
   * - formDescription: Description du formulaire
   * - features: Liste des fonctionnalités affichées (icon, label)
   * 
   * Events :
   * - submit: Émis lors de la soumission du formulaire avec les données
   * 
   * Fonctionnalités :
   * - Géolocalisation GPS intégrée
   * - Upload de photo du bâtiment
   * - Validation des champs
   * - Affichage des erreurs
   */
  import { ref, computed, watch } from 'vue'
  import { useGeolocation } from '../../composables/findme/useGeolocation'
  import { useAddressForm } from '../../composables/findme/useAddressForm'
  import FMButton from './FMButton.vue'
  import FMInput from './FMInput.vue'
  import FMSelect from './FMSelect.vue'
  import FMFileUpload from './FMFileUpload.vue'
  import FMIcon from './FMIcon.vue'

  interface Feature {
    icon: string
    label: string
  }

  interface Props {
    formTitle?: string
    formDescription?: string
    features?: Feature[]
  }

  const props = withDefaults(defineProps<Props>(), {
    formTitle: 'Formulaire d\'Adressage',
    formDescription: 'Contribuez à la modernisation urbaine en identifiant formellement votre emplacement.',
    features: () => [
      { icon: 'uil:shield-check', label: 'Données Sécurisées' },
      { icon: 'uil:globe', label: 'Standards Internationaux' },
    ],
  })

  const emit = defineEmits<{
    submit: [data: any]
  }>()

  const { position, loading: geolocationLoading, getCurrentPosition, formatPosition } = useGeolocation()
  const { form, errors, isSubmitting, submitForm, setGpsPosition } = useAddressForm()

  const countryOptions = [
    { value: 'cameroun', label: 'Cameroun' },
    { value: 'cote-divoire', label: 'Côte d\'Ivoire' },
    { value: 'senegal', label: 'Sénégal' },
  ]

  const formattedPosition = computed(() => {
    if (position.value) {
      return formatPosition(position.value)
    }
    return ''
  })

  const handleDetectPosition = () => {
    getCurrentPosition()
    if (position.value) {
      setGpsPosition(position.value)
    }
  }

  const handleSubmit = async () => {
    if (position.value) {
      setGpsPosition(position.value)
    }
    const success = await submitForm()
    if (success) {
      emit('submit', form.value)
    }
  }

  watch(position, (newValue: any) => {
    if (newValue) {
      setGpsPosition(newValue)
    }
  })
</script>
