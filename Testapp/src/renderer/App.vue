
<template>
  <SkNiiVueVue v-bind:quiz="quiz"  v-bind:questionIndex="questionIndex"/>
  <SkeltonQuiz v-model:quiz="quiz" v-bind:quizText="
  quizText" v-model:questionIndex="questionIndex" v-model:userResponses="userResponses" @IndexNext='increase' @RestartIndex='Restart' @Prev='decrease'/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
//import Quiz from './components/Quiz.vue'
import SkeltonQuiz from './components/SkeltonQuiz.vue'
import SkNiiVueVue from './components/SkNiiVue.vue';
import quiz from './data/jsons/TCGA_test_sampled_random0.json'
</script>

<script >
export default {
  name: 'app',
  components: {
    SkeltonQuiz,SkNiiVueVue
  },
  data(){
    return{
       quiz,
       quizText:quizText,
       questionIndex:0,
       userResponses: userResponseSkelaton,
       isActive:false
    }

  },
  methods:{
     increase(){
        //alert('need Next');
      //console.log('total');
      //console.log(this.quiz.length);
      //console.log('From');
      //console.log(this.questionIndex);
      this.questionIndex++;
      //console.log(this.questionIndex);
      
     },
     decrease(){
       this.questionIndex--;
     },
     Restart(){
        this.questionIndex = 0;
        this.userResponses = Array(this.quiz.length).fill(null);
        window.location.reload();
     }
  }
}


var quizText ={
  text: "IDH status? ",
      responses: [
      { text: "IDH wild type" },
      { text: "Probably IDH wild type" },
      { text: "I have no idea" },
      { text: "Probably IDH 1 or IDH 2 mutation"},
      { text: "IDH 1 or IDH 2 mutation"},
      ]
},
   userResponseSkelaton = Array(quiz.length).fill(null);
</script>