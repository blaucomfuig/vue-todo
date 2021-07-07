<template>
  <div class="container-fluid">
    <div class="container-create">
      <input v-model="task" type="text" placeholder="enter new task" class="form-control input-create">
      <button @click="submitTask" type="submit" class="btn btn-success">create</button>
     
    </div>
    <form class="list">
      <div class="list-item" v-for="task in list"  :key="task.index" v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]">
        <div class="list-task">
          <input type="checkbox" v-model="task.done" v-bind:checked="task.done ? true : false" >
          <textarea v-model="task.name" class="input-task" type="text" v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]" @change="saveChange(task.name)"></textarea>
        </div>
        <div class="list-buttons">

          <button type="submit" class="btn-update btn btn-dark " @click="updateTask(task.id)" >
          save
        </button>

          <button v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]" class="btn-delete" @click="deleteTask(task.id)" >
        
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        </button>

        
        </div>
        
      </div>
     
        
      
      
      
    </form>
    
  </div>
</template>

<script>

import axios from 'axios'

const baseURL = "http://localhost:3000/tasks/"

export default {
  data() {
    return{
      task:"",
      updatedTask: "",
      list: [],
      doneTasks : [],
      state: true
      
     
    }
  },

  mounted(){
    this.catchApi();
   

    
  },


  methods: {
    catchApi(){
      axios.get(baseURL).then(response => {
        this.list = response.data
        
      })
    },
    submitTask(){
      axios.post(baseURL, {name: this.task, level: "medium", done: false}).then(() => {
        this.catchApi()
        this.task = ""
        
      })
    },
    deleteTask(id){
      axios.delete(baseURL + id).then(() => {
          this.catchApi()
      })
    },
    saveChange(task){
      this.updatedTask = task;
      console.log(this.updatedTask)
    },
    updateTask(id){
      axios.patch(baseURL + id, {name: this.updatedTask}).then(() => {
        this.catchApi()
      })
    }
  }
}
</script>

<style scoped>

  .container-create{
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
    padding: 0 2rem;
    margin: 2rem auto;
    
  }

  .input-create{
    width:70%;
  }

  .input-task{
    border: none;
    background-color:rgb(207, 230, 189);
    height: 80px;
    width: 180px;
   
  }

  .list{
    display: flex;
    flex-direction: column;
  
    list-style-type: none;
    
   
  }

  .list-item{
    display: flex;
    font-size: 1.2rem;
    align-items: stretch;
    justify-content: center;
    
    
    
    height: 10rem;
    background-color: rgb(207, 230, 189) ;
    margin-bottom: 2rem;
    filter: drop-shadow(2px 3px 5px gray);
    
  }

  .list-task{
    display:flex;
    align-items: center ;
    justify-content: flex-start;
  
    margin-left: 1rem;

   
  }

  input[type=checkbox]{
    height: 30px;
    width: 30px;
  }

  .list-task textarea{
    padding-left: 1rem;
    width: 60%;
  }

  .list-buttons{
    margin-right: 0;
    display: flex;
    align-items: center;
   
  }

  .btn-update{
    
    margin-right:1rem;
   
  }

  .btn-update svg{
     transition:all ease 0.3s;
  }

  .btn-update svg:hover{
    
    transform:scale(1.2);
  }
  

  .btn-delete{
   
    border:none;
    background-color:rgb(207, 230, 189);
    
  }

  .btn-delete svg{
    transition: all ease 0.3s;
  }

  

  .btn-delete svg:hover{
    
    transform:scale(1.2);
  }

</style>