import axios from 'axios'

const baseURL = "http://localhost:3000/"
    
export const taskService = {
    getAll(){
        return axios.get(baseURL + "tasks")
    },
    submitTask(newTask){
        axios.post(baseURL + "tasks", newTask)

        return this.getAll()
        
    },
    deleteTask(id){
        axios.delete(baseURL + "tasks/" + id)

        return this.getAll()
    },
    updateTask(id, updatedTask){
        axios.patch(baseURL + "tasks/" + id, updatedTask)

        return this.getAll();
    }
}