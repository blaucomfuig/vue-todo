import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
})
    
export const taskService = {
    getTasks(){
        return apiClient.get("/tasks");
    },
    submitTask(newTask){
        apiClient.post("/tasks", newTask)
        return this.getTasks()
    },
    deleteTask(id){
        apiClient.delete("/tasks/" + id)
        return this.getTasks()
    },
    updateTask(id, updatedTask){
        apiClient.patch("/tasks/" + id, updatedTask)
        return this.getTasks();
    }
}