import axios from 'axios'

const baseURL = "http://localhost:3000/"
    
export const taskService = {
    getAll(){
        return axios.get(baseURL + "tasks")
    },
    submitTask(newTask){
        axios.post(baseURL + "tasks", {name: newTask, level: "medium", done: false })

        return this.getAll()
        
    },
    deleteTask(id){
        axios.delete(baseURL + "tasks/" + id)

        return this.getAll()
    },
    updateTask(id, updatedTitle, updatedStatus){
        axios.patch(baseURL + "tasks/" + id, {name: updatedTitle, done: updatedStatus})

        return this.getAll();
    }
}