<script>
//import {Niivue} from 'niivue'
import {Niivue} from "@niivue/niivue"
const nvFLAIR = new Niivue()
const nvT1 = new Niivue()
const nvT1ce = new Niivue()
const nvT2 = new Niivue()

export default {
  name: 'SkNiiVue',
  props: ['quiz','questionIndex','questionIndex'],

  data(){
    return {
      volumeListFLAIR: [
        {
          url: "",
          volume: {hdr: null, img: null},
          intensityMin: 0, // not used yet
          intensityMax: 1, // not used yet
          intensityRange:[0, 12], // not used yet
          colorMap: "mri",
          opacity: 1,
          visible: true,
        }
      ],
      volumeListT1: [
        {
          url: "",
          volume: {hdr: null, img: null},
          intensityMin: 0, // not used yet
          intensityMax: 1200, // not used yet
          intensityRange:[0, 1], // not used yet
          colorMap: "mri",
          opacity: 1,
          visible: true,
        }
      ]
      ,
      volumeListT1ce: [
        {
          url: "",
          volume: {hdr: null, img: null},
          intensityMin: 0, // not used yet
          intensityMax: 1, // not used yet
          intensityRange:[0, 1], // not used yet
          colorMap: "mri",
          opacity: 1,
          visible: true,
        }
      ]
      ,
      volumeListT2: [
        {
          url: "",
          volume: {hdr: null, img: null},
          intensityMin: 0, // not used yet
          intensityMax: 1, // not used yet
          intensityRange:[0, 1], // not used yet
          colorMap: "mri",
          opacity: 1,
          visible: true,
        }
      ]

    }
  },
    methods:{
        flairDir: function(dataName){
            return './data/' +dataName + '/FLAIR.nii.gz';
        },
        t1Dir: function(dataName){
            return './data/' +dataName + '/T1.nii.gz';
        },
        t1ceDir: function(dataName){
            return './data/' +dataName + '/T1CE.nii.gz';
        },
        t2Dir: function(dataName){
            return './data/' +dataName + '/T2.nii.gz';
        }
    },

  mounted() {
    
    this.volumeListFLAIR[0].url = this.flairDir(this.quiz[this.questionIndex].ID)
    this.volumeListT1[0].url = this.t1Dir(this.quiz[this.questionIndex].ID)
    this.volumeListT1ce[0].url = this.t1ceDir(this.quiz[this.questionIndex].ID)
    this.volumeListT2[0].url = this.t2Dir(this.quiz[this.questionIndex].ID)
    //console.log('this is a pen')
    //console.log(this.questionIndex)
    var flair_ID = this.quiz[this.questionIndex].ID
    //console.log(flair_ID)
    //console.log(this.flairDir("YAHHA"))

    nvT1.attachTo('t1')
    nvT1.loadVolumes(this.volumeListT1) // press the "v" key to cycle through views
    nvT1.setSliceType(nvT1.sliceTypeMultiplanar)
    nvT1.syncWith(nvT1ce)
    

    nvT1ce.attachTo('t1ce')
    nvT1ce.loadVolumes(this.volumeListT1ce) // press the "v" key to cycle through views
    nvT1ce.setSliceType(nvT1ce.sliceTypeMultiplanar)
    nvT1ce.syncWith(nvT2)
   

    nvT2.attachTo('t2')
    nvT2.loadVolumes(this.volumeListT2) // press the "v" key to cycle through views
    nvT2.setSliceType(nvT2.sliceTypeMultiplanar)
    nvT2.syncWith(nvFLAIR)
   
    nvFLAIR.attachTo('flair')
    nvFLAIR.loadVolumes(this.volumeListFLAIR) // press the "v" key to cycle through views
    nvFLAIR.setSliceType(nvFLAIR.sliceTypeRenderMultiplanar)
    //nvFLAIR.syncWith(nvT2)
    //nvFLAIR.syncWith(nvT1)
    
  },
updated() {
    this.volumeListFLAIR[0].url = this.flairDir(this.quiz[this.questionIndex].ID)
    this.volumeListT1[0].url = this.t1Dir(this.quiz[this.questionIndex].ID)
    this.volumeListT1ce[0].url = this.t1ceDir(this.quiz[this.questionIndex].ID)
    this.volumeListT2[0].url = this.t2Dir(this.quiz[this.questionIndex].ID)
    console.log('this is a pen')

    nvT1.attachTo('t1')
    nvT1.loadVolumes(this.volumeListT1) // press the "v" key to cycle through views
    nvT1.setSliceType(nvT1.sliceTypeMultiplanar)
    nvT1.syncWith(nvT1ce)
    

    nvT1ce.attachTo('t1ce')
    nvT1ce.loadVolumes(this.volumeListT1ce) // press the "v" key to cycle through views
    nvT1ce.setSliceType(nvT1ce.sliceTypeMultiplanar)
    nvT1ce.syncWith(nvT2)
   

    nvT2.attachTo('t2')
    nvT2.loadVolumes(this.volumeListT2) // press the "v" key to cycle through views
    nvT2.setSliceType(nvT2.sliceTypeMultiplanar)
    nvT2.syncWith(nvFLAIR)
   
    nvFLAIR.attachTo('flair')
    nvFLAIR.loadVolumes(this.volumeListFLAIR) // press the "v" key to cycle through views
    nvFLAIR.setSliceType(nvFLAIR.sliceTypeRenderMultiplanar)
    //nvFLAIR.syncWith(nvT2)
    //nvFLAIR.syncWith(nvT1)
    
  }

 
}
</script>

<template>
<div v-if="questionIndex<quiz.length" v-bind:key="questionIndex">
<h1 class="title is-6">IDH status?</h1>

<h2>T1</h2>
<div id="demo1" style="width:90%; height:350px;">
        <canvas id="t1" height="120" width="160">
</canvas>
</div>

<h2>T1CE</h2>
<div id="demo1" style="width:90%; height:350px;">
        <canvas id="t1ce" height="120" width="160">
</canvas>
</div>

<h3>T2</h3>
<div id="demo1" style="width:90%; height:350px;">
        <canvas id="t2" height="120" width="160">
</canvas>
</div>

</div>
<h2>FLAIR</h2>
<div id="demo1" style="width:90%; height:350px;">
        <canvas id="flair" height="120" width="160">
</canvas>
</div>


</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}
</style>