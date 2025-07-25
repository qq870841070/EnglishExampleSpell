<template>
    <div class="iconview" :style="{'width':boxSize>0?boxSize+'px':'auto','height':boxSize>0?boxSize+'px':'auto'}">
      <img v-if="svgname.endsWith('.svg')" class="icon" :src="'file://'+svgname" :style="{'width':size+'px','height':size+'px','filter':'drop-shadow('+fill+' 800px 0)'}"/>
      <img v-else class="icon" :src="'./svgfiles/'+svgname+'.svg'" :style="{'width':size+'px','height':size+'px','filter':'drop-shadow('+fill+' 800px 0)'}"/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SvgIcon',
    props:{
        size:{
            type:Number,
            default:20
        },
        fill:{
            type:String,
            default:"#666666"
        },
        svgname:{
            type:String,
            default:"ic_add1"
        },
        boxSize:{
          type:Number,
          default:0
        }
    }
  }

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .icon{
   
    position: relative;
    left: -800px;
  }
  .iconview{
    will-change: opacity, filter; /* 提示浏览器提前进行优化 */
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }
  </style>
  