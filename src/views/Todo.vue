<template>
  <div class="container-fluid">

    <div class="img-container">
      <img class="img-home" src="../assets/eternal.png" alt="">
    </div>
    <div class="container-create">
      <input v-model="task" type="text" placeholder="enter new task" class="form-control input-create">
      <button @click="submitTask" type="submit" class="btn btn-success">create</button>
      
     



    </div>
    <form class="list">
      <Task v-for="task in tasks" :key="task.index" :id="task.id" :name="task.name" :done="task.done" :stateEdit="stateEdit" :task="task" :state="state" :updatedTask="updatedTask" @saveDone="saveDone" @enableEdit="enableEdit()" @updateTask="updateTask(task.id)" @deleteTask="deleteTask(task.id)" />
        
      
      
      
    </form>
    
  </div>
</template>

<script>

import Task from '@/components/Task.vue'

export default {
  components: {
    Task
  },
  data() {
    return{
      task:"",
      updatedTask: "",

      state: false,
      stateEdit : false
    }
  },

  computed: {
    tasks(){
      return this.$store.state.tasks
    },
   

  },

  mounted(){
    this.catchApi();
  },


  methods: {
    async catchApi(){
        this.$store.dispatch('loadTodoTasks')
    },
      
    async submitTask(){
      let newTask = this.task
      
        this.$store.dispatch('submitTask', {
          name: newTask, 
          level: "medium", 
          done: false 
        })
      
      this.task = ""
        
      
    },

    async deleteTask(id){

      this.$store.dispatch('deleteTask', id)


    },
    
    async updateTask(id){
      let updatedStatus = this.state
      let updatedTitle = this.updatedTask
    
         //atencion aqui, el destructuring objects que me me salvo la vida
      this.$store.dispatch('updateTask', {
        id, 
        updatedTask: {
          name: updatedTitle, 
          level: "medium", 
          done: updatedStatus
        }
      })
    

      this.updatedTask = ""
      

    

     
    },

    enableEdit(){
      this.stateEdit = !this.stateEdit  
    },


    
    saveDone(){
      this.state= !this.state
      
      
    },

  
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

  .img-home{
    width: 10rem;
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

  .task-name{
    display: flex;
    justify-content: flex-start;
    width: 17rem;
    font-size: 1.2rem;
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
    justify-content: space-around;
    height: 10rem;
    background-color: rgb(207, 230, 189) ;
    margin-bottom: 2rem;
    filter: drop-shadow(2px 3px 5px gray);
    
  }

  .list-task{
    display:flex;
    align-items: center;
    justify-items: start;
  
    margin-left: 0.2rem;

   
  }

  input[type=checkbox]{
    height: 30px;
    width: 30px;
  }

  .list-task textarea{
    padding-left: 1rem;
    width: 12rem;
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
  
  .btn-edit {
    border:none;
    background-color:rgb(207, 230, 189);
    margin-right:1rem;
  }

  .btn-edit svg{
    transition: all ease 0.3s;
  }

  

  .btn-edit svg:hover{
    
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