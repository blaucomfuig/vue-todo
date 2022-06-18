import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {taskService} from '../services/taskService'

Vue.use(Vuex, axios)


export default new Vuex.Store({
    state : {
        tasks : [],
        doneTasks: [],
    },
    actions : {
        async loadTodoTasks({commit}){
           const res = await taskService.getAll()
           let tasks = res.data;
           commit('getTodoTasks', tasks)
        },

        async loadDoneTasks({commit}){
           const res = await taskService.getAll()
           let tasks = res.data;
           commit('getDoneTasks', tasks)
        },

        async submitTask({commit}, newTask){
            const res = await taskService.submitTask(newTask)
            let tasks = res.data
            commit('getTodoTasks', tasks)
        },

        async deleteTask({commit}, id){
            const res = await taskService.deleteTask(id)
            let tasks = res.data
            commit('getTodoTasks', tasks) 
        },

        async updateTask({commit}, {id, updatedTask}){
            const res = await taskService.updateTask(id, updatedTask)
            let tasks = res.data
            commit('getTodoTasks', tasks) 
        }
    },
    mutations : {
        getTodoTasks(state, tasks){
            state.tasks = tasks.filter(task => task.done === false) 
        },
        getDoneTasks(state, tasks){
            state.doneTasks = tasks.filter(task => task.done === true);
        }
    }
})