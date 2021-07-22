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
      <div class="list-item" v-for="task in tasks" :key="task.index" v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]">
        <div class="list-task">
          <input type="checkbox" v-model="task.done" @change="saveDone(task.done)" v-bind:checked="task.done ? true : false" >
          <h3 class="task-name" v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]">{{task.name}}</h3>
        </div>
        <div class="list-buttons">

          <svg  v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]" v-if="state===false" @click="enableEdit()" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="blue" class="bi bi-pencil btn-edit" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          <button v-if="state === true" type="submit" class="btn-update btn btn-dark " @click="updateTask(task.id, task.name)" >
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


export default {
  data() {
    return{
      task:"",
      updatedTask: "",
      state: false
    }
  },

  computed: {
    tasks(){
      return this.$store.state.tasks
    }
  },

  mounted(){
    this.catchApi();
  },


  methods: {
    async catchApi(){
        this.$store.dispatch('loadTasks')
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
    
    async updateTask(id, oldTask){
      let updatedStatus = this.state
      


      //atencion aqui, el destructuring objects que me me salvo la vida
      this.$store.dispatch('updateTask', {
        id, 
        updatedTask: {
          name: oldTask, 
          level: "medium", 
          done: updatedStatus
        }
      })
    

      this.updatedTask = ""
    },

    saveName(task){
      this.updatedTask = task;
   
    },
    
    saveDone(done){
      this.state= done
      
      
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

  .task-name{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 1.5rem;
    border: none;
    background-color:rgb(207, 230, 189);
    margin-left: 1rem;
    
   
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
    justify-content: space-between;
    
    
    
    height: 10rem;
    background-color: rgb(207, 230, 189) ;
    margin-bottom: 2rem;
    filter: drop-shadow(2px 3px 5px gray);
    
  }

  .list-task{
    display:flex;
    align-items: center ;
    
  
    margin-left: 1rem;

   
  }

  input[type=checkbox]{
    height: 2rem;
    width: 2rem;
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

  .btn-edit{
    margin: 0 1.5rem;
  }

  .btn-delete svg{
    transition: all ease 0.3s;
  }

  

  .btn-delete svg:hover{
    
    transform:scale(1.2);
  }

</style>