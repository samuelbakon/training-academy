<template>
  <div class="task-item">
    <span :class="{ completed: task.completed }">{{ task.title }}</span>
    <input type="checkbox" :checked="task.completed" @change="toggleTask">
    <button @click="deleteTask">Delete</button>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: number
  title: string
  completed: boolean
}

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void,
  (e: 'delete', id: number): void,
}>()

function toggleTask() {
  emit('toggle', props.task.id)
}

function deleteTask() {
  emit('delete', props.task.id)
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 2px solid #727272;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369870;
}
</style>
