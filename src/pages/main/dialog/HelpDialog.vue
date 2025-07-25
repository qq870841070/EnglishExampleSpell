<template>
    <el-dialog
        v-model="dialogShow"
        title="快捷键说明"
        width="500px" 
        align-center
        :before-close="handleClose"
        destroy-on-close
        >
        <div style="height: 400px;">
            <el-scrollbar>
               <div>
                  <!--华丽分割线-->
                  <div class="keyblock">
                    <div class="keyitem">↑</div>
                    <div class="keyitem">↓</div>
                    <div class="tip">切换选中单词</div>
                  </div>
                  <!--华丽分割线-->
                  <div class="keyblock">
                    <div class="keyitem">←</div>
                    <div class="keyitem">→</div>
                    <div class="tip">切换复习选项</div>
                  </div>
                  <!--华丽分割线-->
                  <div class="keyblock">
                    <div class="keyitem">Enter</div>
                    <div class="tip">选定复习选项</div>
                  </div>
                  <!--华丽分割线-->
                  <div class="keyblock">
                    <div class="keyitem">Tab</div>
                    <div class="tip">显示/隐藏当前中文</div>
                  </div>
                  <!--华丽分割线-->
                  <div class="keyblock">
                    <div class="keyitem">Space</div>
                    <div class="tip">播放单词发音</div>
                  </div>
                   <!--华丽分割线-->
                   <div class="keyblock">
                    <div class="keyitem">数字键1~5</div>
                    <div class="tip">快速选定复习选项</div>
                  </div>
                  <!--华丽分割线-->
                  <div class="keyblock">
                    <div class="keyitem">数字键0</div>
                    <div class="tip">添加到遗忘列表</div>
                  </div>
               </div>
            </el-scrollbar>
        </div>
    </el-dialog>
  </template>
  
  <script>

  export default {
    name: 'HelpDialog',
    components:{
    },
    props: {
      showDialog:Boolean,
    },
    watch:{
        showDialog:function(nval,old){
            this.dialogShow = nval
        }
    },
    data(){
        return {
            dialogShow:this.showDialog,
            
        }
    },
    mounted:function(){

    },
    methods:{

        ///关闭窗口
        handleClose:function(done){
            this.$emit('closeDialog')
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .keyitem{
        background: #e3e3f3;
        box-shadow: 0 2px 0 0 rgb(32 32 32 / 16%);
        border-radius: 6px;
        height: 30px;
        padding: 0 10px;
        line-height: 30px;
        text-align: center;
        margin-right: 15px;
        font-size: 16px;
        min-width: 50px;
        color: #666666;
    }
    .keyblock{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
  </style>
  