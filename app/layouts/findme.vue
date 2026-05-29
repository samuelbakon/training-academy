<template>
  <div class="bg-background text-on-surface font-body-md min-h-screen dark:bg-surface dark:text-on-surface">
    <FMTopNavBar :nav-links="navLinks" @create-address="handleCreateAddress" @account="handleAccount" />

    <main class="pt-20">
      <slot />
    </main>

    <FMFooter />
  </div>
</template>

<script setup lang="ts">
  /*
   * Layout FindMe - Layout spécifique pour les pages FindMe
   * 
   * Ce layout fournit la structure de base pour toutes les pages FindMe.
   * Inclut la barre de navigation fixe, le contenu principal et le pied de page.
   * Initialise le thème (light/dark) et gère les interactions globales.
   * 
   * Structure du layout :
   * - FMTopNavBar: Barre de navigation fixe en haut
   * - slot: Contenu principal de la page
   * - FMFooter: Pied de page
   * 
   * Fonctionnalités :
   * - Initialisation du thème au montage
   * - Gestion des liens de navigation
   * - Scroll fluide vers le formulaire
   * - Gestion des événements de navigation
   */
  import { ref } from 'vue'
  import { useTheme } from '../composables/findme/useTheme'
  import FMTopNavBar from '../components/findme/FMTopNavBar.vue'
  import FMFooter from '../components/findme/FMFooter.vue'

  const { initTheme } = useTheme()

  onMounted(() => {
    initTheme()
  })

  const navLinks = ref([
    { label: 'Address Map', href: '#', active: true },
    { label: 'My Locations', href: '#', active: false },
    { label: 'Precision Guide', href: '#', active: false },
    { label: 'Institutional', href: '#', active: false },
  ])

  const handleCreateAddress = () => {
    const element = document.querySelector('#formulaire')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleAccount = () => {
    console.log('Account clicked')
  }
</script>
