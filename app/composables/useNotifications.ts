export interface NotificationItem {
    id: number
    status: number
    message: string
    tag?: string
}

const statusMessages: Record<number, string> = {
    200: 'Succès',
    201: 'Créé',
    202: 'Accepté',
    204: 'Aucun contenu',
    400: 'Requête incorrecte',
    401: 'Non autorisé',
    402: 'Paiement requis',
    403: 'Accès refusé',
    404: 'Ressource non trouvée',
    405: 'Méthode non autorisée',
    406: 'Format non accepté',
    407: 'Authentification proxy requise',
    408: 'Délai de requête dépassé',
    409: 'Conflit de données',
    410: 'Ressource définitivement supprimée',
    411: 'Longueur requise',
    412: 'Précondition échouée',
    413: 'Payload trop volumineux',
    414: 'URI trop longue',
    415: 'Type de média non supporté',
    416: 'Plage non satisfaisable',
    417: 'Échec de l\'expectation',
    418: 'Je suis une théière',
    422: 'Entité non traitable',
    423: 'Verrouillé',
    424: 'Échec de dépendance',
    425: 'Trop tôt',
    426: 'Mise à niveau requise',
    428: 'Précondition requise',
    429: 'Trop de requêtes',
    431: 'Champs d\'en-tête trop volumineux',
    451: 'Indisponible pour raisons légales',
    500: 'Erreur interne du serveur',
    501: 'Non implémenté',
    502: 'Mauvaise passerelle',
    503: 'Service indisponible',
    504: 'Délai de la passerelle dépassé',
    505: 'Version HTTP non supportée',
    506: 'Variante négocie',
    507: 'Espace insuffisant',
    508: 'Boucle détectée',
    510: 'Non étendu',
    511: 'Authentification réseau requise',
}

const tagMessages: Record<string, Record<number, string>> = {
    products: {
        404: 'Produit non trouvé',
        200: 'Produit récupéré avec succès',
    },
}

const notifications = ref<NotificationItem[]>([])
let notificationIdCounter = 0

const useNotifications = () => {
    const addNotification = (status: number, tag?: string) => {
        let message = statusMessages[status] || 'Erreur inconnue'
        
        if (tag && tagMessages[tag] && tagMessages[tag][status]) {
            message = tagMessages[tag][status]
        }

        notifications.value.push({
            id: ++notificationIdCounter,
            status,
            message,
            tag
        })

        console.log('addNotification', notifications.value)
    }

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(e => e.id !== id)
    }

    const getNotificationType = (status: number): string => {
        if (status >= 500) return 'critical'
        if (status >= 400) return 'error'
        if (status >= 300) return 'warning'
        if (status >= 200) return 'success'
        return 'info'
    }

    return {
        notifications,
        addNotification,
        removeNotification,
        getNotificationType
    }
}

export default useNotifications()