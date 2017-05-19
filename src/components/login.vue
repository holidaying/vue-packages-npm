<template>
    <div class="container-dialog" style="width:1500px;margin-left:-200px">
        <canvas id="canvasLogin"></canvas>
    </div>
</template>
<script>
export default {
    name: '',
    data:function(){
        return {
            
        }
    },
    mounted:function()
    {
    	this.$posalogin.init();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-dialog
{
    position: relative;
    height: 500px;
    width: 100%;
}
</style>
