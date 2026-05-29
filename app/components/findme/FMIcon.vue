<template>
  <Icon :icon="icon" :class="iconClasses" />
</template>

<script setup lang="ts">
  /*
   * FMIcon - Composant d'icône générique
   * 
   * Ce composant fournit une icône réutilisable utilisant @iconify/vue.
   * Supporte les icônes UIL (Unicons Line) et le mode sombre.
   * 
   * Props principales :
   * - icon: Nom de l'icône (ex: 'uil:map-marker')
   * - size: Taille de l'icône (text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl)
   * 
   * Utilisation :
   * <FMIcon icon="uil:map-marker" size="text-2xl" />
   */
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  interface Props {
    icon: string
    size?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'text-xl',
  })

  const iconClasses = computed(() => props.size)
</script>
