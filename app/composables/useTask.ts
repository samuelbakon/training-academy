const  useTask = () => {
    const tasks = ref([
        { id: 1, title: 'Learn Vue.js', completed: false },
        { id: 2, title: 'Build a Nuxt app', completed: false },
        { id: 3, title: 'Deploy to production', completed: true }
    ]);

    const toggleTask = (id: number) => {
        const task = tasks.value.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    }

    const deleteTask = (id: number) => {
        tasks.value = tasks.value.filter(t => t.id !== id);
    }

    return {
        tasks,
        toggleTask,
        deleteTask
    }
}

export { useTask }