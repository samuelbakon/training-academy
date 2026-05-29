<template>
  <div
    class="p-stack-md bg-white border border-outline-variant rounded-xl group hover:border-primary transition-colors dark:bg-surface-container-high dark:border-outline-variant dark:hover:border-primary-fixed">
    <div
      class="w-16 h-16 bg-surface-container-low rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all dark:bg-surface-container dark:text-primary-fixed dark:group-hover:bg-primary-fixed dark:group-hover:text-on-primary-fixed">
      <FMIcon :icon="icon" size="text-3xl" />
    </div>
    <h3 class="font-headline-sm text-headline-sm mb-2">{{ title }}</h3>
    <p class="text-on-surface-variant dark:text-on-surface-variant">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
  /*
   * FMProcessStep - Carte d'étape du processus
   * 
   * Ce composant affiche une étape du processus avec icône, titre et description.
   * Supporte le mode sombre et les effets de survol.
   * 
   * Props principales :
   * - icon: Icône UIL de l'étape (ex: 'uil:map-marker')
   * - title: Titre de l'étape
   * - description: Description de l'étape
   */
  import FMIcon from './FMIcon.vue'
  interface Props {
    icon?: string
    title?: string
    description?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    icon: 'uil:check-circle',
    title: 'Titre',
    description: 'Description de l\'étape',
  })
</script>
