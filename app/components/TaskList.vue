<template>
  <div class="task-list">
    <Task v-for="task in tasks" :key="task.id" :task="task" 
      @toggle="toggleTask" @delete="deleteTask" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Task from './Task.vue';

const tasks = ref([
  { id: 1, title: 'Learn Vue.js', completed: false },
  { id: 2, title: 'Build a Nuxt app', completed: false },
  { id: 3, title: 'Deploy to production', completed: true }
]);

function toggleTask(id: number) {
  const task = tasks.value.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
