<template>
  <footer
    class="bg-surface-container border-t border-outline-variant dark:bg-surface-container dark:border-outline-variant">
    <div
      class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-md flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex flex-col items-center md:items-start gap-2">
        <div class="font-bold text-primary flex items-center gap-2 dark:text-primary-fixed">
          <FMIcon icon="uil:map-marker" />
          FindMe Brand Systems
        </div>
        <p
          class="font-body-md text-body-md text-on-surface-variant text-center md:text-left dark:text-on-surface-variant">
          © 2024 FindMe Brand Systems. All rights reserved. Institutional Document Ref: FM-2024-CG.
        </p>
      </div>

      <div class="flex gap-8 items-center flex-wrap justify-center">
        <a v-for="link in footerLinks" :key="link.href" :href="link.href"
          class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline dark:text-on-surface-variant dark:hover:text-primary-fixed">
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  /*
   * FMFooter - Pied de page
   * 
   * Ce composant fournit le pied de page avec les informations légales et les liens.
   * Supporte le mode sombre et la mise en page responsive.
   * 
   * Props principales :
   * - footerLinks: Liste des liens du footer (label, href)
   * 
   * Par défaut, inclut les liens : Legal Mentions, Privacy Policy, Contact Support
   */
  import { computed } from 'vue'
  import FMIcon from './FMIcon.vue'

  interface FooterLink {
    label: string
    href: string
  }

  const props = defineProps<{
    footerLinks?: FooterLink[]
  }>()

  const defaultFooterLinks: FooterLink[] = [
    { label: 'Legal Mentions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact Support', href: '#' },
  ]

  const footerLinks = computed(() => props.footerLinks || defaultFooterLinks)
</script>
