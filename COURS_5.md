# Suite du Module – Frontend Moderne avec Nuxt

## Objectif pédagogique

Dans cette suite, vous allez approfondir votre maîtrise de Nuxt en découvrant des mécanismes essentiels pour construire des applications dynamiques, réactives et bien structurées.

---

## 1. Propriétés calculées et Observateurs

## Contexte

Vous développez un tableau de bord où certaines valeurs doivent se recalculer automatiquement en fonction des données utilisateur.

## Compréhension approfondie

Dans Vue (et donc Nuxt), il existe deux logiques fondamentales :

* **dériver une valeur** → computed
* **réagir à un changement** → watch / watchEffect

### computed (logique dérivée)

Une propriété calculée est une valeur **basée sur d'autres valeurs réactives**.
Elle est **mise en cache automatiquement** et recalculée uniquement si ses dépendances changent.

Elle retourne toujours une valeur.

Cas d’usage :

* Calcul de total
* Filtrage de liste
* Transformation de données

Point clé : Vue considère computed comme une "source de vérité dérivée".

---

### watch (réaction ciblée)

watch permet de surveiller **une source précise** et déclencher une action uniquement quand elle change.

Caractéristiques importantes :

* Déclenchement uniquement si la valeur change
* Accès à l’ancienne et la nouvelle valeur
* Contrôle précis du déclenchement ([guide.vueframework.com](https://guide.vueframework.com/guide/reactivity-computed-watchers.html?utm_source=chatgpt.com))

Cas d’usage :

* Appel API après modification
* Synchronisation avec stockage externe
* Logging

---

### watchEffect (réaction automatique)

watchEffect exécute immédiatement une fonction et **détecte automatiquement toutes ses dépendances**.

Différence majeure :

* Pas besoin de préciser quoi observer
* Se relance dès qu'une dépendance utilisée change ([vuejs.org](https://vuejs.org/guide/essentials/watchers.html?utm_source=chatgpt.com))

Cas d’usage :

* Effets complexes avec plusieurs dépendances
* Code rapide à écrire mais moins explicite

---

## Différence stratégique (important)

* computed → pour produire une valeur
* watch → pour déclencher une action précise
* watchEffect → pour automatiser une réaction globale

Bonne pratique :
Toujours privilégier **computed avant watch** si le besoin est uniquement de calculer une valeur.

---

**Exemple concret**

Cas : un panier e-commerce où on doit recalculer le total et sauvegarder automatiquement côté serveur.

```vue
<script setup>
const price = ref(5000)
const quantity = ref(1)

// Valeur dérivée (affichage UI)
const total = computed(() => price.value * quantity.value)

// Synchronisation API quand le total change
watch(total, async (newTotal) => {
  await $fetch('/api/save-total', {
    method: 'POST',
    body: { total: newTotal }
  })
})

// Log automatique (debug)
watchEffect(() => {
  console.log(`Total actuel: ${total.value}`)
})

// Mise à jour dynamique basée sur price ET quantity
watch([price, quantity], ([newPrice, newQty]) => {
  console.log(`Nouveau total recalculé: ${newPrice * newQty}`)
})
</script>
```

### TP – Cas Pratique

- Créer un mini formulaire avec `price` et `quantity` et afficher `total` via `computed`.
- Utiliser `watch(total)` pour déclencher un appel `$fetch` simulé (POST) avec débounce 300 ms.
- Ajouter un `watchEffect` pour logger les changements et nettoyer proprement si nécessaire.

### Exercice

- Étendre l'exemple pour surveiller `[price, quantity]` et empêcher les valeurs négatives (corriger automatiquement à 0 via `watch`).
- Ajouter un indicateur d’état "sauvegarde en cours" qui se met à jour selon `watch`.

---

## 2. Les Composables

## Contexte

Vous souhaitez réutiliser une logique métier (API, état, calculs) dans plusieurs composants.

## Définition

Un composable est une fonction réutilisable basée sur la ***Composition API***.

**Exemple concret avec DOM**

Cas : un panier simple où l’utilisateur saisit un prix et une quantité, et le total se met à jour automatiquement dans l’interface.

### 1. Composable

```vue
<script setup>
// composables/useCart.js
export const useCart = () => {
  const price = ref(0)
  const quantity = ref(1)
  const items = ref([])

  const total = computed(() => price.value * quantity.value)

  const addToCart = () => {
    items.value.push({
      price: price.value,
      quantity: quantity.value,
      total: price.value * quantity.value
    })
  }

  const removeFromCart = (index) => {
    items.value.splice(index, 1)
  }

  return {
    price,
    quantity,
    total,
    items,
    addToCart,
    removeFromCart
  }
}
</script>
```

### 2. Utilisation dans un composant Vue/Nuxt

```vue
<script setup>
const { price, quantity, total, items, addToCart, removeFromCart } = useCart()
</script>

<template>
  <div>
    <h2>Panier</h2>

    <label>Prix :</label>
    <input type="number" v-model="price" />

    <label>Quantité :</label>
    <input type="number" v-model="quantity" />

    <h3>Total : {{ total }}</h3>

    <button @click="addToCart">Ajouter au panier</button>

    <h3>Articles :</h3>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.quantity }} x {{ item.price }} = {{ item.total }}
        <button @click="removeFromCart(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>
```

** À retenir

* Le composable contient la logique métier
* Le composant gère uniquement l’affichage (DOM)
* Cette séparation rend le code testable, réutilisable et propre

Si tu fais l’inverse (logique dans le composant), ton application devient vite ingérable et surtout intestable.

### TP – Cas Pratique

- Créer un composable `useCart` puis l’utiliser dans deux composants distincts (liste et récapitulatif).
- Partager l’état et vérifier que les deux composants se mettent à jour sans prop drilling.

### Exercice

- Ajouter une méthode `clearCart` et une persistance locale (localStorage) dans le composable.
- Couvrir le composable par un test unitaire simple (structure d’API et valeurs par défaut).

---

## 3. Métadonnées avec Nuxt

## Contexte

Vous développez une page produit dynamique (SSR + SEO) avec des données chargées depuis une API et un contenu partageable sur les réseaux sociaux.

## Outils

* definePageMeta
* useSeoMeta
* useHead

**Exemple avancé avec composant complet (page produit dynamique)**

```vue
<script setup>
const route = useRoute()

// Chargement des données produit (SSR + réactif)
const { data: product } = await useFetch(`/api/products/${route.params.id}`)

// Configuration du layout et du middleware
definePageMeta({
  layout: 'product',
  middleware: ['auth']
})

// SEO dynamique basé sur les données produit
useSeoMeta({
  title: product.value?.name,
  description: product.value?.description,
  ogTitle: product.value?.name,
  ogDescription: product.value?.description,
  ogImage: product.value?.image
})

// Personnalisation avancée du head
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  bodyAttrs: {
    class: 'product-page'
  },
  link: [
    {
      rel: 'canonical',
      href: `https://monsite.com/products/${route.params.id}`
    }
  ]
})
</script>

<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" />
    <p>{{ product.description }}</p>
    <strong>{{ product.price }} FCFA</strong>
  </div>
</template>
```

## Ce qui se passe réellement

* useFetch charge les données côté serveur (SEO friendly)
* Les métadonnées sont générées dynamiquement
* Google et les réseaux sociaux lisent directement les bonnes infos
* La page est optimisée sans effort côté client

** À retenir

* Toujours lier SEO aux données dynamiques
* definePageMeta sert aussi à la sécurité (middleware)
* useHead permet un contrôle total du document HTML

### TP – Cas Pratique

- Créer une page `/products/[id].vue` avec `useFetch` SSR et `useSeoMeta` dynamiques.
- Ajouter un lien canonique et un layout spécifique via `definePageMeta`.

### Exercice

- Ajouter les balises Open Graph et Twitter Card supplémentaires et vérifier le rendu SSR.
- Simuler un cas d’erreur (produit introuvable) et adapter les métadonnées (title/description).

---

## 4. Cycle de vie des composants

## Contexte

Vous devez charger des données, initialiser des comportements DOM et nettoyer proprement les ressources.

## Hooks principaux

* onBeforeMount
* onMounted
* onUnmounted

**Exemple**

```vue
<script setup>
const products = ref([])
const loading = ref(true)

// Avant montage (rarement utilisé pour API)
onBeforeMount(() => {
  console.log('Avant montage')
})

// Chargement des données + interaction DOM
onMounted(async () => {
  const data = await $fetch('/api/products')
  products.value = data
  loading.value = false

  // Exemple DOM : focus automatique
  document.querySelector('input')?.focus()
})

// Nettoyage (éviter fuite mémoire)
onUnmounted(() => {
  console.log('Nettoyage composant')
})
</script>

<template>
  <div>
    <h2>Produits</h2>

    <input placeholder="Rechercher..." />

    <p v-if="loading">Chargement...</p>

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>
```

## Ce qui se passe réellement

* onMounted est le bon moment pour appeler une API côté client
* Le DOM est disponible (focus, manipulation)
* onUnmounted évite les fuites mémoire (timers, listeners)

** À retenir

* Ne pas appeler d’API dans onBeforeMount
* onMounted = interaction DOM + logique client
* Toujours nettoyer ce que tu crées (listeners, intervals)
* Mauvaise gestion du cycle de vie = bugs invisibles en production

### TP – Cas Pratique

- Implémenter un composant qui ajoute un `resize` listener en `onMounted` et le nettoie en `onUnmounted`.
- Charger des données client-side et afficher un skeleton jusqu’à la fin du chargement.

### Exercice

- Mettre en place un `IntersectionObserver` dans `onMounted` pour lazy-loader une liste d’images puis le déconnecter au unmount.
- Ajouter un timeout/retry et assurer le cleanup des timers.

---

## 5. Utilisation de $fetch et useFetch

## Contexte

Vous construisez une application réelle (dashboard, e-commerce, SaaS) avec :

* chargement de données serveur (SSR)
* interactions utilisateur (client)
* gestion d’erreurs et états de chargement

## Différences approfondies

* $fetch : appel HTTP direct (comme fetch amélioré)
* useFetch : hook Nuxt réactif, SSR + cache + hydration

Règle terrain :

* useFetch → pour afficher des données dans une page
* $fetch → pour déclencher une action (POST, PUT, DELETE)

---

**Exemple avancé : page complète avec gestion loading + erreur**

```vue
<script setup>
const { data: products, pending, error, refresh } = await useFetch('/api/products', {
  lazy: true
})
</script>

<template>
  <div>
    <h2>Produits</h2>

    <p v-if="pending">Chargement des produits...</p>

    <p v-else-if="error">Erreur lors du chargement</p>

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>

    <button @click="refresh">Rafraîchir</button>
  </div>
</template>
```

---

**Exemple avancé : requêtes avec paramètres (query)**

```vue
<script setup>
const search = ref('ordinateur')

const { data, refresh } = await useFetch('/api/products', {
  query: {
    q: search,
    category: 'tech'
  }
})

// /api/products?q=ordinateur&category=tech
</script>

```

Comportement :

* Les refs sont automatiquement transformées en paramètres
* Toute modification de search déclenche un refetch

---

**Exemple avancé : interceptors (niveau production)**

```vue
<script setup>
const { data, error } = await useFetch('/api/auth/login', {
  onRequest({ options }) {
    options.headers.set('Authorization', 'Bearer token')
  },
  onResponse({ response }) {
    localStorage.setItem('token', response._data.token)
  },
  onResponseError({ response }) {
    console.error('Erreur API', response.status)
  }
})
</script>

```

Utilité réelle :

* centraliser auth
* intercepter erreurs globales
* injecter headers automatiquement

---

**Exemple avancé : clé réactive (refetch automatique)**

```vue
<script setup>
const route = useRoute()
const id = computed(() => route.params.id)

const { data: product } = await useFetch(() => `/api/products/${id.value}`)
</script>
```

Comportement :

* changement d’URL → refetch automatique
* synchronisation parfaite avec le routing

---

**Exemple avancé : options réactives**

```vue
<script setup>
const searchQuery = ref('iphone')

const { data } = await useFetch('/api/search', {
  query: { q: searchQuery }
})

// déclenche automatiquement un refetch
searchQuery.value = 'samsung'
</script>

```

Désactiver le refetch automatique :

```vue
<script setup>
const { data } = await useFetch('/api/search', {
  query: { q: searchQuery },
  watch: false
})
</script>

```

---

## Partage d’état (important)

Si plusieurs composants utilisent useFetch avec les mêmes paramètres :

```vue
<script setup>
useFetch('/api/products')
</script>
```

Alors :

* data, error et pending sont partagés
* évite les appels API dupliqués

Accès global :

```vue
<script setup>
const { data } = useNuxtData('/api/products')
</script>
```

---

## Ce qui se passe réellement

* useFetch construit automatiquement les URLs (query)
* Nuxt gère cache + SSR + synchronisation
* Les options réactives pilotent les refetch

### TP – Cas Pratique

- Construire une page `/products` avec `useFetch` (lazy) + gestion `pending/error` + bouton `refresh`.
- Ajouter une barre de recherche liée à `query` et observer le refetch automatique.

### Exercice

- Implémenter un interceptor `onRequest/onResponse` pour tracer les temps de réponse et les erreurs.
- Ajouter une clé réactive basée sur la route pour charger un produit selon `params.id`.

---

## 6. Gestion des cookies

## Contexte

Vous implémentez une authentification utilisateur (token JWT, session).

**Exemple avancé : gestion complète d’un token**

```vue
<script setup>
const token = useCookie('auth_token')

const login = async () => {
  const response = await $fetch('/api/login', {
    method: 'POST',
    body: {
      email: 'user@test.com',
      password: '123456'
    }
  })

  token.value = response.token
}

const logout = () => {
  token.value = null
}
</script>

<template>
  <div>
    <button @click="login">Se connecter</button>
    <button @click="logout">Se déconnecter</button>

    <p v-if="token">Utilisateur connecté</p>
    <p v-else>Non connecté</p>
  </div>
</template>
```

**Exemple avancé : utilisation automatique du cookie dans les requêtes**

```vue
<script setup>
const token = useCookie('auth_token')

const { data } = await useFetch('/api/secure-data', {
  headers: {
    Authorization: `Bearer ${token.value}`
  }
})
</script>

```

## Ce qui se passe réellement

* Le cookie est partagé entre serveur et client
* Nuxt injecte automatiquement la valeur côté SSR
* Permet une authentification persistante

** À retenir

* useCookie est réactif (UI mise à jour automatique)
* Parfait pour auth, préférences, session
* Toujours sécuriser côté serveur (ne jamais faire confiance au cookie seul)

### TP – Cas Pratique

- Créer une page `/login` qui stocke un token dans `useCookie` après un `$fetch` réussi, puis redirige.
- Protéger une page via middleware `auth` qui vérifie la présence du cookie.

### Exercice

- Ajouter l’injection automatique du token dans les headers d’un `useFetch` via un petit utilitaire/composable.
- Gérer l’expiration du token et la déconnexion automatique (suppression du cookie).

---

## 7. Gestion de l’état global avec useState

## Contexte

Votre application comporte plusieurs pages (produits, panier, profil) qui doivent partager les mêmes données sans duplication ni incohérence.

Dans Nuxt, useState est la solution native pour gérer cet état global.

---

## Compréhension approfondie

useState permet de créer un état global réactif, partagé entre tous les composants.

```vue
<script setup>
const count = useState('counter', () => Math.round(Math.random() * 100))
</script>
```

Caractéristiques importantes :

* La clé ('counter') identifie l’état global
* La fonction initialise la valeur une seule fois
* L’état est partagé entre toutes les pages

---

**Exemple concret : panier global partagé**

```vue
<script setup>
// composables/useCartState.js
export const useCartState = () => {
  const cart = useState('cart', () => [])

  const addToCart = (product) => {
    cart.value.push(product)
  }

  const total = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  return {
    cart,
    addToCart,
    total
  }
}
</script>
```

Utilisation dans plusieurs pages :

```vue
<script setup>
const { cart, total } = useCartState()
</script>

<template>
  <div>
    <h2>Panier global</h2>
    <p>Total : {{ total }}</p>
  </div>
</template>
```

---

## Ce qui se passe réellement

* L’état est créé une seule fois côté serveur
* Il est hydraté côté client
* Tous les composants partagent la même source de vérité

---

## Contraintes importantes

* useState sérialise les données en JSON

* Ne pas stocker :

  * fonctions
  * classes
  * symboles

* useState est un nom réservé (ne jamais redéfinir)

---

## Optimisation avec shallowRef

Si votre état contient de gros objets (listes, datasets), vous pouvez améliorer les performances :

```vue
<script setup>
const state = useState('my-shallow-state', () => shallowRef({
  deep: 'not reactive'
}))
</script>
```

Effet :

* Vue ne surveille pas profondément les changements
* Moins de recalculs → meilleures performances

---

## Cas avancé : synchronisation avec API + état global

```vue
<script setup>
const { cart, total } = useCartState()

const saveCart = async () => {
  await $fetch('/api/cart', {
    method: 'POST',
    body: cart.value
  })
}

watch(cart, saveCart, { deep: true })
</script>
```

---

** À retenir 

* useState = store global simplifié
* Idéal pour remplacer Vuex/Pinia dans les cas simples
* Toujours penser “source de vérité unique”
* shallowRef = optimisation critique pour gros états
* Mauvaise structuration de l’état = bugs difficiles à tracer

### TP – Cas Pratique

- Créer un `useCartState` global (add/remove/clear + `total` en `computed`).
- L’utiliser dans deux pages (`/products` et `/cart`) et synchroniser automatiquement avec une API via `watch` (deep).

### Exercice

- Remplacer l’état profond par `shallowRef` et mesurer l’impact en simulant 1000 items.
- Ajouter une persistance SSR-friendly en sérialisant/désérialisant proprement.

---

# Exercice pratique

## Mission (niveau projet réel)

Construire une mini application e-commerce complète avec authentification et persistance :

### 1. Authentification (login / logout)

* Page /login avec formulaire (email, password)
* Appel API via $fetch (POST /api/login)
* Stockage du token avec useCookie('auth_token')
* Bouton logout qui supprime le token
* Affichage conditionnel (connecté / non connecté)

### 2. Sécurisation

* Middleware "auth" qui bloque l’accès aux pages protégées si pas de token
* Redirection vers /login

### 3. Liste de produits

* Page /products avec useFetch
* Gestion loading / error
* Recherche avec query (q=...)
* Rafraîchissement avec refresh

### 4. Panier global

* Composable useCartState basé sur useState
* Ajout au panier (addToCart)
* Suppression (removeFromCart)
* Calcul total global avec computed

### 5. Synchronisation API

* Sauvegarde automatique du panier via watch (deep)
* Endpoint POST /api/cart

### 6. SEO dynamique

* useSeoMeta sur la page produit
* title, description dynamiques

### 7. Interaction avancée

* Bouton "Ajouter au panier" sur chaque produit
* Badge du nombre d’articles (global)
* Page /cart affichant les éléments

---

## Contraintes techniques

* Utiliser useFetch pour lecture
* Utiliser $fetch pour actions (login, save cart)
* Utiliser useState pour état global
* Utiliser useCookie pour auth
* Gérer erreurs + loading partout

---

## Architecture attendue

* composables/

  * useCartState.js
* pages/

  * login.vue
  * products.vue
  * cart.vue
* middleware/

  * auth.js

---

## Livrables attendus

* Application fonctionnelle avec navigation
* Authentification complète (login/logout)
* Panier global persistant
* Code structuré (séparation logique / UI)
* Gestion des états propre (loading, error, empty)

---

## Bonus

* Persistance du panier côté backend
* Interceptor global pour injecter automatiquement le token
* Optimisation avec shallowRef si panier volumineux
* Empêcher doublons dans le panier (merge des quantités)

---

## Objectif pédagogique réel

Comprendre et maîtriser le flux complet :
API → état global → UI → utilisateur → API

---

# Conclusion

Vous avez désormais les bases avancées pour construire une application Nuxt moderne, performante et maintenable.
