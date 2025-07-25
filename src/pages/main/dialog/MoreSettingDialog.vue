<template>
    <el-dialog
        v-model="dialogShow"
        title="更多设置"
        width="650px" 
        align-center
        :before-close="handleClose"
        destroy-on-close
        >
        <div style="height: 400px;">
            <el-scrollbar>
               <div>
                   <SimpleOptionSelectorField name="拼写键盘音效" :options="keyBoardSoundOptions" :curkey="config.keyBoardSound" @itemClick="keyBoardSoundChange"></SimpleOptionSelectorField>
                   <SimpleOptionSelectorField class="sitem" name="拼写正确音效" :options="keyBoardSoundOptions" :curkey="config.correctSound" @itemClick="correctSoundChange"></SimpleOptionSelectorField>
                   <SimpleOptionSelectorField class="sitem" name="默写隐藏方式" :options="hideWriteOptions" :curkey="config.hideWriteMode" @itemClick="hideWriteModeChange"></SimpleOptionSelectorField>
               </div>
            </el-scrollbar>
        </div>
    </el-dialog>
  </template>
  
  <script>
  import SimpleOptionSelectorField from '@/components/SimpleOptionSelectorField.vue';
  export default {
    name: 'MoreSettingDialog',
    components:{
        SimpleOptionSelectorField
    },
    props: {
      showDialog:Boolean,
      config:Object
    },
    watch:{
        showDialog:function(nval,old){
            this.dialogShow = nval
        }
    },
    data(){
        return {
            dialogShow:this.showDialog,
            keyBoardSoundOptions:[
                {name:"开启音效",key:"1"},
                {name:"关闭音效",key:"0"}
            ],
            hideWriteOptions:[
                {name:"完全隐藏",key:"all"},
                {name:"随机隐藏",key:"random"},
                {name:"元音隐藏",key:"yuan"},
                {name:"辅音隐藏",key:"fu"}
            ]
        }
    },
    mounted:function(){

    },
    methods:{
        ///提交改变
        emitChange: function (name, value) {
            var req = {
                name: name,
                value: value
            }
            this.$emit('changeValue', req)
        },
        keyBoardSoundChange:function(item){
            this.emitChange('keyBoardSound',item.key)
        },
        correctSoundChange:function(item){
            this.emitChange('correctSound',item.key)  
        },
        hideWriteModeChange:function(item){
            this.emitChange('hideWriteMode',item.key) 
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
    .sitem{
        margin-top:15px;
    }
  </style>
  