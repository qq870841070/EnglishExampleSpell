<template>
    <div class="back">
      <div @click="itemClick(ops)" v-for="ops in options" :key="ops" :class="{'sel':ops.key==curkey}" class="focus-s item">{{ops.name}}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SimpleOptionSelector',
    props:{
        ///当前选中项目
        curkey:{
          type:String,
          default:"option1"
        },
        ///选项列表
        options:{
          type:Array,
          default:function(){
            return [
              {name:"option1",key:"option1"},
              {name:"option2",key:"option2"},
            ]
          }
        }
    },
    methods:{
      ///选项点击
      itemClick:function(ops){
        this.$emit("itemClick",ops)
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .back{
    display: inline-flex;
    padding-left: 0px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 5px;
    border-radius: 5px;
  }
  .sel{
    background-color: var(--ek-color-primary)!important;
    color: white!important;
  }
  .item{
    color: var(--ek-text-color2);
    font-size: 13px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    background: var(--ek-card-backColor);
    margin-right: 10px;
  }
  </style>
  