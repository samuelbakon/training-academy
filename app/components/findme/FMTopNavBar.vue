<template>
  <header
    class="bg-surface border-b border-outline-variant fixed top-0 w-full z-50 dark:bg-surface dark:border-outline-variant"
    role="banner">
    <nav
      class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-[1440px] mx-auto"
      role="navigation" aria-label="Navigation principale">
      <div
        class="text-headline-sm font-headline-sm font-bold text-primary flex items-center gap-2 dark:text-primary-fixed"
        role="img" aria-label="Logo FindMe">
        <FMIcon icon="uil:map-marker" size="text-4xl" aria-hidden="true" />
        FindMe
      </div>

      <div class="hidden md:flex gap-8 items-center">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" :class="linkClasses(link.active)"
          :aria-label="link.label" :aria-current="link.active ? 'page' : undefined">
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-4">
        <FMButton variant="primary" size="sm" label="Create Address" aria-label="Créer une nouvelle adresse"
          class="hidden md:block" @click="handleCreateAddress" />
        <FMButton variant="ghost" icon="uil:user" aria-label="Mon compte" @click="handleAccount" />
        <FMButton variant="ghost" icon="uil:bars" :aria-label="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="isMobileMenuOpen" class="md:hidden" @click="toggleMobileMenu" />
      </div>
    </nav>

    <div v-if="isMobileMenuOpen"
      class="md:hidden bg-surface border-b border-outline-variant px-margin-mobile py-4 dark:bg-surface dark:border-outline-variant"
      role="menu" aria-label="Menu mobile">
      <div class="flex flex-col gap-4">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" :class="mobileLinkClasses(link.active)"
          :aria-label="link.label" role="menuitem">
          {{ link.label }}
        </a>
        <FMButton variant="primary" label="Create Address" aria-label="Créer une nouvelle adresse" full-width
          @click="handleCreateAddress" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  /*
   * FMTopNavBar - Barre de navigation principale
   * 
   * Ce composant fournit la barre de navigation fixe en haut de page.
   * Inclut le logo, les liens de navigation, le bouton d'action et le menu mobile.
   * Supporte le mode sombre et le menu responsive.
   * 
   * Props principales :
   * - navLinks: Liste des liens de navigation (label, href, active)
   * 
   * Events :
   * - createAddress: Émis lors du clic sur le bouton Create Address
   * - account: Émis lors du clic sur l'icône de compte
   * 
   * Fonctionnalités :
   * - Menu hamburger sur mobile
   * - Navigation responsive
   * - Scroll vers le formulaire sur Create Address
   */
  import { ref } from 'vue'
  import FMButton from './FMButton.vue'
  import FMIcon from './FMIcon.vue'

  interface NavLink {
    label: string
    href: string
    active: boolean
  }

  const props = defineProps<{
    navLinks?: NavLink[]
  }>()

  const emit = defineEmits<{
    createAddress: []
    account: []
  }>()

  const isMobileMenuOpen = ref(false)

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const handleCreateAddress = () => {
    emit('createAddress')
    isMobileMenuOpen.value = false
  }

  const handleAccount = () => {
    emit('account')
  }

  const linkClasses = (active: boolean) => {
    const baseClasses = 'font-label-sm text-label-sm transition-colors'
    if (active) {
      return `${baseClasses} text-primary border-b-2 border-primary pb-1 dark:text-primary-fixed dark:border-primary-fixed`
    }
    return `${baseClasses} text-on-surface-variant hover:text-primary dark:text-on-surface-variant dark:hover:text-primary-fixed`
  }

  const mobileLinkClasses = (active: boolean) => {
    const baseClasses = 'font-label-sm text-label-sm py-2 transition-colors'
    if (active) {
      return `${baseClasses} text-primary font-semibold dark:text-primary-fixed`
    }
    return `${baseClasses} text-on-surface-variant hover:text-primary dark:text-on-surface-variant dark:hover:text-primary-fixed`
  }
</script>
