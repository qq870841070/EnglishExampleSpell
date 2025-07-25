<template>
    <div class="vback">
      <div @click="itemClick(ops)" v-for="ops in options" :key="ops" :class="{'sel':ops.key==curkey}" class="focus-s item">{{ops.name}}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OptionSelector',
    props:{
        ///当前选中项目
        curkey:{
          type:String,
          default:"option1"
        },
        ///选项列表
        options:{
          type:Array
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
  .vback{
    display: inline-flex;
    background: var(--ek-card-backColor);
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 5px;
    border-radius: 5px;
  }
  .sel{
    background-color: var(--ek-card-in-card);
  }
  .item{
    
    color: var(--ek-text-color1);
    font-size: 13px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 5px;
  }
  </style>
  