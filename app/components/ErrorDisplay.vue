<template>
    <div class="error-display">
        <div v-for="error in errors" :key="error.code + error.field" class="error-item">
            <div class="error-icon">⚠️</div>
            <div class="error-content">
                <div class="error-message">
                    {{ error.message }}
                </div>

                <div v-if="error.metadata && Object.keys(error.metadata).length > 0" class="error-details">
                    <div v-for="(value, key) in error.metadata" :key="key" class="detail-item">
                        <span class="detail-label">{{ formatKey(key) }}:</span>
                        <span class="detail-value">{{ formatValue(value) }}</span>
                    </div>
                </div>

                <div v-if="error.suggestedAction" class="error-actions">
                    <button @click="handleSuggestedAction(error)" class="action-button"
                        :class="getActionClass(error.suggestedAction)">
                        {{ getActionLabel(error.suggestedAction) }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
    interface Props {
        errors: BusinessErrors[]
    }

    const props = defineProps<Props>()
    const emit = defineEmits<{
        removeItem: [productId: number]
        adjustQuantity: [productId: number, quantity: number]
        contactSupport: [productId: number, issue: string]
    }>()

    const formatKey = (key: string): string => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    const formatValue = (value: any): string => {
        if (typeof value === 'number') {
            return value.toString()
        }
        return String(value)
    }

    const getActionLabel = (action: string): string => {
        if (action.includes('Remove')) return '🗑️ Remove Item'
        if (action.includes('Reduce')) return '➖ Reduce Quantity'
        if (action.includes('Set quantity')) return '✏️ Set Quantity'
        if (action.includes('Contact support')) return '📧 Contact Support'
        return '🔧 Fix Issue'
    }

    const getActionClass = (action: string): string => {
        if (action.includes('Remove')) return 'remove'
        if (action.includes('Reduce')) return 'reduce'
        if (action.includes('Set')) return 'adjust'
        if (action.includes('Contact')) return 'support'
        return 'default'
    }

    const handleSuggestedAction = (error: BusinessErrors) => {
        error.action()
    }
</script>

<style scoped>
    .error-display {
        margin: 1rem 0;
    }

    .error-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        background: linear-gradient(135deg, #fff5f5 0%, #fee 100%);
        border: 1px solid #fecaca;
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
        transition: all 0.2s ease;
    }

    .error-item:hover {
        box-shadow: 0 4px 8px rgba(239, 68, 68, 0.15);
        transform: translateY(-1px);
    }

    .error-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 0.25rem;
    }

    .error-content {
        flex: 1;
        min-width: 0;
    }

    .error-message {
        color: #dc2626;
        font-weight: 600;
        margin-bottom: 0.75rem;
        line-height: 1.4;
    }

    .error-details {
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        padding: 0.75rem;
        margin-bottom: 1rem;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem 0;
        font-size: 0.9rem;
    }

    .detail-item:not(:last-child) {
        border-bottom: 1px solid #fecaca;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .detail-label {
        color: #7f1d1d;
        font-weight: 500;
    }

    .detail-value {
        color: #991b1b;
        font-weight: 600;
    }

    .error-actions {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .action-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .action-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .action-button.remove {
        background-color: #ef4444;
        color: white;
    }

    .action-button.remove:hover {
        background-color: #dc2626;
    }

    .action-button.reduce {
        background-color: #f59e0b;
        color: white;
    }

    .action-button.reduce:hover {
        background-color: #d97706;
    }

    .action-button.adjust {
        background-color: #3b82f6;
        color: white;
    }

    .action-button.adjust:hover {
        background-color: #2563eb;
    }

    .action-button.support {
        background-color: #8b5cf6;
        color: white;
    }

    .action-button.support:hover {
        background-color: #7c3aed;
    }

    .action-button.default {
        background-color: #6b7280;
        color: white;
    }

    .action-button.default:hover {
        background-color: #4b5563;
    }

    @media (max-width: 640px) {
        .error-item {
            flex-direction: column;
            gap: 0.75rem;
        }

        .error-icon {
            align-self: flex-start;
        }

        .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }

        .action-button {
            flex: 1;
            justify-content: center;
        }
    }
</style>
