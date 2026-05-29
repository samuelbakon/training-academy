<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClasses" :aria-label="ariaLabel"
    @click="handleClick">
    <FMIcon v-if="loading" icon="uil:spinner" class="animate-spin" />
    <FMIcon v-else-if="icon" :icon="icon" />
    <span v-if="label">{{ label }}</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
  /*
   * FMButton - Composant bouton générique
   * 
   * Ce composant fournit un bouton réutilisable avec plusieurs variants et tailles.
   * Supporte les états de chargement, désactivation et le mode sombre.
   * 
   * Props principales :
   * - variant: 'primary' | 'secondary' | 'outline' | 'ghost' - Style du bouton
   * - size: 'sm' | 'md' | 'lg' - Taille du bouton
   * - label: Texte affiché sur le bouton
   * - icon: Icône UIL à afficher (ex: 'uil:map-marker')
   * - loading: État de chargement avec spinner
   * - disabled: Désactive le bouton
   * - fullWidth: Prend toute la largeur disponible
   * 
   * Events :
   * - click: Émis lors du clic sur le bouton
   */
  import { computed } from 'vue'
  import FMIcon from './FMIcon.vue'

  interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    label?: string
    icon?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    ariaLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
  })

  const emit = defineEmits<{
    click: [event: MouseEvent]
  }>()

  const ariaLabel = computed(() => props.ariaLabel || props.label || '')

  const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
      emit('click', event)
    }
  }

  const buttonClasses = computed(() => {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-lg',
      'font-label-sm',
      'transition-all',
      'duration-200',
      'active:scale-95',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    ]

    const sizeClasses = {
      sm: ['px-4', 'py-2', 'text-sm'],
      md: ['px-6', 'py-3', 'text-base'],
      lg: ['px-8', 'py-4', 'text-lg'],
    }

    const variantClasses = {
      primary: [
        'bg-primary',
        'text-on-primary',
        'hover:opacity-90',
        'hover:shadow-md',
        'dark:bg-primary-fixed',
        'dark:text-on-primary-fixed',
      ],
      secondary: [
        'bg-secondary',
        'text-on-secondary',
        'hover:opacity-90',
        'hover:shadow-md',
      ],
      outline: [
        'border-2',
        'border-primary',
        'text-primary',
        'hover:bg-primary',
        'hover:text-on-primary',
        'dark:border-primary-fixed',
        'dark:text-primary-fixed',
        'dark:hover:bg-primary-fixed',
        'dark:hover:text-on-primary-fixed',
      ],
      ghost: [
        'text-on-surface-variant',
        'hover:bg-surface-container-low',
        'dark:text-on-surface-variant',
        'dark:hover:bg-surface-container-high',
      ],
    }

    const widthClass = props.fullWidth ? 'w-full' : ''

    return [
      ...baseClasses,
      ...sizeClasses[props.size],
      ...variantClasses[props.variant],
      widthClass,
    ]
  })
</script>
