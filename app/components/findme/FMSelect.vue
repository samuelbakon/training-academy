<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="font-label-sm text-label-sm text-on-surface-variant block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <select :id="id" :value="modelValue" :disabled="disabled" :required="required" :class="selectClasses"
      :aria-label="ariaLabel" :aria-invalid="!!error" :aria-describedby="error ? `${id}-error` : undefined"
      @change="handleChange">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" :id="`${id}-error`" class="text-error text-sm font-label-sm" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  /*
   * FMSelect - Composant select de formulaire
   * 
   * Ce composant fournit une liste déroulante réutilisable avec validation.
   * Supporte le mode sombre et l'affichage des erreurs.
   * 
   * Props principales :
   * - options: Liste des options disponibles (value, label)
   * - label: Label affiché au-dessus du select
   * - modelValue: Valeur sélectionnée (v-model)
   * - disabled: Désactive le select
   * - required: Marque le champ comme requis
   * - error: Message d'erreur à afficher
   * 
   * Events :
   * - update:modelValue: Émis lors de la sélection d'une option
   */
  import { computed } from 'vue'

  interface Option {
    value: string
    label: string
  }

  interface Props {
    id?: string
    label?: string
    modelValue?: string
    options: Option[]
    disabled?: boolean
    required?: boolean
    error?: string
    ariaLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    required: false,
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const ariaLabel = computed(() => props.ariaLabel || props.label || '')

  const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
  }

  const selectClasses = computed(() => {
    const baseClasses = [
      'w-full',
      'bg-surface-container-low',
      'border',
      'border-outline-variant',
      'rounded-lg',
      'p-3',
      'text-on-surface',
      'focus:border-primary',
      'focus:ring-1',
      'focus:ring-primary',
      'transition-all',
      'appearance-none',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'dark:bg-surface-container-high',
      'dark:text-on-surface',
      'dark:border-outline-variant',
      'dark:focus:border-primary-fixed',
      'dark:focus:ring-primary-fixed',
    ]

    if (props.error) {
      baseClasses.push('border-error', 'focus:border-error', 'focus:ring-error')
    }

    return baseClasses
  })
</script>
