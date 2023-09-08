<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="I need to..." v-model="newTask" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
const taskStore = useTaskStore();

const newTask = ref("");

const handleSubmit = () => {
  if (!newTask.value.length) return;
  taskStore.addTask({
    title: newTask.value,
    isFav: false,
    id: Math.floor(Math.random() * 10000),
  });
  newTask.value = "";
};
</script>
