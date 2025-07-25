<template>
    <div class="focus-s" :class="{'hmenu':direction==0,'vmenu':direction==1}">
        <div v-if="showBar" class="bar" :class="{'selbar':selected}" :style="{'background-color':selectedColor}"></div>
        <SvgIcon v-if="svgname!=''" :fill="selected?selectedColor:color" :svgname="svgname" :size="iconSize" :boxSize="boxSize"></SvgIcon>
        <span v-if="direction==0" :style="{'margin-left':space,'color':selected?selectedColor:color,'font-size':textSize}">{{name}}</span>
        <span v-else :style="{'margin-top':space,'color':selected?selectedColor:color,'font-size':textSize}">{{name}}</span>
        <span v-if="subName!=''" class="subname">{{subName}}</span>
        <div class="vflag" v-if="showVFlag"></div>
    </div>
  </template> 
  
  <script>
  import SvgIcon from './SvgIcon.vue'
  export default {
    name: 'IconMenu',
    components:{
        SvgIcon
    },
    props:{
        ///排列方向，0=水平，1=垂直
        direction:{
            type:Number,
            default:0
        },
        ///图标与文字间距
        space:{
            type:String,
            default:'5px'
        },
        ///图标
        svgname:{
            type:String,
            default:"ic_notebook"
        },
        name:{
            type:String,
            default:"菜单"
        },
        subName:{
            type:String,
            default:""
        },
        ///图标大小
        iconSize:{
            type:Number,
            default:20
        },
        ///默认颜色
        color:{
            type:String,
            default:"var(--ek-text-color2)"
        },
        ///选中颜色
        selectedColor:{
            type:String,
            default:"var(--ek-color-primary)"
        },
        ///是否选中
        selected:{
            type:Boolean,
            default:false
        },
        ///文字大小
        textSize:{
            type:String,
            default:"15px"
        },
        ///显示选中状态条
        showBar:{
            type:Boolean,
            default:false
        },
        boxSize:{
            type:Number,
            default:0
        },
        ///显示v标记
        showVFlag:{
            type:Boolean,
            default:false
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .vflag{
    width: 5px;
    height: 5px;
    background: var(--ek-color-primary);
    position: absolute;
    right: 7px;
    top: 0px;
    border-radius: 5px;
  }
  .subname{
    font-size: 13px;
    margin-left: 5px;
    color: #ff1164;
  }
  .hmenu{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vmenu{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .bar{
    width: 5px;
    margin-right: 5px;
    opacity: 0;
    border-radius: 1px;
    margin-top: 1px;
    margin-bottom: 1px;
  }
  .selbar{
    opacity: 1!important;
  }
  </style>
  