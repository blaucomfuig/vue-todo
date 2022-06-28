<template>
  <div >
      <div class="list-item" v-for="task in tasks" :key="task.index" v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]">
        <div class="list-task">
          <h3 v-bind:style="[task.done ? {'background-color': 'rgb(207, 230, 189)'} : {'background-color': 'rgb(230, 189, 189)'}]">{{task.done}}</h3>
        </div>
       
        
      </div>
     
  </div>
</template>

<script>


export default {
  name: 'DoneTasks',

  created(){
    this.$store.dispatch('loadDoneTasks');
    console.log(this.$store.state.doneTasks)
  },

  computed: {
    tasks(){
      return this.$store.state.doneTasks;
    }
  },

  methods: {
    async catchApi(){
        this.$store.dispatch('loadDoneTasks')
    },
  }
}
</script>
