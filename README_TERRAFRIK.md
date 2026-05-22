# Terrafrik Cameroun - Générateur de Cahier des Besoins

Ce script Node.js permet de générer automatiquement un document Word (.docx) contenant le cahier des besoins pour le site web de Terrafrik Cameroun.

## Description

Le script `terrafrik.js` utilise la bibliothèque `docx` pour créer un document structuré et professionnel présentant l'ensemble des spécifications pour le développement du site web de Terrafrik Cameroun.

## Contenu du document généré

Le document produit comprend les sections suivantes :

1. **Page de garde** - Titre, organisation, date
2. **Table des matières** - Navigation automatique
3. **Contexte et présentation de Terrafrik**
   - Naissance de la dynamique
   - Historique (2008-2015)
   - Missions
   - Terrafrik Cameroun
4. **Objectifs du site web**
   - Objectif général
   - Objectifs spécifiques
5. **Cibles du site web**
   - Cibles principales
   - Cibles secondaires
6. **Arborescence du site**
   - Page d'accueil
   - Qui sommes-nous ?
   - Axes d'intervention (ECSI-DD, 2A2P, FSA)
   - Nos projets
   - Actualités & Événements
   - Partenaires
   - Ressources
   - Nous rejoindre
   - Contact
7. **Contenus détaillés par section**
   - Textes de présentation
   - Principe de fonctionnement
8. **Fonctionnalités du site**
   - Fonctionnalités essentielles
   - Fonctionnalités avancées (optionnelles)
9. **Charte graphique**
   - Logo
   - Couleurs principales (tableau avec codes HEX)
   - Typographie
   - Iconographie
   - Style visuel
10. **Contraintes techniques**
    - Hébergement, nom de domaine
    - Performance, sécurité
    - Accessibilité, SEO, RGPD
11. **Planning et livrables**
    - Phases du projet (4 phases)
    - Livrables attendus
12. **Budget indicatif** (tableau)
13. **Conclusion**

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Installer les dépendances :
```bash
npm install docx
```

Ou avec yarn :
```bash
yarn add docx
```

## Utilisation

Exécuter le script pour générer le document :
```bash
node terrafrik.js
```

Le script créera un fichier `Terrafrik_Cameroun_Cahier_Besoins.docx` dans le répertoire courant.

## Structure du document

Le document généré utilise :
- **Format A4** avec marges standard
- **Styles personnalisés** pour les titres (Heading 1, 2, 3)
- **Numérotation** automatique (puces et nombres)
- **Tableaux** pour la charte graphique et le budget
- **Sauts de page** entre les sections principales
- **Table des matières** interactive avec hyperliens

## Personnalisation

Pour modifier le contenu du document :
1. Éditer le fichier `terrafrik.js`
2. Modifier les textes dans les objets `TextRun`
3. Ajuster les styles dans la section `styles`
4. Modifier la numérotation dans la section `numbering`

## Dépendances

- `docx` - Bibliothèque pour la création de documents Word
- `fs` - Module Node.js pour l'écriture de fichiers (intégré)

## Sortie

Fichier généré : `Terrafrik_Cameroun_Cahier_Besoins.docx`

## Auteur

Terrafrik Alternatives Cameroun

## Contact

- Email : contact.cameroun@terrafrik.org
- Web : www.cameroun.terrafrik.org
