import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { taskService } from '../services/taskService'

Vue.use(Vuex, axios);

export default new Vuex.Store({
    state : {
        tasks : [],
        doneTasks: [],
    },
    mutations : {
        GET_TODO_TASKS(state, tasks){
            let todoTasks =  tasks.filter(task => task.done === false);
            state.tasks = todoTasks;
        },
        GET_DONE_TASKS(state, tasks){
            let doneTasks = tasks.filter(task => task.done === true);
            state.doneTasks = doneTasks;
        }
    },
    actions : {
        loadTodoTasks({commit}){
            taskService.getTasks()
                .then((response) => {
                    commit('GET_TODO_TASKS', response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        },

        loadDoneTasks({commit}){
            taskService.getTasks()
                .then((response) => {
                    commit('GET_DONE_TASKS', response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        submitTask({commit}, newTask){
            taskService.submitTask(newTask)
        },

        deleteTask({commit}, id){
            taskService.deleteTask(id)
        },

        updateTask({commit}, {id, updatedTask}){
            taskService.updateTask(id, updatedTask)
                .then((response) => {
                    commit('GET_TODO_TASKS', response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
})