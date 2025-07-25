<template>
    <el-dialog
        v-model="dialogShow"
        title="错误列表"
        width="650px" 
        align-center
        :before-close="handleClose"
        destroy-on-close
        >
        <div class="vh-flex" style="height: 400px;">
            <el-scrollbar class="vh-full">
                <el-table :data="errorList" :default-sort="{ prop: 'count', order: 'descending' }" style="width: 100%">
                    <el-table-column prop="word" label="单词" width="180" />
                    <el-table-column prop="phetic" label="音标" width="130" />
                    <el-table-column prop="descript" label="释义" width="180" />
                    <el-table-column prop="count" label="错误次数" />
                </el-table>
            </el-scrollbar>
            <div>
                <span @click="emitEvent('restart')" class="rmstart focus-s">重新开始</span>
                <span class="msc">（以错误列表结果重新开始拼写）</span>
            </div>
        </div>
    </el-dialog>
  </template>
  
  <script>

  export default {
    name: 'ErrorListDialog',
    components:{

    },
    props: {
      showDialog:Boolean,
      errorList:Array
    },
    watch:{
        showDialog:function(nval,old){
            this.dialogShow = nval
        }
    },
    data(){
        return {
            dialogShow:this.showDialog
        }
    },
    mounted:function(){

    },
    methods:{
        ///提交事件
        emitEvent:function(name,value){
            var req = {
                name:name,
                value:value
            }
            this.$emit("eventHandle",req)
        },
        ///关闭窗口
        handleClose:function(done){
            this.$emit('closeDialog')
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .rmstart{
        color: var(--ek-color-primary);
    }
    .msc{
        color: var(--ek-text-color2);
        margin-left: 20px;
    }
    
  </style>
  