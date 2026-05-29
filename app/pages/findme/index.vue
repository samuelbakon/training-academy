<template>
  <div itemscope itemtype="https://schema.org/SoftwareApplication">
    <FMHero title="Créez votre adresse précise" highlighted-text="en un clic"
      description="FindMe comble le fossé entre la précision institutionnelle et la navigation humaine pour transformer chaque coin de rue en une destination identifiée."
      cta-label="Démarrer l'inscription" cta-icon="uil:arrow-right" cta-href="#formulaire" badge-icon="uil:check-circle"
      badge-text="Service Certifié" @cta-click="scrollToForm" itemprop="description" />

    <section
      class="py-stack-lg bg-surface-container-lowest px-margin-mobile md:px-margin-desktop dark:bg-surface-container"
      aria-labelledby="process-title">
      <div class="max-w-[1440px] mx-auto">
        <div class="text-center mb-16">
          <span class="text-primary font-label-sm uppercase tracking-widest dark:text-primary-fixed">Le
            Processus</span>
          <h2 id="process-title" class="font-headline-md text-headline-md mt-2">Navigation et Précision Institutionnelle
          </h2>
        </div>
        <div class="grid md:grid-cols-3 gap-gutter">
          <FMProcessStep icon="uil:map-marker" title="Géolocalisation"
            description="Activez votre GPS pour capturer vos coordonnées exactes avec une précision au mètre près." />
          <FMProcessStep icon="uil:edit-alt" title="Identification"
            description="Remplissez les détails familiers : quartier, rue, et numéro de domicile pour un adressage complet." />
          <FMProcessStep icon="uil:check-circle" title="Validation"
            description="Votre adresse est enregistrée dans le système national et prête à être partagée instantanément." />
        </div>
      </div>
    </section>

    <FMAddressForm @submit="handleFormSubmit" />

    <FMMapContext title="Précision Institutionnelle" subtitle="Données validées par FindMe Systems" />
  </div>
</template>

<script setup lang="ts">
  import FMAddressForm from '~/components/findme/FMAddressForm.vue'
  import FMHero from '~/components/findme/FMHero.vue'
  import FMMapContext from '~/components/findme/FMMapContext.vue'
  import FMProcessStep from '~/components/findme/FMProcessStep.vue'

  /*
   * Page FindMe - Page principale de l'application
   * 
   * Cette page utilise le layout findme pour la structure de base.
   * Contient uniquement le contenu spécifique à la page.
   * 
   * Structure de la page :
   * - FMHero: Section hero avec CTA
   * - Section processus: 3 étapes (FMProcessStep)
   * - FMAddressForm: Formulaire d'adressage
   * - FMMapContext: Section carte contextuelle
   * 
   * Layout utilisé : findme (inclut navbar et footer)
   */
  definePageMeta({
    layout: 'findme'
  })

  const scrollToForm = () => {
    const element = document.querySelector('#formulaire')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data)
  }

  useHead({
    title: 'FindMe - Système d\'Adressage Précis | Géolocalisation et Adressage Urbain',
    meta: [
      { name: 'description', content: 'FindMe comble le fossé entre la précision institutionnelle et la navigation humaine pour transformer chaque coin de rue en une destination identifiée. Créez votre adresse précise en un clic.' },
      { name: 'keywords', content: 'adressage, géolocalisation, adresse précise, navigation urbaine, carte, GPS, localisation, FindMe' },
      { name: 'author', content: 'FindMe Brand Systems' },
      { property: 'og:title', content: 'FindMe - Système d\'Adressage Précis' },
      { property: 'og:description', content: 'Transformez chaque coin de rue en une destination identifiée avec FindMe.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'FindMe - Système d\'Adressage Précis' },
      { name: 'twitter:description', content: 'Transformez chaque coin de rue en une destination identifiée avec FindMe.' },
      { name: 'robots', content: 'index, follow' },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'FindMe',
          applicationCategory: 'NavigationApplication',
          operatingSystem: 'Web',
          description: 'FindMe comble le fossé entre la précision institutionnelle et la navigation humaine pour transformer chaque coin de rue en une destination identifiée.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'XAF'
          },
          featureList: [
            'Géolocalisation GPS précise',
            'Adressage institutionnel',
            'Validation d\'adresse',
            'Navigation urbaine'
          ],
          author: {
            '@type': 'Organization',
            name: 'FindMe Brand Systems'
          }
        })
      }
    ]
  })
</script>
