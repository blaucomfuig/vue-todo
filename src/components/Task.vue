<template>
    <div class="list-item" v-bind:style="[taskDone ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]">
        <div class="list-task">
          <h3 class="task-name" v-if="taskStateEdit===false">{{name}}</h3>

          <input type="checkbox" v-model="taskDone" @change="saveDone()" v-bind:checked="taskDone ? true : false" >
          <textarea v-if="taskStateEdit===true" v-model="taskUpdatedTask" class="input-task" type="text" v-bind:style="[taskDone ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]" ></textarea>
        </div>
        <div class="list-buttons">
          
         <svg  v-bind:style="[taskDone ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]" v-if="taskStateEdit===false" @click="enableEdit()" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="blue" class="bi bi-pencil btn-edit" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>

          <button v-if="taskState ===false" type="submit" class="btn-update btn btn-dark " @click="updateTask(id)" >
          save
        </button>

          <button v-bind:style="[taskDone ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]" class="btn-delete" @click="deleteTask(id)" >
        
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>

        
        </div>
        
      </div>
     
</template>

<script>
export default {
    name: "Task",
    props: ['id', 'name', 'done', 'stateEdit', 'state', 'updatedTask'],

    data(){
        return{
            taskDone: this.done,
            taskStateEdit: this.stateEdit,
            taskState: this.state,
            taskUpdatedTask: this.updatedTask
        }
    },

    computed:{
        newData(){
            this.taskDone = this.done
            this.taskStateEdit = this.stateEdit
            this.taskState = this.state
            this.taskUpdatedTask = this.updatedTask
        }
    },

    methods: {
        saveDone(){
            this.$emit('saveDone')
        },
        enableEdit(){
            this.$emit('enableEdit')
        },
        updateTask(){
            
            this.$emit('updateTask')
        },
        deleteTask(){
            
            this.$emit('deleteTask')
        }

    }
}
</script>