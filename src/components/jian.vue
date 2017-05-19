<template>
    <div class="jianli">
        <editor-style ref="StyleEditor"></editor-style>
        <editor-resume ref="ResumeEditor"></editor-resume>
        <div v-html="styleHtml">
        </div>
    </div>
</template>
<script>
import EditorStyle from "./styleEditor.vue";
import EditorResume from "./resumeEditor.vue";
export default {
    name: 'jian',
    data: function() {
        return {
            state: {
                style: "",
            },
            styleHtml: "",
            interval: 40,
            resumeEditorContent: '\n # react版动态简历 \n ## 个人爱好 \n 1. 技能树：\n html(5)，css(3)，ES5，ES6，scss，node.js；php，mysql，asp.net,asp（这些很久不用了）;\n2. 博客\n**GitHub: **https://github.com/songhaoreact\n** 博客: http://songhao888.cn/** \n> 如果你喜欢这个效果，Fork [我的项目](https://github.com/ShiningDan/reactjianli)，打造你自己的简历！',
            styleEditorContent: ['/**@*Hello, 我是小哥@*@*这是用Vue版的动态简历@*希望大家能够喜欢:)@*/@/*所以我们就开始吧！首先给所有元素加上过渡效果 */@*{@-webkit-transition: all .3s;@transition: all .3s;@}@/*白色背景太单调了，我们来点背景 */@html {@color: #14d112; background: #000000; @}@.styleEditor {@padding: .5em;@border: 1px solid;@margin: .5em;@overflow: auto;@width: 45vw; @height:90vh;@}@/*哈哈，有没有一点儿黑客效果*/@/*再加一点3D效果，更加地酷炫 */@html {@ -webkit-perspective: 1000 px;@perspective:1000px;@}@.styleEditor {@position: fixed;left: 0;top: 0;@ -webkit-transition: none;@transition: none;@ -webkit-transform: rotateY(10deg) translateZ(-100px);@transform: rotateY(10deg) translateZ(-100 px);@}@ /*不知道以上对代码框的修改你是否喜欢呢？ */ @ /* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */@.resumeEditor {@position: fixed;right: 0;top: 0;@padding: .5em;margin: .5em;@width: 48vw;height: 90vh;@border: 1 px solid;@background: white;color: #222;@overflow: auto;@}@/* 好了，我开始写简历了 */', '@/* 这个简历好像差点什么@* 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式@* 简单，用开源工具翻译成 HTML 就行了@*           3          @*           2          @*           1          @*          action！@*/', '/* 再对 HTML 加点样式 */@.resumeEditor{@padding: 2em;@}@.resumeEditor h1{@display: block;@width:80px;@margin:0 auto;@}@.resumeEditor h2{@display: inline-block;@border-bottom: 1px solid;@margin: 1em 0.5em;@}@.resumeEditor h3{@display: inline-block;@margin: 0.5em 0;@}@.resumeEditor a{@color: #000;@}@.resumeEditor ul{@list-style: none;@}@.resumeEditor ul>li::before {@content: "•";@margin-left: 1em;@margin-right: 0.5em;@}@.resumeEditor blockquote {@margin: 1em;@padding: .5em;@background: #ddd;@}'],
        }
    },
    components: {
        "editor-style": EditorStyle,
        "editor-resume": EditorResume
    },
    methods: {
        addToStyle: function(char) {
            if (char == "@") {
                char = " ";
            };
            this.state.style = this.state.style + char;
            this.styleHtml = "<style>" + this.state.style + "</style>";
        },
        replaceStyle: function(style) {
            this.state.style = style;
        },
        showStyleEditorContent: function(n) {

            let lastContentLength = 0;
            if (n !== 0) {
                lastContentLength = this.state.style.length;
            }
            let style = this.styleEditorContent[n];
            let len = style.length;
            return new Promise((resolve, reject) => {
                let showStyle = function() {
                    let currentLen = this.state.style.length - lastContentLength;
                    if (currentLen < len) {
                        let char = style.substring(currentLen, currentLen + 1);
                        this.$refs.StyleEditor.addToContent(char);
                        this.addToStyle(char);
                        setTimeout(showStyle, this.interval);
                    } else {
                        resolve();
                    }
                }.bind(this);
                showStyle();
            });
        },
        showResumeContent: function() {
            let content = this.resumeEditorContent;
            let len = content.length;
            return new Promise((resolve, reject) => {
                let showContent = function() {
                    let currentLen = this.$refs.ResumeEditor.getCurrentContentLength();
                    if (currentLen < len) {
                        let char = content.substring(currentLen, currentLen + 1);
                        this.$refs.ResumeEditor.addToContent(char);
                        setTimeout(showContent, this.interval);
                    } else {
                        resolve();
                    }
                }.bind(this);
                showContent();
            });
        },

        setResumeMarkdown: function() {
            var self = this;
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    self.$refs.ResumeEditor.setIsMarkdown(true);
                }, self.interval);
                resolve()
            });
        },
        async startShow() {
            await this.showStyleEditorContent(0).then(function() {
                console.log('done! show Content 0')
            });
            await this.showResumeContent();
            await this.showStyleEditorContent(1).then(function() {
                console.log('done! show Content 1')
            });
            await this.setResumeMarkdown();
            await this.showStyleEditorContent(2).then(function() {
                console.log('done! show Content 2')
            });
        },
        componentDidMount: function() {
            this.startShow();
        }

    },
    mounted: function() {
        this.componentDidMount();
    }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

*::before {
    box-sizing: border-box;
}

*::after {
    box-sizing: border-box;
}
</style>
