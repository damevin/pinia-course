import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false
  }),
  getters: {
    favoriteTasks() {
      return this.tasks.filter(task => task.isFav)
    },

    favoriteCount() {
      return this.tasks.reduce((previous, current) => {
        return current.isFav ? previous + 1 : previous
      }, 0)
    },

    totalCount: (state) => {
      return state.tasks.length
    }
  },

  actions: {
    async getTasks() {
      this.isLoading = true
      const response = await fetch('http://localhost:3000/tasks')
      const data = await response.json()

      this.tasks = data
      this.isLoading = false
    },

    addTask(task) {
      this.tasks.push(task)
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    toggleFav(id) {
      const task = this.tasks.find(task => task.id === id)
      task.isFav = !task.isFav
    }
  }
})
