<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="font-label-sm text-label-sm text-on-surface-variant block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <input :id="id" :type="type" :placeholder="placeholder" :value="modelValue" :disabled="disabled"
      :required="required" :class="inputClasses" :aria-label="ariaLabel" :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined" @input="handleInput" />
    <p v-if="error" :id="`${id}-error`" class="text-error text-sm font-label-sm" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  /*
   * FMInput - Composant input de formulaire
   * 
   * Ce composant fournit un champ de saisie réutilisable avec validation.
   * Supporte le mode sombre et l'affichage des erreurs.
   * 
   * Props principales :
   * - type: Type de l'input (text, email, tel, number, password)
   * - label: Label affiché au-dessus du champ
   * - placeholder: Texte de placeholder
   * - modelValue: Valeur du champ (v-model)
   * - disabled: Désactive le champ
   * - required: Marque le champ comme requis
   * - error: Message d'erreur à afficher
   * 
   * Events :
   * - update:modelValue: Émis lors de la modification de la valeur
   */
  import { computed } from 'vue'

  interface Props {
    id?: string
    type?: 'text' | 'email' | 'tel' | 'number' | 'password'
    label?: string
    placeholder?: string
    modelValue?: string | number
    disabled?: boolean
    required?: boolean
    error?: string
    ariaLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    required: false,
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const ariaLabel = computed(() => props.ariaLabel || props.label || props.placeholder || '')

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }

  const inputClasses = computed(() => {
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
