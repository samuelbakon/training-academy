<template>
  <div class="space-y-2">
    <label v-if="label" class="font-label-sm text-label-sm text-on-surface-variant block">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <div :class="uploadClasses" role="button" :tabindex="0" :aria-label="ariaLabel" @click="handleClick"
      @keydown.enter="handleClick" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop">
      <input ref="fileInput" type="file" :accept="accept" class="hidden"
        :aria-label="`Sélectionner ${label || 'un fichier'}`" @change="handleFileChange" />
      <FMIcon v-if="!previewUrl" :icon="isDragging ? 'uil:cloud-upload' : 'uil:image-plus'" size="text-4xl"
        class="text-outline group-hover:text-primary transition-colors" />
      <img v-else :src="previewUrl" :alt="label" class="max-h-48 rounded-lg object-cover" />
      <p v-if="!previewUrl" class="font-label-sm text-label-sm text-on-surface-variant text-center">
        {{ isDragging ? 'Relâchez pour téléverser' : 'Cliquez pour téléverser ou glissez un fichier' }}
      </p>
      <button v-if="previewUrl" type="button"
        class="absolute top-2 right-2 bg-error text-on-error rounded-full p-2 hover:opacity-90 transition-opacity"
        :aria-label="`Supprimer ${label || 'le fichier'}`" @click.stop="handleRemove">
        <FMIcon icon="uil:times" />
      </button>
    </div>
    <p v-if="error" class="text-error text-sm font-label-sm" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  /*
   * FMFileUpload - Composant d'upload de fichier
   * 
   * Ce composant fournit une zone de téléversement de fichiers avec drag & drop.
   * Affiche un aperçu pour les images et supporte le mode sombre.
   * 
   * Props principales :
   * - label: Label affiché au-dessus de la zone
   * - accept: Types MIME acceptés (ex: image/*)
   * - required: Marque le champ comme requis
   * - error: Message d'erreur à afficher
   * - modelValue: Fichier sélectionné (v-model)
   * 
   * Events :
   * - update:modelValue: Émis lors de la sélection d'un fichier
   * 
   * Fonctionnalités :
   * - Drag & drop supporté
   * - Aperçu d'image
   * - Suppression du fichier sélectionné
   */
  import { computed, ref, watch } from 'vue'
  import FMIcon from './FMIcon.vue'

  interface Props {
    label?: string
    accept?: string
    required?: boolean
    error?: string
    modelValue?: File | null
    ariaLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    accept: 'image/*',
    required: false,
    modelValue: null,
  })

  const emit = defineEmits<{
    'update:modelValue': [file: File | null]
  }>()

  const fileInput = ref<HTMLInputElement>()
  const isDragging = ref(false)
  const previewUrl = ref<string | null>(null)

  const ariaLabel = computed(() => props.ariaLabel || props.label || 'Zone de téléversement de fichier')

  const handleClick = () => {
    fileInput.value?.click()
  }

  const handleDragOver = () => {
    isDragging.value = true
  }

  const handleDragLeave = () => {
    isDragging.value = false
  }

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const files = event.dataTransfer?.files
    if (files && files.length > 0 && files[0]) {
      processFile(files[0])
    }
  }

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files && files.length > 0 && files[0]) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewUrl.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
      emit('update:modelValue', file)
    }
  }

  const handleRemove = () => {
    previewUrl.value = null
    emit('update:modelValue', null)
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  const uploadClasses = computed(() => {
    const baseClasses = [
      'relative',
      'border-2',
      'border-dashed',
      'border-outline-variant',
      'rounded-xl',
      'p-8',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-3',
      'cursor-pointer',
      'group',
      'transition-all',
      'dark:border-outline-variant',
    ]

    if (props.error) {
      baseClasses.push('border-error')
    } else {
      baseClasses.push('hover:border-primary', 'dark:hover:border-primary-fixed')
    }

    if (isDragging.value) {
      baseClasses.push('border-primary', 'bg-primary/5', 'dark:border-primary-fixed', 'dark:bg-primary-fixed/5')
    }

    return baseClasses
  })

  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      processFile(newValue)
    } else {
      previewUrl.value = null
    }
  })
</script>
