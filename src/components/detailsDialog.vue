<template>
    <div style="width:1500px;margin-left:-200px">
        <div class="list-content baselibBodyBox">
            <div class="listItem">
                <div class="details-content-item" @click="showDetail">
                	<img src="https://sf-sponsor.b0.upaiyun.com/4ea23eebe5bf3d21b6a8cfe99591a734.gif"></image>
                </div>
            </div>
        </div>
        <posa-details-dialog :details="detailsData" :detailindex="detailIndex" :isshow="isShowDetails" :detailtype="'body'" :pageheight="eventHeight" @close-dialog="closeDialog"></posa-details-dialog>
    </div>
</template>
<script>
export default {
    name: '',
    data:function(){
        return {
            eventHeight: 20,
            isShowDetails: false,
            detailIndex: 0,
            msg: 'VDT开发组件',
            detailsData: [{
                imageUrl: "https://sf-sponsor.b0.upaiyun.com/4ea23eebe5bf3d21b6a8cfe99591a734.gif",
                imageName: "人体",
                time: 1494319214187,
                upperColor: "红",
                lowerColor: "蓝",
                deviceName: "火车站",
                remark: "2333333333333",
                lineCount: 1,
                lineAllCount: 6
            }],
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
    },
    mounted: function() {
        // body...
        var details = {
            imageUrl: "https://sf-sponsor.b0.upaiyun.com/4ea23eebe5bf3d21b6a8cfe99591a734.gif",
            imageName: "人体",
            time: 1494319214187,
            upperColor: "红",
            lowerColor: "蓝",
            deviceName: "火车站",
            remark: "2333333333333",
            lineCount: 1,
            lineAllCount: 6
        };
       
        this.detailsData.push(details);
    },
    methods:{
    	showDetail:function()
    	{
    		 this.isShowDetails=true;
    	},
    	closeDialog:function()
    	{
    		this.isShowDetails=false;
    	}
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listItem {
    display: inline-block;
    margin-right: 4.5px;
    width: 100%;
}

.details-content-item {
    width: 100px;
    height: 174px;
    display: inline-block;
    position: relative;
}
</style>
