<template>
    <div class="resumeEditor" v-html="state.htmlContext">
       
    </div>
</template>
<script>
import marked from "marked";
export default {
    name: 'editor-resume',
    data: function() {
        return {
            state: {
                style: "",
                content: "",
                isMarkdown: false,
                htmlContext: "",
            }
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
            if(char!="@")
            {
                this.state.content = this.state.content + char;
            }
            else
            {
                this.state.content = this.state.content + "<br>";
            }
            if (this.state.isMarkdown) {
                this.state.htmlContext = marked(this.state.content)
            }
            else
            {
                this.state.htmlContext = this.state.content;
            }

        },
        getCurrentContentLength: function() {
            return this.state.content.length;
        },
        setIsMarkdown: function(isMarkdown) {
            this.state.isMarkdown = true;
            this.addToContent();
        }
    }
}
</script>
<style scoped>
.resumeEditor
{
    text-align: left;
    white-space: normal;
}
</style>
