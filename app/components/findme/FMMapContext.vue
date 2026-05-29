<template>
  <section class="h-[500px] relative">
    <div class="absolute inset-0 bg-surface-container dark:bg-surface-container">
      <img :alt="imageAlt" :src="imageSrc"
        class="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent dark:from-surface dark:to-transparent">
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
      <div
        class="bg-white/90 backdrop-blur px-8 py-6 rounded-2xl shadow-2xl border border-primary/10 dark:bg-surface-container-high/90 dark:border-primary-fixed/10">
        <div
          class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4 animate-bounce dark:bg-primary-fixed dark:text-on-primary-fixed">
          <FMIcon icon="uil:map-marker" />
        </div>
        <h3 class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed">{{ title }}</h3>
        <p class="text-on-surface-variant dark:text-on-surface-variant">{{ subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  /*
   * FMMapContext - Section carte contextuelle
   * 
   * Ce composant affiche une section avec une image de carte en arrière-plan
   * et un panneau d'information superposé au centre.
   * Supporte le mode sombre et les effets de survol.
   * 
   * Props principales :
   * - title: Titre affiché dans le panneau
   * - subtitle: Sous-titre affiché dans le panneau
   * - imageSrc: URL de l'image de carte
   * - imageAlt: Texte alternatif de l'image
   * 
   * Effets visuels :
   * - Image en noir et blanc par défaut
   * - Transition vers couleur au survol
   * - Animation de rebond sur l'icône de localisation
   */
  import FMIcon from './FMIcon.vue'
  interface Props {
    title?: string
    subtitle?: string
    imageSrc?: string
    imageAlt?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Précision Institutionnelle',
    subtitle: 'Données validées par FindMe Systems',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR0ieq_wRvxefRzZO3hX4i2U-IsGLP0xZPhC9TXsM2ZWbqHZCvIofgQ6k_7HvRbo1tuaSVcHTFHZXEVNuxka4m-1deolcwbGUQ6YftBX5JcbihkSGHUwAv3wUzMSLmnyjId8X-VGNwSk1b40Z6Sc-0ysNA_mzMYjjoIibsNUhq-0E2RYFjLPLWX-62RCcfmVV6FFUkePxTOmMgSrRi0TKiTAge-xM005KSHVDuUf0M6oGoOJcXXX4SfjH_rXT1M7wU1yKLmafNT5Ye',
    imageAlt: 'Urban mapping visualization',
  })
</script>
