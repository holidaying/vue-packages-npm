<template>
    <div>
        <posa-timeline></posa-timeline>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data:function(){
        return {
            msg: 'VDT开发组件',
            searchData: {
                name: "",
                dateTimeStart: {
                    id: "startTime",
                    placeholder: "开始时间" //同步时间插件的时间
                },
                dateTimeEnd: {
                    id: "endTime",
                    placeholder: "结束时间" //同步时间插件的时间
                },
            },
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
