<script setup>
import download from 'downloadjs'
</script>

<script>
//defaine methods
export default {
 name:'SkeltonQuiz',
 props:['quiz','quizText','questionIndex','userResponses'],
 emits:['IndexNext','RestartIndex','Prev'],
 data: function(){
     return{
      isActive: false,
      userInfo:{
        firstName:'',
        lastName:'',
        response:'',
      }
     }
 },

methods: {
      onActive(index){
       if(this.isActive == index){
          this.isActive = null;
       }else{
          this.isActive =index;
       };
       console.log("change");
       console.log(this.questionIndex);
    },  
      restart: function () {
        this.$emit('RestartIndex')
        console.log("restart");
      },
      Finish: function(){
        console.log("Thank you for your cooperation");
        console.log(typeof this.userResponses);
        this.userInfo.response = this.userResponses
        var filleName=this.userInfo.firstName + '_' +this.userInfo.lastName + '_TCGA_result.json'
        download(JSON.stringify(this.userInfo), filleName, "application/json");
      },
      next: function () {
        if (this.questionIndex < this.quiz.length)
        this.$emit('IndexNext');
      },
  
      prev: function () {
        if (this.quiz.length > 0)
        this.$emit('Prev');
      },
      // Return "true" count in userResponses
      score: function () {
        var score = 0;
        for (let i = 0; i < this.userResponses.length; i++) {
          if (
          typeof this.userResponses[i]!==
          "undefined" &&
          this.userResponses[i] == this.quiz[i].IDH1_2*4)
          {
            score = score + 1;
          }
        }
        return score;
  
        //return this.userResponses.filter(function(val) { return val }).length;
      },
      charIndex: function(i){
		return String.fromCharCode(97 + i);
	}
      }}
</script>





<template>
    <!-- partial:index.partial.html -->
    <!--container-->

<section class="container" id="app">

	<!--questionBox-->
<div class="questionBody"> 
	<div class="questionBox">
   <!--qusetionContainer-->
		<div class="questionContainer" v-if="questionIndex<quiz.length" v-bind:key="questionIndex">
         <header>
				<h1 class="title is-6">Are you ready?</h1>
				<!--progress-->
				<div class="progressContainer">
					<progress class="progress is-info is-small" :value="(questionIndex/quiz.length)*100" max="100">{{(questionIndex/quiz.length)*100}}%</progress>
					<p>{{(questionIndex/quiz.length)*100}}% complete</p>
				</div>
				<!--/progress-->
			</header>
         <!-- questionTitle -->
			<h2 class="titleContainer title">{{ quizText.text }}</h2>
         <!-- quizOptions -->
				<div class="optionContainer">
					<div class="option" v-for="(response, index) in quizText.responses" @click="onActive(index); userResponses.splice(questionIndex,1,index) " :key="index" v-bind:class="{ 'is-selected': isActive === index }">
						{{ charIndex(index) }}.{{ response.text }}
					</div>
				</div>
            
            <!--quizFooter: navigation and progress-->
				<footer class="questionFooter">

					<!--pagination-->
					<nav class="pagination" role="navigation" aria-label="pagination">

						<!-- back button -->
						<a class="button" v-on:click="prev();" :disabled="questionIndex < 1">
                    Back
                  </a>

                  <!-- next button -->
						<a class="button" :class="(userResponses[questionIndex]==null)?'':'is-active'" v-on:click="next();" :disabled="questionIndex>=quiz.length">
                    {{ (userResponses[questionIndex]==null)?'Skip':'Next' }}
                  </a>

					</nav>
					<!--/pagination-->

				</footer>
				<!--/quizFooter-->
      </div>
      <!--/questionContainer-->

		<!--quizCompletedResult-->
		<div v-if="questionIndex >= quiz.length" v-bind:key="questionIndex" class="quizCompleted has-text-centered">

		<!-- quizCompletedIcon: Achievement Icon -->
			<span class="icon">
             <i class="fa" :class="score()>3?'fa-check-circle-o is-active':'fa-times-circle'"></i>
           </span>

		<!--resultTitleBlock-->
			<h2 class="title">
        <!--You did {{ (score()>7?'an amazing':(score()<4?'a poor':'a good')) }} job!-->
				Thank you for your commitment!
			</h2>
			<p class="subtitle">
				<!--Total score: {{ score() }} / {{ quiz.length }}-->
			</p>
       <form>
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="validationDefault01">First name</label>
              <input type="text" class="form-control" id="validationDefault01" v-model="userInfo.firstName" placeholder="First name"  required>
            </div>
            <div class="col-md-4 mb-3">
              <label for="validationDefault02">Last name</label>
              <input type="text" class="form-control" id="validationDefault02" v-model="userInfo.lastName" placeholder="Last name" required>
            </div>
          </div>
        </form>
				<nav class="lastButtons" role="navigation" aria-label="lastButtons">
				<a class="button" @click="restart()">restart <i class="fa fa-refresh"></i></a>
          <a class="button" @click="Finish()">Finish <i class="fa fa-refresh"></i></a>
        </nav>
        
			<!--/resultTitleBlock-->

	</div>
		<!--/quizCompetedResult-->

	</div>
	<!--/questionBox-->
</div>
</section>
<!--/container-->
<!-- partial -->
</template>





<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
.questionBody {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  height: 50vh;
  width: 50wh;
  background: #CFD8DC;
  /* mocking native UI */
  cursor: default !important;
  /* remove text selection cursor */
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  /* remove text selection */
  user-drag: none;
  /* disbale element dragging */
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  transition: 0.3s;
}

.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}

.animated {
  transition-duration: 0.15s;
}

.container {
  margin: 0 0.5rem;
}

.questionBox {
  max-width: 30rem;
  width: 30rem;
  min-height: 30rem;
  background: #FAFAFA;
  position: relative;
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.questionBox header {
  background: rgba(0, 0, 0, 0.025);
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.questionBox header h1 {
  font-weight: bold;
  margin-bottom: 1rem !important;
}
.questionBox header .progressContainer {
  width: 60%;
  margin: 0 auto;
}
.questionBox header .progressContainer > progress {
  margin: 0;
  border-radius: 5rem;
  overflow: hidden;
  border: none;
  color: #3D5AFE;
}
.questionBox header .progressContainer > progress::-moz-progress-bar {
  background: #3D5AFE;
}
.questionBox header .progressContainer > progress::-webkit-progress-value {
  background: #3D5AFE;
}
.questionBox header .progressContainer > p {
  margin: 0;
  margin-top: 0.5rem;
}
.questionBox .titleContainer {
  text-align: center;
  margin: 0 auto;
  padding: 1.5rem;
}
.questionBox .quizForm {
  display: block;
  white-space: normal;
  height: 100%;
  width: 100%;
}
.questionBox .quizForm .quizFormContainer {
  height: 100%;
  margin: 15px 18px;
}
.questionBox .quizForm .quizFormContainer .field-label {
  text-align: left;
  margin-bottom: 0.5rem;
}
.questionBox .quizCompleted {
  width: 100%;
  padding: 1rem;
  text-align: center;
}
.questionBox .quizCompleted > .icon {
  color: #FF5252;
  font-size: 5rem;
}
.questionBox .quizCompleted > .icon .is-active {
  color: #00E676;
}
.questionBox .questionContainer {
  white-space: normal;
  height: 100%;
  width: 100%;
}
.questionBox .questionContainer .optionContainer {
  margin-top: 12px;
  flex-grow: 1;
}
.questionBox .questionContainer .optionContainer .option {
  border-radius: 290486px;
  padding: 9px 18px;
  margin: 0 18px;
  margin-bottom: 12px;
  transition: 0.3s;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.85);
  border: transparent 1px solid;
}
.questionBox .questionContainer .optionContainer .option.is-selected {


  border-color: rgba(0, 0, 0, 0.25);
    border-radius: 290486px;
  padding: 9px 18px;
  margin: 0 18px;
  margin-bottom: 12px;
  transition: 0.3s;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.85);
  border: transparent 1px solid;
  background-color: white;
}
.questionBox .questionContainer .optionContainer .option:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.questionBox .questionContainer .optionContainer .option:active {
  transform: scaleX(0.9);
}
.questionBox .questionContainer .questionFooter {
  background: rgba(0, 0, 0, 0.025);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  align-self: flex-end;
}
.questionBox .questionContainer .questionFooter .pagination {
  margin: 15px 25px;
}

.pagination {
  display: flex;
  justify-content: space-between;
}

.lastButtons{
  display: flex;
  justify-content: space-around;
}

.button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;
  transition: 0.3s;
}
.button:hover {
  cursor: pointer;
  background: #ECEFF1;
  border-color: rgba(0, 0, 0, 0.25);
}
.button.is-active {
  background: #3D5AFE;
  color: white;
  border-color: transparent;
}
.button.is-active:hover {
  background: #0a2ffe;
}

@media screen and (min-width: 769px) {
  .questionBox {
    align-items: center;
    justify-content: center;
  }
  .questionBox .questionContainer {
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}


</style>