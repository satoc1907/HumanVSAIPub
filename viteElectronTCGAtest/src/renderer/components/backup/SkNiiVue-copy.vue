<script>
import {Niivue} from '@niivue/niivue'
const nvFLAIR = new Niivue()
const nvT1 = new Niivue()
const nvT1ce = new Niivue()
const nvT2 = new Niivue()

export default {
  name: 'SkNiiVue',
  props: ['quiz','questionIndex'],

  data(){
    return {
      volumeListFLAIR: [
        {
          url: "",
          volume: {hdr: null, img: null},
          intensityMin: 0, // not used yet
          intensityMax: 1, // not used yet
          intensityRange:[0, 1], // not used yet
          colorMap: "gray",
          opacity: 1,
          visible: true,
        }
      ],
      volumeListT1: [
        {
          url: "",
          volume: {hdr: null, img: null},
          intensityMin: 0, // not used yet
          intensityMax: 1, // not used yet
          intensityRange:[0, 1], // not used yet
          colorMap: "gray",
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
          colorMap: "gray",
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
          colorMap: "gray",
          opacity: 1,
          visible: true,
        }
      ]

    }
  }, 
  methods:{
    flairDir: function(dataName){
      return '/data/' +dataName.ID + '/'+ dataName.ID +'_flair.nii.gz';
        },
    t1Dir: function(dataName){
      return '/data/' +dataName.ID + '/'+ dataName.ID +'_t1.nii.gz';
        },
    t1ceDir: function(dataName){
      return '/data/' +dataName.ID + '/'+ dataName.ID +'_t1ce.nii.gz';
        },
    flairDir: function(dataName){
      return '/data/' +dataName.ID + '/'+ dataName.ID +'_flair.nii.gz';
        },
    },
    


  mounted() {
    this.volumeListFLAIR[0].url = this.quiz[this.questionIndex].image_dir[0]
    this.volumeListT1[0].url = this.quiz.questions[this.questionIndex].image_dir[1]
    this.volumeListT1ce[0].url = this.quiz.questions[this.questionIndex].image_dir[2]
    this.volumeListT2[0].url = this.quiz.questions[this.questionIndex].image_dir[3]
    //console.log('this is a pen')
    //console.log(this.questionIndex)
    //console.log(this.volumeListFLAIR[0].url)
    //console.log(this.quiz.questions[0].image_dir[0])


    nvFLAIR.attachTo('flair')
    nvFLAIR.loadVolumes(this.volumeListFLAIR) // press the "v" key to cycle through views
    nvFLAIR.setSliceType(nvFLAIR.sliceTypeRenderMultiplanar)

    nvT1.attachTo('t1')
    nvT1.loadVolumes(this.volumeListT1) // press the "v" key to cycle through views
    nvT1.setSliceType(nvT1.sliceTypeMultiplanar)
    nvFLAIR.syncWith(nvT1)

    nvT1ce.attachTo('t1ce')
    nvT1ce.loadVolumes(this.volumeListT1ce) // press the "v" key to cycle through views
    nvT1ce.setSliceType(nvT1ce.sliceTypeMultiplanar)
    nvFLAIR.syncWith(nvT1ce)

    nvT2.attachTo('t2')
    nvT2.loadVolumes(this.volumeListT2) // press the "v" key to cycle through views
    nvT2.setSliceType(nvT2.sliceTypeMultiplanar)
    nvFLAIR.syncWith(nvT2)
    
  },
updated() {
    this.volumeListFLAIR[0].url = this.quiz[this.questionIndex].image_dir[0]
    this.volumeListT1[0].url = this.quiz.questions[this.questionIndex].image_dir[1]
    this.volumeListT1ce[0].url = this.quiz.questions[this.questionIndex].image_dir[2]
    this.volumeListT2[0].url = this.quiz.questions[this.questionIndex].image_dir[3]
    //console.log('this is a pen')
    //console.log(this.questionIndex)
    //console.log(this.volumeListFLAIR[0].url)
    //console.log(this.quiz.questions[0].image_dir[0])


    nvFLAIR.attachTo('flair')
    nvFLAIR.loadVolumes(this.volumeListFLAIR) // press the "v" key to cycle through views
    nvFLAIR.setSliceType(nvFLAIR.sliceTypeRenderMultiplanar)

    nvT1.attachTo('t1')
    nvT1.loadVolumes(this.volumeListT1) // press the "v" key to cycle through views
    nvT1.setSliceType(nvT1.sliceTypeMultiplanar)
    nvFLAIR.syncWith(nvT1)

    nvT1ce.attachTo('t1ce')
    nvT1ce.loadVolumes(this.volumeListT1ce) // press the "v" key to cycle through views
    nvT1ce.setSliceType(nvT1ce.sliceTypeMultiplanar)
    nvFLAIR.syncWith(nvT1ce)

    nvT2.attachTo('t2')
    nvT2.loadVolumes(this.volumeListT2) // press the "v" key to cycle through views
    nvT2.setSliceType(nvT2.sliceTypeMultiplanar)
    nvFLAIR.syncWith(nvT2)
    
  }

 
}
</script>

<template>
<h2>FLAIR</h2>
<div id="demo1" style="width:90%; height:350px;">
        <canvas id="flair" height="120" width="160">
</canvas>
</div>

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


</template>