<template>
    <div>
      <span class="title" :style="{'min-width':titleWidth}">{{name}}</span>
      <SimpleOptionSelector @itemClick="itemClick" :curkey="curkey" :options="options"></SimpleOptionSelector>
      <span v-if="tip!=''" class="tip mgl10">{{ tip }}</span>
    </div>
    </template>
    
    <script>
    import SimpleOptionSelector from './SimpleOptionSelector.vue'
    export default {
      name: 'SimpleOptionSelectorField',
      components:{
        SimpleOptionSelector
      },
      props:{
          name:{
              type:String,
              default:"field option name"
          },
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
          },
          tip:{
            type:String,
            default:""
          },
          titleWidth:{
            type:String,
            default:"150px"
          }
      },
      methods:{
          itemClick:function(ops){
              this.$emit("itemClick",ops)
          }
      }
    }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    .title{
      color: var(--ek-text-color2);
      font-size: 14px;
      display: inline-block;
      min-width: 150px;
    }
    .tip{
      font-size: 13px;
      color: var(--ek-text-color2);
    }
    </style>
    