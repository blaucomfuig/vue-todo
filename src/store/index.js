import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {taskService} from '../services/taskService'

Vue.use(Vuex, axios)


export default new Vuex.Store({
    state : {
        tasks : []
    },
    actions : {
        async loadTodoTasks({commit}){
           const res = await taskService.getAll()
           let tasks = res.data
           commit('getDoneTasks', tasks)
        },
        async loadAllTasks({commit}){
           const res = await taskService.getAll()
           let tasks = res.data
           commit('getAllTasks', tasks)
        },

        async submitTask({commit}, newTask){
            const res = await taskService.submitTask(newTask)
            let tasks = res.data
            commit('getDoneTasks', tasks)
        },

        async deleteTask({commit}, id){
            const res = await taskService.deleteTask(id)
            let tasks = res.data
            commit('getDoneTasks', tasks) 
        },

        async updateTask({commit}, {id, updatedTask}){
            const res = await taskService.updateTask(id, updatedTask)
            let tasks = res.data
            commit('getDoneTasks', tasks) 
        }
    },
    mutations : {
        getDoneTasks(state, tasks){
            state.tasks = tasks.filter(task => task.done ===false) 
        },
        getAllTasks(state, tasks){
            state.tasks = tasks
        }
    }
})