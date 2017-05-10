<template>
    <div class="app-info">
        <span>应用：{{info.name}}</span>
        <span>版本：{{info.version}}</span>
        <span>简介：{{info.description}}</span>
    </div>
</template>
<script>
module.exports = {
    name:"posaAbout",
    props: ['message'],
    data: function() {
        return {
            info: {
                name: "posa组件",
                version: "1.0.0.mock",
                description: "posa组件"
            }
        };
    },
    compiled: function() {},

}
</script>
<style scoped>
.app-info span {
    background-color: honeydew;
    display: block;
    width: auto;
    height: auto;
    font-size: medium;
    color: #00a1f1;
}
</style>
