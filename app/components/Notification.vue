<template>
    <div class="notification-container">
        <div v-if="notifications.length > 0" class="notifications">
            <div v-for="notification in notifications" :key="notification.id" class="notification"
                :class="getNotificationType(notification.status)" @click="removeNotification(notification.id)">
                <div class="notification-status">{{ notification.status }}</div>
                <div class="notification-message">{{ notification.message }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { notifications, removeNotification, getNotificationType } = useNotifications
</script>

<style scoped>
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
    }

    .notifications {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .notification {
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        min-width: 300px;
        max-width: 400px;
        transition: transform 0.2s, opacity 0.2s;
    }

    .notification:hover {
        transform: scale(1.02);
        opacity: 0.95;
    }

    .notification.success {
        background: #22c55e;
    }

    .notification.critical {
        background: #dc2626;
    }

    .notification.error {
        background: #ef4444;
    }

    .notification.warning {
        background: #f59e0b;
    }

    .notification.info {
        background: #3b82f6;
    }

    .notification-status {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 5px;
    }

    .notification-message {
        font-size: 13px;
    }
</style>
