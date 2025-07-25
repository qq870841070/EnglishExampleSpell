<template>
    <!-- eslint-disable vue/no-unused-vars -->
    <div class="vh-flex" v-if="currentWord != null">
        <div class="vh-full vh-flex" v-if="learnFinished==false">
            <!--spell head-->
            <div class="vheader vh-flex">
                <div class="vh-full v-top">
                    <div class="v-flex">
                        <div class="lbwordpage">{{ (currentWordIndex + 1) }}/{{ listWord.length }}</div>
                        <div class="lbcurword">{{ currentWord.ItemName }}</div>
                    </div>
                    <div class="v-flex" style="gap: 20px;">
                        <el-tooltip class="box-item" effect="dark" content="显示译文" placement="bottom">
                            <IconMenu @click="changeConfig('showTranslate')" :selected="config.showTranslate"
                                class="secitem" svgname="ic_descript" name="译文" :iconSize="30"></IconMenu>
                        </el-tooltip>

                        <el-dropdown>
                            <IconMenu class="secitem" svgname="ic_sound1" :name="config.soundName == 'US' ? '美音' : '英音'"
                                :iconSize="20">
                            </IconMenu>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="changeConfig('soundName', 'US')">美音</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('soundName', 'UK')">英音</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                        <!--分割线-->
                        <el-dropdown>
                            <IconMenu v-if="config.loopMode == 'order'" class="secitem" svgname="ic_order_seq"
                                name="顺序切换" :iconSize="18">
                            </IconMenu>
                            <IconMenu v-else class="secitem" :selected="true" svgname="ic_loop2" :name="config.loopName"
                                :iconSize="20">
                            </IconMenu>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'order')">顺序切换</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'loop2')">循环2次</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'loop3')">循环3次</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'loop4')">循环4次</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'loop5')">循环5次</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'loop6')">循环6次</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('loopMode', 'loop')">无限循环</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                        <el-dropdown>
                            <IconMenu class="secitem" svgname="ic_play_speed" :name="config.playSpeed + 'x'"
                                :iconSize="20" title="发音语速">
                            </IconMenu>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 0.5)">0.5x</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 0.75)">0.75x</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 1)">1x</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 1.25)">1.25x</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 1.5)">1.5x</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 1.75)">1.75x</el-dropdown-item>
                                    <el-dropdown-item @click="changeConfig('playSpeed', 2)">2x</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="wordProgress">
                    <div class="wpv" :style="{ 'flex-grow': learnProgress }"></div>
                </div>
            </div>
            <div class="spell-container">

                <div class="spell-item" v-if="spellItem != null">
                    <div class="lbtrans" @mouseleave="translateEnter = false"
                        v-if="config.showTranslate || translateEnter">{{
                            spellItem.translate }}</div>
                    <div class="lbtrans" v-else @mouseenter="translateEnter = true"
                        style="color: var(--ek-text-color3);">
                        -------------</div>
                    <div class="lbspell">
                        <div class="spitem"
                            :class="{ 'shake': word.animate == true, 'curspellword': windex == spellWordIndex }"
                            @animationend="word.animate = false" v-for="(word, windex) in spellItem.items" :key="word"
                            @mouseenter="setWordMShow(word, 1)" @mouseleave="setWordMShow(word, 0)"
                            @click="clickSpellWord(word)">
                            <div class="char-item" v-for="(char, cindex) in word.chars" :key="char">
                                <span class="uninput"
                                    :class="{ 'unshow': (char.show == 1 || char.type == 1 || char.mshow == 1) }"
                                    v-if="char.input == 0">{{ char.char
                                    }}</span>
                                <span v-else-if="char.input == 1">{{ char.char }}</span>
                                <span class="char-err" v-else-if="char.input == 2">{{ char.errChar }}</span>
                            </div>
                        </div>

                    </div>
                    <div class="lbspellpage">{{ (spellItemIndex + 1) }}/{{ listSpellItems.length }}</div>
                </div>
            </div>

            <!--底部快捷键-->
            <div class="vbottom">
                <div>
                    <span class="vkey">Tab</span>
                    <span>全句显示</span>
                </div>
                <div>
                    <span class="vkey">Space</span>
                    <span>单词显示</span>
                </div>
                <div>
                    <span class="vkey">Ctrl + P</span>
                    <span>全句播放</span>
                </div>
                <div>
                    <span class="vkey">Ctrl + ↑</span>
                    <span>上一句</span>
                </div>
                <div>
                    <span class="vkey">Ctrl + ↓</span>
                    <span>下一句</span>
                </div>
            </div>
        </div>
        <div v-else class="vh-full dvfinish">
            <h1>全部拼写完成</h1>
         
        </div>
    </div>
</template>

<script>
/* global LightApp */
import SvgIcon from '@/components/SvgIcon.vue';
import IconMenu from '@/components/IconMenu.vue';
export default {
    name: 'MainPage',
    components: {
        IconMenu,
        SvgIcon
    },
    props: {

    },
    data() {
        return {
            config: {
                autoPlay: true,
                playSpeed: 1,
                showTranslate: true,
                loopMode: "order",
                loopName: "",
                soundName: "US"
            },
            audio: null,
            listWord: [],
            currentWordIndex: -1, // 当前单词索引
            currentWord: null, // 当前单词
            listSpellItems: [], //拼写项目
            spellItemIndex: -1,//当前句子索引
            spellItem: null,//当前句子
            spellWordIndex: 0,//当前输入句子中的单词索引
            inputError: false,//存在输入错误标识
            showAnswer: 0,
            learnProgress: 0.0, //本次学习进度
            translateEnter: false,
            loopCount: 0,
            learnFinished: false

        }
    },
    // 挂载完成
    mounted: function () {
        this.audio = new Audio()
        var that = this
        window.addEventListener("keydown", function (e) {
            that.keyEvent(e)
        })
        this.init();

    },
    methods: {
        // 初始化加载
        init: function () {
            var that = this
            this.loadConfig(function () {
                LightApp.load(function (res) {
                    console.log("初始化返回数据", res)
                    that.listWord = res
                    that.currentIndex = -1
                    that.moveToNext()
                })
            })

        },
        ///加载配置文件
        loadConfig: function (callBack) {
            var that = this
            LightApp.config.readConfig("ExampleSpellApp", function (res) {
                console.log("加载配置返回", res)
                if (res == null) {
                    callBack()
                    return
                }
                for (var key in res) {
                    if (that.config[key] != null) {
                        that.config[key] = res[key]
                    }
                }
                callBack()
            })
        },
        ///键盘事件
        keyEvent: function (event) {
            //console.log("键盘事件",event)
            // 添加 Ctrl+J 播放发音快捷键
            if (event.ctrlKey && (event.key === 'j' || event.key === 'J')) {
                // event.preventDefault() // 阻止默认行为
                // this.playWordSound()
            }
            if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
                event.preventDefault() // 阻止默认行为
                this.playText(this.spellItem.word)
                return
                // this.playWordSound()
            }
            if (event.altKey && (event.key === 'w' || event.key === 'W')) {
                // event.preventDefault() // 阻止默认行为
                // this.configChange({name:"hideWrite"})
            }
            else if (event.keyCode >= 65 && event.keyCode <= 90) {
                this.inputWordKey(event.key)
            }
            else if (event.keyCode == 8) { // Backspace
                this.handleBackspace();
            }
            else if (event.keyCode == 32) {
                //输入空格
                //this.inputWordKey(" ")
                this.changeSpellWordShow()
            }
            else if (event.ctrlKey && event.key === 'ArrowUp') {
                // 上一句
                this.movePrevSpellItem();
            }
            else if (event.ctrlKey && event.key === 'ArrowDown') {
                // 下一句
                this.moveNextSpellItem();
            }
            // 添加快捷键判断
            else if (event.shiftKey && event.key === 'ArrowLeft') {
                // 上一个
                //this.moveToLast()
            }
            else if (event.shiftKey && event.key === 'ArrowRight') {
                // 下一个
                //this.moveToNext()
            } else if (event.key == "Tab") {
                //切换到下一个
                //this.config.showDesc = !this.config.showDesc
                event.preventDefault() // 阻止默认行为
                this.changeAllSpellWordShow()
            }

        },
        ///输入单词键
        inputWordKey: function (key) {
            if (this.inputError) {
                // 如果存在输入错误，直接返回
                return;
            }
            key = key.toLocaleLowerCase()
            const charObj = this.getCurrentInputChar();
            if (!charObj) return;

            if (charObj.char.toLocaleLowerCase() === key) {
                charObj.input = 1; // 输入正确
            } else {
                charObj.errChar = key;
                charObj.input = 2; // 输入错误
                this.inputError = true;
                // 触发晃动动画
                var spellWord = this.getCurrentSpellWord()
                spellWord.animate = true

                //播放错误提示音
                this.playAssetsSound("./sound/error.wav");
                //this.triggerShake();
            }
            this.$forceUpdate();

            // 判断是否全部输入完毕
            let allInput = true;
            var i = 0;
            for (let wordObj of this.spellItem.items) {
                if (wordObj.chars.some(c => (c.input === 0 || c.input == 2) && c.type === 0)) {
                    allInput = false;
                    this.spellWordIndex = i;
                    break;
                }
                i++;
            }
            if (allInput) {
                this.playAssetsSound("./sound/correct.wav");
                var that = this
                setTimeout(function () {
                    that.handleLoopLogic();
                }, 300)
            }
        },
        handleBackspace: function () {
            // 回删当前拼写项目最后一个已输入的字母
            if (!this.spellItem || !this.spellItem.items) return;
            for (let i = this.spellItem.items.length - 1; i >= 0; i--) {
                let wordObj = this.spellItem.items[i];
                for (let j = wordObj.chars.length - 1; j >= 0; j--) {
                    let charObj = wordObj.chars[j];
                    if (charObj.type == 0 && charObj.input !== 0) {
                        charObj.input = 0;
                        charObj.errChar = '';
                        this.inputError = false;
                        this.$forceUpdate();
                        return;
                    }
                }
            }
        },
        // 获取当前需要输入的charObj
        getCurrentInputChar() {
            if (!this.spellItem || !this.spellItem.items) return null;
            for (let wordObj of this.spellItem.items) {
                for (let charObj of wordObj.chars) {
                    if (charObj.type == 0 && charObj.input === 0) {
                        return charObj;
                    }
                }
            }
            return null;
        },
        ///获取当前拼写单词
        getCurrentSpellWord() {
            if (!this.spellItem || !this.spellItem.items) return null;
            for (let wordObj of this.spellItem.items) {
                for (let charObj of wordObj.chars) {
                    if (charObj.type == 0 && (charObj.input === 0 || charObj.input === 2)) {
                        return wordObj;
                    }
                }
            }
            return null;
        },
        ///本次学习结束
        learnFinish: function () {
            this.learnFinished = true
           
        },
        ///加载下一个单词
        moveToNext: function () {
            if (this.currentWordIndex + 1 >= this.listWord.length - 1) {
                this.learnFinish()
                return
            }
            this.currentWordIndex++
            this.loadCurrentWord()

        },
        ///加载当前单词
        loadCurrentWord: function () {
            this.currentWord = this.listWord[this.currentWordIndex]

            this.learnProgress = this.currentWordIndex / this.listWord.length

            ///加载例句
            var req = {
                noteId: this.currentWord.NoteId,
                itemId: this.currentWord.ItemId,
                itemName: this.currentWord.ItemName
            }
            var that = this
            LightApp.noteItem.queryResItems(req, function (res) {
                console.log("加载资料返回", res)
                if (res == null || res.length == 0) {
                    return
                }
                var ampItem = res.find(p => p.ResName == "例句")
                var descItem = res.find(p => p.ResName == "释义")
                if (descItem != null) {
                    that.currentWord.translate = descItem.Content
                }
                if (ampItem == null) {
                    return
                }
                var content = ampItem.Content
                var arrs = content.split("\n\n")

                that.loadSpellItems(that.shuffleArray(arrs).slice(0, 3))

            })
        },
        ///随机打乱数组
        shuffleArray: function (array) {
            for (let i = array.length - 1; i > 0; i--) {
                // 生成0到i之间随机整数
                const j = Math.floor(Math.random() * (i + 1));
                // 交换元素
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        ///加载拼写项目
        loadSpellItems: function (arrs) {
            this.listSpellItems = [
                {
                    word: this.currentWord.ItemName,
                    translate: this.currentWord.translate,
                    items: this.generateSpellWords(this.currentWord.ItemName)
                }
            ]
            for (var i = 0; i < arrs.length; i++) {
                var item = arrs[i]
                const line = item.replace(/:ResName=.*?\n:Play\s*/g, '');
                const lines = line.split('\n');
                var word = lines[0].replaceAll("**", "").trim()
                var translate = lines[1].trim()
                this.listSpellItems.push({
                    word: word,
                    translate: translate,
                    items: this.generateSpellWords(word)
                })
                //console.log("word",word,translate)
            }
            this.spellItemIndex = -1

            this.moveNextSpellItem()
        },
        // 切换到上一句
        movePrevSpellItem: function () {
            if (this.spellItemIndex > 0) {
                this.spellItemIndex--;
                this.spellItem = this.listSpellItems[this.spellItemIndex];
                this.spellWordIndex = 0;
                this.showAnswer = 0;
                this.inputError = false;
                // 重置输入状态
                for (let wordObj of this.spellItem.items) {
                    for (let charObj of wordObj.chars) {
                        charObj.input = 0;
                        charObj.errChar = '';
                        charObj.show = 0;
                    }
                }
                this.playText(this.spellItem.word);

            }
        },
        ///加载下一个拼写项目
        moveNextSpellItem: function () {
            if (this.spellItemIndex + 1 >= this.listSpellItems.length) {
                //加载下一个单词
                this.moveToNext();
                return;
            }
            this.spellItemIndex++;
            this.spellItem = this.listSpellItems[this.spellItemIndex];
            this.spellWordIndex = 0;
            this.showAnswer = 0;
            this.inputError = false;
            // 重置输入状态
            for (let wordObj of this.spellItem.items) {
                for (let charObj of wordObj.chars) {
                    charObj.input = 0;
                    charObj.errChar = '';
                    charObj.show = 0;
                }
            }
            this.playText(this.spellItem.word);
        },
        ///重新加载单词句子
        reloadCurrentSpellItem: function () {
            this.spellWordIndex = 0;
            this.showAnswer = 0;
            this.inputError = false;
            // 重置输入状态
            for (let wordObj of this.spellItem.items) {
                for (let charObj of wordObj.chars) {
                    charObj.input = 0;
                    charObj.errChar = '';
                    charObj.show = 0;
                }
            }
            this.playText(this.spellItem.word);
        },
        // 添加一个新方法来处理循环逻辑
        handleLoopLogic: function () {
            const loopMap = {
                'loop2': 2,
                'loop3': 3,
                'loop4': 4,
                'loop5': 5
            };

            // 初始化当前单词的循环次数（如果未初始化）
            if (this.loopCount === undefined) {
                this.loopCount = 1;
            } else {
                this.loopCount++;
            }

            // 根据不同的循环模式处理
            if (this.config.loopMode === 'order') {
                // 顺序模式，直接进入下一个
                this.moveNextSpellItem();
            }
            else if (this.config.loopMode === 'loop') {
                // 无限循环模式
                this.reloadCurrentSpellItem();
                return
            }
            else if (this.config.loopMode in loopMap) {
                // 特定次数循环模式
                if (this.loopCount >= loopMap[this.config.loopMode]) {
                    // 达到指定循环次数，移动到下一个
                    this.loopCount = 0;
                    this.moveNextSpellItem();
                } else {
                    // 未达到循环次数，重新加载当前单词
                    this.reloadCurrentSpellItem();
                }
            }
        },
        ///生成拼写字母
        generateSpellWords: function (text) {
            if (typeof text !== 'string') return [];

            // 使用空格分割，过滤空字符串
            const words = text.split(/\s+/).filter(Boolean);
            // 判断是否是英文字母
            const isLetter = (ch) => /^[A-Za-z]$/.test(ch);
            return words.map(word => {
                const chars = Array.from(word).map(ch => ({
                    char: ch,
                    type: isLetter(ch) ? 0 : 1,
                    input: 0,//0未输入，1=输入正确,2=输入错误
                    show: 0
                }));

                return {
                    word,
                    chars
                };
            });
        },
        ///播放提示音
        playAssetsSound: function (src) {
            this.audio.src = src
            this.audio.play().catch(error => {
                console.log('播放失败:', error);
            });
        },
        ///播放单词发音
        playText: function (text) {
            var playerName = this.config.soundName == "US" ? "@英语(美音)" : "@英语(英音)"
            LightApp.sound.playText(text, playerName, this.config.playSpeed, function () {

            })
        },
        ///改变当前输入单词的显示状态
        changeSpellWordShow: function () {
            //this.showAnswer = this.showAnswer==0?1:0
            var spellWord = this.getCurrentSpellWord()

            if (spellWord == null) {
                return
            }
            var rs = 0;
            var charText = ""
            for (var i = 0; i < spellWord.chars.length; i++) {
                var charObj = spellWord.chars[i]
                if (i == 0) {
                    rs = charObj.show == 0 ? 1 : 0
                }
                charObj.show = rs
                charText += charObj.char
            }
            if (rs == 1) {
                this.playText(charText)
            }
        },
        setWordMShow(wordObj, val) {
            if (!wordObj || !wordObj.chars) return;
            for (let charObj of wordObj.chars) {
                charObj.mshow = val;
            }

        },
        ///点击spell单词
        clickSpellWord: function (wordObj) {
            var text = "";
            for (let charObj of wordObj.chars) {
                text += charObj.char

            }
            this.playText(text)
        },
        ///改变当前句子显示状态
        changeAllSpellWordShow: function () {
            if (!this.spellItem || !this.spellItem.items) return null;
            this.showAnswer = this.showAnswer == 0 ? 1 : 0
            for (let wordObj of this.spellItem.items) {
                for (let charObj of wordObj.chars) {
                    charObj.show = this.showAnswer
                }
            }
        },
        ///更新循环次数
        updateLoopMode: function (mode) {
            this.config.loopMode = mode
            this.loopCount = 0
            switch (mode) {
                case "order":
                    this.config.loopName = "顺序切换"
                    break
                case "loop2":
                    this.config.loopName = "循环2次"
                    break
                case "loop3":
                    this.config.loopName = "循环3次"
                    break
                case "loop4":
                    this.config.loopName = "循环4次"
                    break
                case "loop5":
                    this.config.loopName = "循环5次"
                    break
                case "loop":
                    this.config.loopName = "无限循环"
                    break
            }
        },
        ///配置改变
        changeConfig: function (name, val) {
            switch (name) {
                case "showTranslate":
                    this.config.showTranslate = !this.config.showTranslate
                    break
                case "loopMode":
                    this.updateLoopMode(val);
                    break
                case "playSpeed":
                    this.config.playSpeed = val
                    break;
                case "soundName":
                    this.config.soundName = val
                    break
            }
            var saveConfig = JSON.parse(JSON.stringify(this.config))
            LightApp.config.writeConfig("ExampleSpellApp", saveConfig, function () {
                console.log("保存配置成功")
            })
        }


    }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dvfinish{
    display: flex;
    justify-content: center;
    align-items: center;
}
.lbwordpage {
    color: var(--ek-text-color2);
    font-size: 16px;
    font-weight: bold;
}

.lbcurword {
    margin-left: 20px;
    color: var(--ek-text-color2);
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    font-weight: bold;
}

.v-top {
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
}

.wpv {
    background: #6183ff;
}

.wordProgress {
    height: 5px;
    background: #e8e8e8;
    display: flex;
}

.vheader {
    height: 80px;
}

.lbspellpage {
    text-align: center;
    margin-top: 30px;
    color: var(--ek-text-color3);
}

.vkey {
    background: var(--ek-card-backColor);
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    margin-right: 10px;
    color: var(--ek-text-color1);
}

.vbottom {
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    gap: 30px;
}

.curspellword {
    border-color: #5252ff !important;
}

.char-err {
    color: #ff4848;
}

.unshow {
    opacity: 1 !important;
}

.uninput {
    color: #e3e3e3;
    opacity: 0;
}

.spitem {
    border-bottom: 5px solid #d5d5d5;
    padding-bottom: 5px;
    display: flex;
    cursor: pointer;
}

.lbspell {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    font-size: 45px;
    font-weight: bold;
    flex-wrap: wrap;
    gap: 20px;
    margin-left: 50px;
    margin-right: 50px;
}

.lbtrans {
    text-align: center;
    font-size: 35px;
    margin-left: 20px;
    margin-right: 20px;
}

.spell-container {
    height: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.game-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
}

.game-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f5f5f5;
}

.game-area {
    flex: 1;
    position: relative;
    overflow: hidden;
    background-color: #f9f9f9;
}

.word-row {
    position: absolute;
    display: flex;
    flex-direction: row;
    left: 100%;
    height: 40px;
    /* 设置固定行高 */
    white-space: nowrap;
    transition: transform 0.1s linear;
    align-items: center;
    /* 垂直居中单词 */
}

.row-paused {
    background-color: rgba(230, 247, 255, 0.3);
}

.word-item {
    display: inline-block;
    padding: 5px 12px;
    margin: 0 10px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
}

.word-item:hover {
    background-color: #e9f7fe;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    transform: scale(1.1);
    z-index: 10;
}

.word-clicked {
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
}

.feedback-message {
    position: absolute;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 10px;
    animation: float-up 1s ease-out;
    pointer-events: none;
}

.correct-feedback {
    background-color: rgba(76, 175, 80, 0.7);
    color: white;
}

.wrong-feedback {
    background-color: rgba(244, 67, 54, 0.7);
    color: white;
}

@keyframes float-up {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-30px);
    }
}

.meaning-area {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e3f2fd;
    border-top: 1px solid #ddd;
}

.current-meaning {
    font-size: 18px;
    font-weight: bold;
}

.score {
    font-size: 18px;
    font-weight: bold;
}

.controls button {
    margin-left: 10px;
    padding: 5px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.controls button:hover {
    background-color: #45a049;
}

/* 保留原有样式 */
.secitem {
    margin-left: 20px;
}

.shortcut {
    display: flex;
    padding-left: 20px;
    padding-top: 15px;
    padding-right: 20px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e3e3e3;
    padding-bottom: 10px;
}

.navcontainer {
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: baseline;
}

.selnav {
    font-size: 20px !important;
    font-weight: bold;
    color: #000000 !important;
}

.nav-item {
    margin-right: 20px;
    color: #666666;
    font-size: 14px;
}

/* 添加已点击状态的样式 */
.moving-word[clicked="true"] {
    /* 删除此处的样式 */
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-10px);
    }

    40% {
        transform: translateX(10px);
    }

    60% {
        transform: translateX(-10px);
    }

    80% {
        transform: translateX(10px);
    }

    100% {
        transform: translateX(0);
    }
}

.spitem.shake {
    animation: shake 0.4s;
}
</style>