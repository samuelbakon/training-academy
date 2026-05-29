<template>
  <section
    class="relative overflow-hidden bg-grid-subtle py-stack-lg md:py-24 px-margin-mobile md:px-margin-desktop dark:bg-surface-container">
    <div class="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-stack-md order-2 md:order-1">
        <h1 class="font-display-lg text-display-lg text-primary leading-tight dark:text-primary-fixed">
          {{ title }}
          <span class="text-secondary">{{ highlightedText }}</span>
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg dark:text-on-surface-variant">
          {{ description }}
        </p>
        <div class="flex flex-wrap gap-4 pt-stack-sm">
          <FMButton variant="primary" size="lg" :label="ctaLabel" :icon="ctaIcon" @click="handleCtaClick" />
          <div
            class="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-label-sm dark:bg-secondary-container dark:text-on-secondary-container">
            <FMIcon :icon="badgeIcon" size="text-sm" />
            {{ badgeText }}
          </div>
        </div>
      </div>

      <div class="order-1 md:order-2 flex justify-center">
        <div class="relative group">
          <div
            class="absolute -inset-4 bg-primary-fixed opacity-20 blur-3xl rounded-full dark:bg-primary-fixed dark:opacity-30">
          </div>
          <img :alt="imageAlt" :src="imageSrc"
            class="relative z-10 w-full max-w-md drop-shadow-2xl group-hover:rotate-1 transition-transform duration-500" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  /*
   * FMHero - Section hero principale
   * 
   * Ce composant affiche la section hero avec le titre principal, la description,
   * le bouton d'appel à l'action et l'illustration.
   * Supporte le mode sombre et les animations au survol.
   * 
   * Props principales :
   * - title: Titre principal de la section
   * - highlightedText: Texte mis en surbrillance (en couleur)
   * - description: Description sous le titre
   * - ctaLabel: Texte du bouton d'action
   * - ctaIcon: Icône du bouton d'action
   * - ctaHref: Lien vers lequel scroller sur le clic
   * - badgeIcon: Icône du badge de certification
   * - badgeText: Texte du badge
   * - imageSrc: URL de l'image illustrative
   * - imageAlt: Texte alternatif de l'image
   * 
   * Events :
   * - ctaClick: Émis lors du clic sur le bouton d'action
   */
  import FMButton from './FMButton.vue'
  import FMIcon from './FMIcon.vue'
  interface Props {
    title?: string
    highlightedText?: string
    description?: string
    ctaLabel?: string
    ctaIcon?: string
    ctaHref?: string
    badgeIcon?: string
    badgeText?: string
    imageSrc?: string
    imageAlt?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Créez votre adresse précise',
    highlightedText: 'en un clic',
    description: 'FindMe comble le fossé entre la précision institutionnelle et la navigation humaine pour transformer chaque coin de rue en une destination identifiée.',
    ctaLabel: 'Démarrer l\'inscription',
    ctaIcon: 'uil:arrow-right',
    ctaHref: '#formulaire',
    badgeIcon: 'uil:check-circle',
    badgeText: 'Service Certifié',
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvWBnrRt6DWZUFbN5yxbREectpcL2ZV3ulH7KcslX7YoWc2zTk-Sq_H1yGwe4HQb_Sy6ylML1ffXgdgTdM5joNkNp2juclgvByWFB_gxrKDu51FmDr_Duq9FQBYBxCXg7T1gM23kCkIQOPxgYXJi1xIDP8PK1QensRr3VJNGQfM5DJqRY4AjfUZPOYI0VJIfCy1fyrzmAM96VJ1EBOyUjvfXklUdHuaQAIc4YRXRldstbfom7n3tGEkwbxvMk9N2qpjQE5jR0P_1jp',
    imageAlt: 'FindMe Whimsical Illustration',
  })

  const emit = defineEmits<{
    ctaClick: []
  }>()

  const handleCtaClick = () => {
    if (props.ctaHref) {
      const element = document.querySelector(props.ctaHref)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    emit('ctaClick')
  }
</script>

<style scoped>
  .bg-grid-subtle {
    background-image: radial-gradient(circle, #e2e2e4 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .dark .bg-grid-subtle {
    background-image: radial-gradient(circle, #454652 1px, transparent 1px);
  }
</style>
