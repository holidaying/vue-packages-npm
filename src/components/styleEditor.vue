<template>
    <div class="styleEditor">
        <pre><code class="language-css" v-html="state.content">
            </code>
        </pre>
    </div>
</template>
<script>
var Prism = require('prismjs');
export default {
    name: 'EditorStyle',
    data: function() {
        return {
            state: {
                style: "",
                content: "",
            },
        }
    },
    props: [],
    methods: {
        replaceStyle: function(style) {
            this.state.style = style;
        },
        replaceContent: function(content) {
            this.state.content = content;
        },
        addToContent: function(char) {
            if (char != "@") {
                this.state.content = this.state.content + char;
            } else {
                this.state.content = this.state.content + "<br>";
            }
            this.componentDidUpdate();
        },
        componentDidUpdate: function() {
            this.$el.scrollTop = 1000;
        },
        getCurrentContentLength: function() {
            return this.state.content.length;
        },
        setIsMarkdown: function(isMarkdown) {
            this.state.isMarkdown = isMarkdown;
        }
    }
}
</script>
<style>
@import "./prism.css";
.language-css {
    text-align: left;
}
</style>
