
<template>
  <SkNiiVueVue v-bind:quiz="quiz"  v-bind:questionIndex="questionIndex"/>
  <SkeltonQuiz v-model:quiz="quiz" v-model:quizText="
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

import HelloWorld from './components/HelloWorld.vue'
import Quiz from './components/Quiz.vue'
import SkeltonQuiz from './components/SkeltonQuiz.vue'
import SkNiiVueVue from './components/SkNiiVue.vue';
</script>

<script >
export default {
  name: 'app',
  components: {
    SkeltonQuiz,Quiz
  },
  data(){
    return{
       quiz:quiz,
       quizText:quizText,
       questionIndex:0,
       userResponses: userResponseSkelaton,
       isActive:false
    }

  },
  methods:{
     increase(){
        //alert('need Next');
      console.log('total');
      console.log(this.quiz.questions.length);
      console.log('From');
      console.log(this.questionIndex);
      this.questionIndex++;
      console.log(this.questionIndex);
      
     },
     decrease(){
       this.questionIndex--;
     },
     Restart(){
        this.questionIndex = 0;
        this.userResponses = Array(this.quiz.questions.length).fill(null);
        window.location.reload();
     }
  }
}

var quiz = {
      user: "Dave",
      questions: [
      { "image_dir":[
      "/data/BraTS19_2013_2_1/BraTS19_2013_2_1_flair.nii.gz",
      "/data/BraTS19_2013_2_1/BraTS19_2013_2_1_t1.nii.gz",
      "/data/BraTS19_2013_2_1/BraTS19_2013_2_1_t1ce.nii.gz",
      "/data/BraTS19_2013_2_1/BraTS19_2013_2_1_t2.nii.gz"

    ],
       "IDH1_2":1},
      
      {"image_dir":[
        "/data/BraTS19_2013_1_1/BraTS19_2013_1_1_flair.nii.gz",
        "/data/BraTS19_2013_1_1/BraTS19_2013_1_1_t1.nii.gz",
        "/data/BraTS19_2013_1_1/BraTS19_2013_1_1_t1ce.nii.gz",
        "/data/BraTS19_2013_1_1/BraTS19_2013_1_1_t2.nii.gz"
  
      ],
         "IDH1_2":1}
        
      ]
   }

var quizText ={
  text: "IDH status? ",
      responses: [
      { text: "IDH wild type" },
      { text: "IDH 1 or IDH 2 mutation"},
      ]
},
   userResponseSkelaton = Array(quiz.questions.length).fill(null);
</script>