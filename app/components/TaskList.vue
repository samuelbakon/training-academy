<template>
  <div class="task-list">
    <Task v-for="task in tasks" :key="task.id" :task="task" @toggle="toggleTask" @delete="deleteTask" />
  </div>
</template>

<script setup lang="ts">
  import Task from './Task.vue';
  import { useTask } from '~/composables/useTask';

  const { tasks, toggleTask, deleteTask } = useTask();

</script>

<style scoped>
  .task-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }
</style>
