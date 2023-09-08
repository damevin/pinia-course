<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Vue logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorites tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskCard :task="task" />
      </div>
    </div>

    <!-- tasks lists -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favoriteCount }} tasks left to do</p>
      <div v-for="task in taskStore.favoriteTasks" :key="task.id">
        <TaskCard :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "./stores/TaskStore";
import TaskCard from "./components/TaskCard.vue";
import TaskForm from "./components/TaskForm.vue";

const taskStore = useTaskStore();

// fetch tasks
taskStore.getTasks();
const filter = ref("all");
</script>
