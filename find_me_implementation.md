# FindMe - Implementation Plan

## Overview
Conversion de la page HTML statique en application Nuxt 3 avec architecture modulaire et respect des principes UX.

## Structure du Projet

```
nuxt-project/
├── app/
│   ├── layouts/
│   │   └── findme.vue            # Layout spécifique FindMe
│   ├── pages/
│   │   └── findme/
│   │       └── index.vue          # Page principale
│   ├── components/
│   │   └── findme/
│   │       ├── FMButton.vue           # Bouton générique
│   │       ├── FMInput.vue            # Input de formulaire
│   │       ├── FMSelect.vue           # Select de formulaire
│   │       ├── FMFileUpload.vue       # Upload de fichier
│   │       ├── FMTopNavBar.vue        # Barre de navigation
│   │       ├── FMFooter.vue           # Pied de page
│   │       ├── FMHero.vue             # Section hero
│   │       ├── FMProcessStep.vue      # Étape du processus
│   │       ├── FMAddressForm.vue      # Formulaire d'adressage
│   │       └── FMMapContext.vue       # Section carte contextuelle
│   └── composables/
│       └── findme/
│           ├── useGeolocation.ts      # Logique géolocalisation
│           ├── useTheme.ts            # Gestion du thème
│           └── useAddressForm.ts      # Logique du formulaire
```

## Étapes d'Implémentation

### ✅ 1. Analyse et Planification
- [x] Analyse de la page HTML existante
- [x] Identification des composants nécessaires
- [x] Création du plan d'implémentation

### ✅ 2. Configuration du Thème
- [x] Configuration Tailwind avec les couleurs personnalisées
- [x] Support du mode clair/sombre
- [x] Configuration des typographies (Public Sans)

### ✅ 3. Création des Composables
- [x] `useGeolocation.ts` - Gestion de la géolocalisation GPS
- [x] `useTheme.ts` - Gestion du thème (light/dark)
- [x] `useAddressForm.ts` - Logique du formulaire d'adressage

### ✅ 4. Composants UI de Base
- [x] `FMButton.vue` - Bouton avec variants (primary, secondary, outline)
- [x] `FMInput.vue` - Input de formulaire avec validation
- [x] `FMSelect.vue` - Select de formulaire
- [x] `FMFileUpload.vue` - Zone d'upload de fichier

### ✅ 5. Composants de Navigation
- [x] `FMTopNavBar.vue` - Navigation principale avec menu mobile
- [x] `FMFooter.vue` - Pied de page avec liens

### ✅ 6. Composants de Section
- [x] `FMHero.vue` - Section hero avec CTA
- [x] `FMProcessStep.vue` - Carte d'étape du processus
- [x] `FMAddressForm.vue` - Formulaire complet d'adressage
- [x] `FMMapContext.vue` - Section carte contextuelle

### ✅ 7. Page Principale
- [x] `pages/findme/index.vue` - Assemblage de tous les composants

## Principes UX Appliqués

### Loi de Fitts
- Boutons d'action principale larges et facilement accessibles
- Éléments cliquables dans les coins de l'écran (navigation, footer)
- Zones de clic suffisamment grandes (min 44px)

### Loi de Hick
- Navigation progressive avec options limitées
- Formulaire divisé en sections logiques
- Options révélées au besoin (menu mobile)

### Loi de Jakob
- Logo en haut à gauche
- Navigation conventionnelle
- Patterns de formulaire standards

### Charge Cognitive Minimale
- Informations contextuelles affichées au moment nécessaire
- Formulaire divisé en étapes simples
- Labels proches de leurs champs (loi de proximité)

### Loi de Proximité (Gestalt)
- Groupement visuel des éléments liés
- Espacement cohérent entre les sections
- Labels proches des champs de formulaire

## Charte Graphique

### Couleurs
- Primary: #000666
- Secondary: #006e1c
- Background: #f9f9fb (light) / #1a1c1d (dark)
- Surface: #f9f9fb (light) / #2f3132 (dark)

### Typographie
- Font: Public Sans
- Display: 48px (desktop) / 28px (mobile)
- Headline: 32px (desktop) / 24px (mobile)
- Body: 18px (large) / 16px (medium)
- Label: 12px

### Espacement
- Mobile margin: 16px
- Desktop margin: 64px
- Stack: 8px (sm), 16px (md), 32px (lg)
- Gutter: 24px

## Statut
En cours d'implémentation...
