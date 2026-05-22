const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        PageBreak, TableOfContents, LevelFormat, PageOrientation } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: { 
      document: { 
        run: { font: "Arial", size: 24 } 
      } 
    },
    paragraphStyles: [
      { 
        id: "Heading1", 
        name: "Heading 1", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0 }
      },
      { 
        id: "Heading2", 
        name: "Heading 2", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 1 }
      },
      { 
        id: "Heading3", 
        name: "Heading 3", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { 
            level: 0, 
            format: LevelFormat.BULLET, 
            text: "•", 
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          },
          { 
            level: 1, 
            format: LevelFormat.BULLET, 
            text: "◦", 
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } }
          }
        ]
      },
      {
        reference: "numbers",
        levels: [
          { 
            level: 0, 
            format: LevelFormat.DECIMAL, 
            text: "%1.", 
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 11906,
          height: 16838
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // PAGE DE GARDE
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2880 },
        children: [
          new TextRun({
            text: "TERRAFRIK ALTERNATIVES",
            bold: true,
            size: 48,
            color: "FF7F00"
          })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240 },
        children: [
          new TextRun({
            text: "CAMEROUN",
            bold: true,
            size: 44,
            color: "2E75B6"
          })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440 },
        children: [
          new TextRun({
            text: "CAHIER DES BESOINS",
            bold: true,
            size: 32
          })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480 },
        children: [
          new TextRun({
            text: "SITE WEB TERRAFRIK CAMEROUN",
            size: 28
          })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2880 },
        children: [
          new TextRun({
            text: "Une dynamique citoyenne des subsaharien.ne.s",
            italics: true,
            size: 26,
            color: "FF7F00"
          })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 4320 },
        children: [
          new TextRun({
            text: "Mai 2026",
            size: 24
          })
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // TABLE DES MATIERES
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Table des matières")]
      }),
      
      new TableOfContents("Table des matières", {
        hyperlink: true,
        headingStyleRange: "1-3"
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 1. CONTEXTE ET PRÉSENTATION
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Contexte et présentation de Terrafrik")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.1 Naissance de la dynamique Terrafrik")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("La dynamique Réseau Terrafrik est né de la volonté de plusieurs acteurs de développement – ressortissants africains – partout dans le monde et principalement en France, qui ont fait le constat des limites des modèles actuels de développement pour ce qui est de favoriser le bien être des subsahariens dans leurs lieux de vie.")
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Concrètement, il s'agit pour ces acteurs de mutualiser leurs efforts pour améliorer l'efficacité de leur travail de terrain, de sensibilisation, de plaidoyers, de défense des droits essentiels des subsahariens et de transmission mémorielle intergénérationnelle.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.2 Un peu d'histoire")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "2008 :", bold: true }),
          new TextRun(" TET-LLÄ France lance le projet citoyen Terrafrik'Art : « La culture comme passerelle vers les solidarités réciproques »")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "2010 à 2014 :", bold: true }),
          new TextRun(" TET-LLÄ France intègre les associations accompagnées sur le dispositif 2A2P (Appui aux Associations et Porteurs de Projets)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "2014 à 2015 :", bold: true }),
          new TextRun(" TET-LLÄ France lance les convergences en vue d'une dynamique collective suite à une consultation des associations de France et d'Afrique")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "15 novembre 2015 :", bold: true }),
          new TextRun(" Convergence Fondatrice - Naissance de la DYNAMIQUE TERRAFRIK ALTERNATIVES")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.3 Missions définies à la convergence fondatrice")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Représenter, valoriser & défendre le bien-être du Subsaharien dans son lieu de vie", bold: true })
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Sensibiliser, former et accompagner ", bold: true }),
          new TextRun("les acteurs associatifs, les structures membres et tout porteur de projet solidaire et durable")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Mutualiser les ressources humaines et financières ", bold: true }),
          new TextRun("en développant la mobilité internationale et la réciprocité")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.4 Terrafrik Cameroun")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Terrafrik Cameroun est l'une des antennes nationales du réseau Terrafrik Alternatives, présent dans "),
          new TextRun({ text: "14 pays", bold: true }),
          new TextRun(" : Occitanie, Ile de France, Bretagne (France), Cameroun, Guinée, RCA, Togo, Bénin, RDC, Niger, Côte d'Ivoire, Gabon, Sénégal.")
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Au Cameroun, la dynamique anime plusieurs projets innovants autour de l'agroécologie, de l'apiculture, de la gestion des déchets et de l'éducation populaire.")
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 2. OBJECTIFS DU SITE WEB
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Objectifs du site web")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 Objectif général")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Créer une plateforme web pour "),
          new TextRun({ text: "valoriser les actions de Terrafrik Cameroun", bold: true }),
          new TextRun(", faciliter la mobilisation citoyenne, favoriser les partenariats, et offrir un espace de ressources et d'information sur les initiatives de développement durable au Cameroun.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.2 Objectifs spécifiques")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Présenter la dynamique Terrafrik", bold: true }),
          new TextRun(" : histoire, missions, valeurs, organisation")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Mettre en avant les trois axes d'intervention", bold: true }),
          new TextRun(" : ECSI-DD, 2A2P, FSA")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Valoriser les projets et actions de terrain", bold: true }),
          new TextRun(" menés au Cameroun")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Faciliter l'engagement citoyen", bold: true }),
          new TextRun(" et l'adhésion de nouvelles structures")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Offrir un espace de ressources", bold: true }),
          new TextRun(" (documentations, outils, médias)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Favoriser les partenariats", bold: true }),
          new TextRun(" avec les acteurs locaux, nationaux et internationaux")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Communiquer sur les événements", bold: true }),
          new TextRun(" (festivals, webinaires, séminaires)")
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 3. CIBLES
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. Cibles du site web")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 Cibles principales")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Les jeunes camerounais", bold: true }),
          new TextRun(" (18-35 ans) intéressés par l'engagement citoyen, l'agriculture durable, l'entrepreneuriat social")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Les associations et ONG locales", bold: true }),
          new TextRun(" cherchant un appui, des formations, ou des partenariats")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Les porteurs de projets solidaires", bold: true }),
          new TextRun(" en quête d'accompagnement et de ressources")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2 Cibles secondaires")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Les partenaires techniques et financiers", bold: true }),
          new TextRun(" (bailleurs, fondations, coopération internationale)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Les institutions publiques", bold: true }),
          new TextRun(" (mairies, préfectures, ministères)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Le grand public", bold: true }),
          new TextRun(" camerounais et international sensible aux enjeux de développement durable")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Les membres du réseau Terrafrik international", bold: true }),
          new TextRun(" pour faciliter les échanges et la mutualisation")
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 4. ARBORESCENCE DU SITE
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. Arborescence du site")]
      }),

      new Paragraph({
        spacing: { after: 360 },
        children: [
          new TextRun("Le site sera structuré autour de "),
          new TextRun({ text: "trois axes majeurs d'intervention", bold: true }),
          new TextRun(", qui constituent le cœur de l'action de Terrafrik Cameroun.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 Page d'accueil")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Bannière avec slogan : « Une dynamique citoyenne des subsaharien.ne.s »")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Présentation courte de Terrafrik Cameroun")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Mise en avant des 3 axes (ECSI-DD, 2A2P, FSA) avec visuels et liens")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Actualités et événements à venir")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Témoignages / Photos de terrain")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Appel à l'action (« Nous rejoindre », « Soutenir nos actions »)")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 Qui sommes-nous ?")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Histoire de Terrafrik (chronologie 2008-2015)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Missions et valeurs")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Principe de fonctionnement de la dynamique")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Gouvernance et organisation (organigramme)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Terrafrik dans le monde (carte du réseau)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Charte et positionnement")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.3 Nos axes d'intervention (pages principales)")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("A. ECSI-DD : Éducation à la Citoyenneté et au Développement Durable")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Présentation de l'axe")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Nos outils et moyens d'action :")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Festival des Solidarités")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("SECSI AFRIK (Subsaharienne de l'ECSI)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Festival Alimenterre")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Concours T'TOI / Slam & Dj Mix")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Chantiers Internationaux Jeunes")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("RéSIS MEDIA (Centre de ressources)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Projets en cours (Les enfants de la forêt, Slam & Dj Mix, etc.)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Galerie photos/vidéos")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("B. 2A2P : Appui aux Associations et Porteurs de Projets")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Présentation du dispositif 2A2P")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Nos services :")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Accompagnement de projets")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Formations et renforcement de capacités")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Appui à la recherche de financement")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Mutualisation d'ingénierie")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Mobilités Jeunes & Solidarité")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Projets soutenus (LAB'EAU TER, BEE'API, GDSM, VIA TERRE, Label BIOMAF)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Formulaire de demande d'accompagnement")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("C. FSA : Forum Subsaharien des Alternatives")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Présentation du FSA")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Objectifs : collecter la parole citoyenne, relais d'une vision plurielle subsaharienne")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Nos événements :")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Terres & Bien-être Noirs (TBN)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Les Webinaires Via Terre")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Tables rondes (Extractivisme, Diaspora en question)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Participation aux forums mondiaux (FSM, COP, etc.)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Archives et publications")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.4 Nos projets")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Cette section présente les projets transversaux et fédératifs menés au Cameroun, chacun relié à un ou plusieurs axes d'intervention.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "LAB'EAU TER", bold: true }),
          new TextRun(" : Produire et nourrir en intelligence avec les sols et le vivant (Agroécologie)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "BEE'API CAMEROUN", bold: true }),
          new TextRun(" : Produire – Nourrir – Soigner en intelligence avec la biodiversité (Apiculture)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Projet GDSM", bold: true }),
          new TextRun(" : Gestion Durable des Déchets Solides Ménagers (Douala)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "VIA TERRE", bold: true }),
          new TextRun(" : École de la transition écologique")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Label BIOMAF", bold: true }),
          new TextRun(" : Biodiversité & maintien de l'agriculture familiale")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "RéSIS MEDIA", bold: true }),
          new TextRun(" : Centre de ressources")
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun({ text: "Format de présentation de chaque projet :", italics: true })
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Titre et mini-description")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Objectifs")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Résultats attendus / obtenus")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Partenaires mobilisés")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Localisation (carte)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Galerie photos")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.5 Actualités & Événements")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Fil d'actualités (blog)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Agenda des événements")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Webinaires et formations à venir")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.6 Partenaires")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Logos et présentation des partenaires techniques et financiers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Témoignages de partenaires")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.7 Ressources")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Documentations (rapports, fiches projets, charte)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Outils pédagogiques")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Vidéos et podcasts")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Publications et articles")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.8 Nous rejoindre / Nous soutenir")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Devenir membre (formulaire d'adhésion)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Bénévolat et engagement")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Faire un don / Soutenir financièrement")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Devenir partenaire")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.9 Contact")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Formulaire de contact")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Coordonnées (adresse, téléphone, email)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Carte de localisation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Réseaux sociaux")]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 5. CONTENUS DÉTAILLÉS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. Contenus détaillés par section")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1 Textes de présentation")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Terrafrik Alternatives - Présentation courte (page d'accueil)")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun({ text: "« ", italics: true }),
          new TextRun({ text: "Terrafrik Alternatives est une dynamique citoyenne des subsaharien.ne.s de France et d'Afrique. Nous installons une pratique d'échange et de convergence d'idées pratiques pour les actions de terrain en Afrique subsaharienne. Nous menons une vaste campagne d'éducation populaire à la citoyenneté autour des enjeux mondiaux, mais sur une reconsidération des pratiques en Afrique subsaharienne en particulier. Nous mutualisons connaissances, expériences, pratiques, matériels et ressources humaines pour une montée en compétence des acteurs sur le terrain.", italics: true }),
          new TextRun({ text: " »", italics: true })
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Les trois missions")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Représenter, valoriser & défendre le bien-être du Subsaharien dans son lieu de vie", bold: true })
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("La dynamique Terrafrik Alternatives doit se renforcer sur le terrain en France et en Afrique afin d'être en capacité de représenter les subsahariens d'Afrique et en être un porte-voix sur les enjeux mondiaux.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Sensibiliser, former et accompagner les acteurs associatifs", bold: true })
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Un projet ou une initiative est un processus unique, un ensemble d'actions que nous souhaitons entreprendre pour atteindre un but. La Solidarité est un acte réfléchi et responsable qui vise à induire des changements de comportements individuels et collectifs. Nous accompagnons les porteurs de projets solidaires et durables.")
        ]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Mutualiser les ressources humaines et financières", bold: true })
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Dans la conjoncture économique difficile, la mutualisation apparaît comme un levier d'attractivité et de performance pour une structure associative. Mutualiser permet de créer, de maintenir et de pérenniser l'emploi, tout en favorisant le développement des structures et la consolidation de leurs activités.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2 Principe de fonctionnement")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("C'est l'espace commun où chaque membre apporte une ou plusieurs activités à mettre en commun ; le membre initiateur de l'activité restant le référent pour sa réalisation")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("C'est aussi le lieu des coopérations sur des actions initiées collectivement")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("Les ressources financières sont mutualisées au service des projets solidaires ici et en Afrique")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("Le projet opérationnel de la dynamique, enrichi par les activités mises en commun, confère à TERRAFRIK une plus grande visibilité indispensable pour les plaidoyers")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun("Les ressources humaines de la dynamique (bénévoles des associations membres, stagiaires, volontaires, salariés, intervenants) sont sa force")
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 6. FONCTIONNALITÉS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. Fonctionnalités du site")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1 Fonctionnalités essentielles")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Design responsive", bold: true }),
          new TextRun(" : adaptation mobile, tablette, desktop")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Multilingue", bold: true }),
          new TextRun(" : français en priorité, anglais en option")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Système de gestion de contenu (CMS)", bold: true }),
          new TextRun(" : WordPress ou autre pour faciliter les mises à jour")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Blog / Actualités", bold: true }),
          new TextRun(" : publication d'articles, photos, vidéos")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Calendrier d'événements", bold: true }),
          new TextRun(" : agenda interactif")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Formulaires", bold: true }),
          new TextRun(" : contact, adhésion, demande d'accompagnement")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Espace téléchargement", bold: true }),
          new TextRun(" : documents PDF, rapports, fiches projets")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Galerie multimédia", bold: true }),
          new TextRun(" : photos et vidéos des projets")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Carte interactive", bold: true }),
          new TextRun(" : localisation des projets et partenaires")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Intégration réseaux sociaux", bold: true }),
          new TextRun(" : Facebook, Twitter, Instagram, LinkedIn, YouTube")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2 Fonctionnalités avancées (optionnelles)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Espace membre avec authentification")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Système de dons en ligne (paiement sécurisé)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Newsletter / Inscription mailing list")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Forum ou espace de discussion")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Moteur de recherche interne")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Chat en direct ou chatbot")]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 7. CHARTE GRAPHIQUE
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. Charte graphique")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("La charte graphique de Terrafrik Cameroun s'inspire de l'identité visuelle du réseau Terrafrik international tout en intégrant des éléments culturels camerounais.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.1 Logo")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Le logo Terrafrik représente une montgolfière aux couleurs de l'Afrique, symbolisant l'élévation, le mouvement et l'espoir. Le logo doit être décliné avec la mention « CAMEROUN » en dessous.")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.2 Couleurs principales")]
      }),
      
      // Tableau des couleurs
      (() => {
        const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
        const borders = { top: border, bottom: border, left: border, right: border };
        
        return new Table({
          width: { size: 9026, type: WidthType.DXA },
          columnWidths: [3008, 3009, 3009],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "Couleur", bold: true })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "Code HEX", bold: true })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "Usage", bold: true })]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Orange Terrafrik")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "FF7F00", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "#FF7F00", color: "FFFFFF" })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Couleur principale, logo, titres")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Bleu")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "#2E75B6", color: "FFFFFF" })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Titres, boutons, liens")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Vert")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "70AD47", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "#70AD47", color: "FFFFFF" })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Environnement, agriculture")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Jaune")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "FFC000", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("#FFC000")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Accents, mise en avant")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Gris foncé")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "3D3D3D", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "#3D3D3D", color: "FFFFFF" })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Textes principaux")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 3008, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Gris clair")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("#F2F2F2")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3009, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Fonds, arrière-plans")]
                    })
                  ]
                })
              ]
            })
          ]
        });
      })(),

      new Paragraph({
        spacing: { before: 360 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.3 Typographie")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Titres :", bold: true }),
          new TextRun(" Arial ou Montserrat (gras)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Textes courants :", bold: true }),
          new TextRun(" Arial ou Open Sans (regular)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Citations / slogans :", bold: true }),
          new TextRun(" Italique, couleur orange")
        ]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.4 Iconographie")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Icônes des 3 axes (montgolfière, livre, poignée de main, etc.)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Photographies de terrain authentiques (projets, bénéficiaires, équipes)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Illustrations évoquant l'Afrique, l'agriculture, la jeunesse, l'engagement")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.5 Style visuel")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Design moderne, épuré, dynamique")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Navigation intuitive et fluide")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Mise en avant visuelle des trois axes (bannières colorées, icônes, sections distinctes)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Utilisation d'espaces blancs pour aérer le contenu")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Animations légères (survol, transitions) pour dynamiser l'expérience utilisateur")]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 8. CONTRAINTES TECHNIQUES
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. Contraintes techniques")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Hébergement :", bold: true }),
          new TextRun(" solution fiable et accessible au Cameroun (OVH, o2switch, ou autre)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Nom de domaine :", bold: true }),
          new TextRun(" www.cameroun.terrafrik.org ou www.terrafrik-cameroun.org")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Performance :", bold: true }),
          new TextRun(" temps de chargement rapide (< 3 secondes), optimisation images")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Sécurité :", bold: true }),
          new TextRun(" certificat SSL, sauvegardes régulières, protection contre les malwares")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "Accessibilité :", bold: true }),
          new TextRun(" respect des normes WCAG pour personnes en situation de handicap")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "SEO :", bold: true }),
          new TextRun(" optimisation pour les moteurs de recherche (balises, mots-clés, sitemap)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "RGPD :", bold: true }),
          new TextRun(" conformité avec la protection des données personnelles")
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 9. PLANNING ET LIVRABLES
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("9. Planning et livrables")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.1 Phases du projet")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Phase 1 : Conception et maquettage", bold: true }),
          new TextRun(" (4 semaines)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Validation du cahier des charges")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Création des maquettes (wireframes, mockups)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Validation de la charte graphique")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Phase 2 : Développement", bold: true }),
          new TextRun(" (6 semaines)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Intégration du design")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Développement des fonctionnalités")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Intégration des contenus")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Phase 3 : Tests et recettage", bold: true }),
          new TextRun(" (2 semaines)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Tests fonctionnels")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Tests de compatibilité (navigateurs, appareils)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Corrections")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [
          new TextRun({ text: "Phase 4 : Mise en ligne et formation", bold: true }),
          new TextRun(" (1 semaine)")
        ]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Mise en production")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Formation de l'équipe à la gestion du site")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 1 },
        children: [new TextRun("Documentation technique")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.2 Livrables attendus")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Site web complet et fonctionnel")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Charte graphique (logo, couleurs, typographies)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Manuel d'utilisation du CMS")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Documentation technique")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Formation de l'équipe")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Support post-lancement (3 mois)")]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // 10. BUDGET INDICATIF
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("10. Budget indicatif")]
      }),

      (() => {
        const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
        const borders = { top: border, bottom: border, left: border, right: border };
        
        return new Table({
          width: { size: 9026, type: WidthType.DXA },
          columnWidths: [5415, 3611],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "Poste", bold: true, color: "FFFFFF" })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  shading: { fill: "2E75B6", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun({ text: "Montant estimatif", bold: true, color: "FFFFFF" })]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Conception et maquettage")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun("À définir")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Développement et intégration")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun("À définir")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Hébergement et nom de domaine (1 an)")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun("À définir")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Contenus (rédaction, photos, vidéos)")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun("À définir")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun("Formation et support")]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun("À définir")]
                    })
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders,
                  width: { size: 5415, type: WidthType.DXA },
                  shading: { fill: "FF7F00", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "TOTAL", bold: true, color: "FFFFFF" })]
                    })
                  ]
                }),
                new TableCell({
                  borders,
                  width: { size: 3611, type: WidthType.DXA },
                  shading: { fill: "FF7F00", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [new TextRun({ text: "À définir", bold: true, color: "FFFFFF" })]
                    })
                  ]
                })
              ]
            })
          ]
        });
      })(),

      new Paragraph({
        spacing: { before: 360, after: 240 },
        children: [
          new TextRun({ text: "Note :", italics: true }),
          new TextRun({ text: " Ce budget sera ajusté en fonction des devis des prestataires et des ressources disponibles.", italics: true })
        ]
      }),

      new Paragraph({
        children: [new PageBreak()]
      }),

      // CONCLUSION
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Conclusion")]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("Le site web de Terrafrik Cameroun sera un outil essentiel pour "),
          new TextRun({ text: "valoriser les actions de terrain", bold: true }),
          new TextRun(", "),
          new TextRun({ text: "mobiliser les citoyens", bold: true }),
          new TextRun(", et "),
          new TextRun({ text: "favoriser les partenariats", bold: true }),
          new TextRun(" autour des enjeux de développement durable au Cameroun.")
        ]
      }),

      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun("En mettant en avant les "),
          new TextRun({ text: "trois axes d'intervention", bold: true }),
          new TextRun(" (ECSI-DD, 2A2P, FSA), le site reflétera la dynamique citoyenne portée par Terrafrik et offrira un espace d'échange, d'apprentissage et d'engagement pour tous les acteurs du changement.")
        ]
      }),

      new Paragraph({
        spacing: { after: 480 },
        children: [
          new TextRun({ text: "« La force de l'engagement citoyen »", italics: true, color: "FF7F00", size: 28 })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 720 },
        children: [
          new TextRun({ text: "___", bold: true, size: 32 })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480 },
        children: [
          new TextRun({ text: "Contact :", bold: true, size: 26 })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "TERRAFRIK ALTERNATIVES CAMEROUN", size: 24 })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Email : contact.cameroun@terrafrik.org", size: 22 })
        ]
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Web : www.cameroun.terrafrik.org", size: 22 })
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Terrafrik_Cameroun_Cahier_Besoins.docx", buffer);
  console.log("Document créé avec succès!");
});