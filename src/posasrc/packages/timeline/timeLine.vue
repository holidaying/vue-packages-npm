<template>
    <div class="timeline-content">
        <div class="timelineMain">
            <!--左侧下拉选择 start-->
            <div class="t_l_nav">
                <div class="t_l_select borderRadius">
                    <div class="t_l_seled">{{tl_zyTypeTxt}}</div>
                    <ul class="t_l_option borderRadius">
                        <li @click="changType(0,'全部')">全部</li>
                        <li @click="changType(1,'卡口车辆')">卡口车辆</li>
                        <li @click="changType(2,'人像抓拍')">人像抓拍</li>
                        <li @click="changType(3,'RFID数据')">RFID数据</li>
                        <li @click="changType(4,'电子围栏')">电子围栏</li>
                        <li @click="changType(5,'WIFI热点')">WIFI热点</li>
                    </ul>
                </div>
            </div>
            <!--左侧下拉选择 end-->
            <div class="t_c_tl" v-bind:style="ui_t_c_tl">
                <div class="t_c_tlBox borderRadius">
                    <div class="t_c_tlDrop borderRadius" id="drop_box" v-bind:style="ui_t_c_tlDrop">
                        <a href="javascript:void(0)" id="drop_start" v-bind:style="ui_t_c_tlDrop_start" class="drop_start br50" title="开始"></a>
                        <a href="javascript:void(0)" id="drop_end" v-bind:style="ui_t_c_tlDrop_end" class="drop_end br50" title="结束"></a>
                        <div class="drop_playBg borderRadius" v-bind:style="ui_drop_playBg">
                            <div class="drop_playBg_curPlay borderRadius" id="drop_playBg_curPlay" v-bind:style="ui_drop_playBg_curPlay"></div>
                        </div>
                    </div>
                </div>
                <div class="t_c_tlScale">
                    <span class="t_c_tlScaleItem" v-bind:style="ui_t_c_tlScaleItem" v-for="item in t_c_tlScaleData">{{item}}</span>
                </div>
            </div>
            <!--右侧下拉选择 start-->
            <div class="t_r_nav">
                <a href="javascript:void(0)" class="t_r_playBtn borderRadius" title="播放" @click="playData">▸</a>
                <div class="t_r_select borderRadius">
                    <div class="t_r_seled">{{tl_typeTxt}}</div>
                    <ul class="t_r_option borderRadius">
                        <li @click="changTime('day','近24小时')">近24小时</li>
                        <li @click="changTime('week','近7天')">近7天</li>
                        <li @click="changTime('month','近一月')">近一月</li>
                        <li @click="changTime('year','近一年')">近一年</li>
                    </ul>
                </div>
                <div id="logDiv" style="width:100%;float:left;color:#fff;margin-top:10px;"></div>
            </div>
            <!--右侧下拉选择 start-->
        </div>
    </div>
</template>
<script>
import drag from "./drag.js";
export default {
    name: 'posaTimeline',
    data: function() {
        return {
            ui_drop_playBg: "",
            ui_drop_playBg_curPlay: "",
            ui_t_c_tlDrop: "",
            ui_t_c_tlDrop_start: "",
            ui_t_c_tlDrop_end: "",

            ui_t_c_tl: "", //时间轴长度
            ui_t_c_tlScaleItem: "", //时间轴刻度单个长度
            t_c_tlScaleData: [], //时间轴数据

            tl_zyTypeTxt: "资源选择",
            tl_zyType: 0,

            tl_typeTxt: "近24小时",
            tl_type: "day", //day,week,month,year
            tl_day: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            tl_week: ["第1天", "第2天", "第3天", "第4天", "第5天", "第6天", "第7天"],
            tl_month: ["1号", "2号", "3号", "4号", "5号", "6号", "7号", "8号", "9号", "10号", "11号", "12号", "13号", "14号", "15号", "16号", "17号", "18号", "19号", "20号", "21号", "22号", "23号", "24号", "25号", "26号", "27号", "28号", "29号", "30号"],
            tl_year: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],

            callBackObj: {
                resourceType: "0",
                timeType: "day"
            }

        }
    },
    created: function() {
        this.initLayout();
    },
    mounted: function() {
        this.initDrag();
    },
    watch: {

    },
    components: {

    },
    methods: {
        //初始化界面各区块大小
        initLayout: function() {
            var self = this;
            var tlItemNum = 0;
            var nowtTimeVal = 0;
            var oDate = new Date();
            var main_w = document.body.clientWidth;
            var main_h = document.body.clientHeight;
            self.ui_t_c_tl = {
                width: (main_w - 350) + 'px',
                marginLeft: '5px'
            };

            if (self.tl_type == "day") {
                tlItemNum = self.tl_day.length;
                self.t_c_tlScaleData = self.tl_day;
                nowtTimeVal = oDate.getHours();
            }
            if (self.tl_type == "week") {
                tlItemNum = self.tl_week.length;
                self.t_c_tlScaleData = self.tl_week;
                nowtTimeVal = 7;
            }
            if (self.tl_type == "month") {
                tlItemNum = self.tl_month.length;
                self.t_c_tlScaleData = self.tl_month;
                nowtTimeVal = oDate.getDate() - 1;
            }
            if (self.tl_type == "year") {
                tlItemNum = self.tl_year.length;
                self.t_c_tlScaleData = self.tl_year;
                nowtTimeVal = oDate.getMonth();
            }
            self.ui_t_c_tlScaleItem = {
                width: ((main_w - 350) / tlItemNum) + 'px'
            }; //设置时间轴
            //判断当前时间点
            self.ui_t_c_tlDrop = {
                width: (nowtTimeVal * ((main_w - 350) / tlItemNum)) + 'px'
            };
            self.ui_t_c_tlDrop_start = {
                left: '0px'
            }; //还原初始值
            self.ui_t_c_tlDrop_end = {
                left: self.ui_t_c_tlDrop.width + 'px'
            }; //还原初始值
            self.ui_drop_playBg = {
                left: self.ui_t_c_tlDrop_start.left,
                width: self.ui_t_c_tlDrop.width
            };
            self.ui_drop_playBg_curPlay = {
                width: '0%'
            };
        },
        initDrag: function() {
            var self = this;

            $("#drop_start").dragging({
                move: 'x',
                randomPosition: false
            }, function() {
                self.ui_t_c_tlDrop_start.left = this.css("left");
                var width = parseInt((self.ui_t_c_tlDrop_end.left).replace("px", "")) - parseInt(this.css("left").replace("px", "")) + 14;
                self.ui_drop_playBg = {
                    left: this.css("left"),
                    width: parseInt(width) + "px"
                };
                //调用校验
                self.chkTimeLine(width, parseInt(this.css("left").replace("px", "")), parseInt((self.ui_t_c_tlDrop_end.left).replace("px", "")), "start");
            }, function() {
                //鼠标抬起后校验
                self.chkMouseUp(self.ui_t_c_tlDrop_start.left, self.ui_t_c_tlDrop_end.left);
            });

            $("#drop_end").dragging({
                move: 'x',
                randomPosition: false
            }, function() {
                self.ui_t_c_tlDrop_end.left = this.css("left");
                var width = parseInt(this.css("left").replace("px", "")) - parseInt((self.ui_t_c_tlDrop_start.left).replace("px", "")) + 14;
                self.ui_drop_playBg = {
                    left: self.ui_t_c_tlDrop_start.left,
                    width: parseInt(width) + "px"
                };
                //调用校验
                self.chkTimeLine(width, parseInt((self.ui_t_c_tlDrop_start.left).replace("px", "")), parseInt(this.css("left").replace("px", "")), "end");
            }, function() {
                //鼠标抬起后校验
                self.chkMouseUp(self.ui_t_c_tlDrop_start.left, self.ui_t_c_tlDrop_end.left);
            });
        },
        //校验选择的时间段是否合理
        chkTimeLine: function(timeWidth, start, end, evelObj) {
            var self = this;
            var scaleItemWidth = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
            //当间距小于最小刻度时
            if (timeWidth < scaleItemWidth) {
                setTimeout(function() {
                    if (evelObj == "start") {
                        self.ui_t_c_tlDrop_start.left = (end - scaleItemWidth + 14) + "px";
                    }
                    if (evelObj == "end") {
                        self.ui_t_c_tlDrop_end.left = (start + scaleItemWidth - 14) + "px";
                    }
                    self.ui_drop_playBg.left = self.ui_t_c_tlDrop_start.left;
                    self.ui_drop_playBg.width = scaleItemWidth + "px";
                }, 500);
            }
        },
        //在鼠标抬起后校验时间选择断
        chkMouseUp: function(start_left, end_left) {
            var self = this;
            setTimeout(function() {
                var scaleItemWidth = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
                var dropWidth = parseInt(self.ui_t_c_tlDrop.width.replace("px", ""));
                start_left = parseInt(start_left.replace("px", ""));
                end_left = parseInt(end_left.replace("px", ""));
                start_left = (parseInt(start_left / scaleItemWidth)) * scaleItemWidth;
                end_left = Math.ceil(end_left / scaleItemWidth) * scaleItemWidth;
                if (end_left >= dropWidth) {
                    end_left = dropWidth
                }

                self.ui_t_c_tlDrop_start.left = start_left + "px";
                self.ui_t_c_tlDrop_end.left = (end_left - 14) + "px";
                self.ui_drop_playBg.left = self.ui_t_c_tlDrop_start.left;
                self.ui_drop_playBg.width = (end_left - start_left) + "px";
            }, 100);
        },
        //播放点击事件
        playData: function() {
            var self = this;
            var start = parseInt((self.ui_t_c_tlDrop_start.left).replace("px", ""));
            var width = parseInt((self.ui_drop_playBg.width).replace("px", ""));
            var scaleItemWidth = parseInt(self.ui_t_c_tlScaleItem.width.replace("px", ""));
            var num = parseInt(width / scaleItemWidth);
            var startNum = parseInt(start / scaleItemWidth);

            var timeSpArr = [];
            if (self.tl_type == "day") {
                timeSpArr = self.tl_day;
            }
            if (self.tl_type == "week") {
                timeSpArr = self.tl_week;
            }
            if (self.tl_type == "month") {
                timeSpArr = self.tl_month;
            }
            if (self.tl_type == "year") {
                timeSpArr = self.tl_year;
            }
            timeSpArr = timeSpArr.slice(startNum, num);
            console.log("开始点下标：" + startNum + "_____总计个数：" + num);


            var tempNum = 0;
            var tempIndex = 0;
            var t1 = window.setInterval(function() {
                if (tempNum == 1000) {
                    window.clearInterval(t1);
                } else {
                    if (tempNum == 0) {
                        console.log("下标：" + 0 + "___对应时间轴数值：" + timeSpArr[0]);
                        $("#logDiv").html("下标：" + 0 + "_对应数值：" + timeSpArr[0]);
                    }
                    tempNum++;
                    self.ui_drop_playBg_curPlay = {
                        width: (tempNum / 10) + "%"
                    };
                    //$("#drop_playBg_curPlay").css("width",(tempNum/10)+"%");
                    if ($("#drop_playBg_curPlay").width() % scaleItemWidth == 0 && (tempIndex = $("#drop_playBg_curPlay").width() / scaleItemWidth) < num) {
                        tempIndex = $("#drop_playBg_curPlay").width() / scaleItemWidth;
                        console.log("下标：" + tempIndex + "___对应时间轴数值：" + timeSpArr[tempIndex]);
                        $("#logDiv").html("下标：" + tempIndex + "_对应数值：" + timeSpArr[tempIndex]);
                    }
                }
            }, 10);

        },
        //选择时间
        changTime: function(type, typeTxt) {
            var self = this;
            self.tl_type = type;
            self.tl_typeTxt = typeTxt;
            self.initLayout();
        },
        //资源选择
        changType: function(type, typeTxt) {
            var self = this;
            self.tl_zyTypeTxt = typeTxt;
            //回调接口，暴露数据
            self.callBackObj.resourceType = type;
            self.$emit('timeLineChangeCallBack', self.callBackObj);
        }


    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.timeline-content {
    width: 100%;
    z-index: 99999;
    height: 100px;
    position: absolute;
    bottom: 0px;
}

.borderRadius {
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    -ms-border-radius: 9px;
    -o-border-radius: 9px;
}

.br50 {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
}

.timelineMain {
    width: 100%;
    height: 100%;
    background: #172F4C;
    padding-top: 15px;
    font-size: 12px;
}

.timelineMain .t_l_nav {
    width: 145px;
    height: 80px;
    float: left;
    margin-right: 5px;
}

.timelineMain .t_l_nav .t_l_select {
    width: 100px;
    float: right;
    height: 18px;
    background-color: #2C85F6;
    color: #fff;
    text-align: center;
    position: relative;
}

.timelineMain .t_l_nav .t_l_select .t_l_seled {
    width: 100%;
    float: left;
    height: 18px;
    line-height: 18px;
    cursor: pointer;
}

.timelineMain .t_l_nav .t_l_select .t_l_option {
    display: none;
    width: 100px;
    height: 150px;
    margin-top: -155px;
    background: #2C85F6;
    overflow: hidden;
    border-bottom: #172F4C 5px solid;
}

.timelineMain .t_l_nav .t_l_select .t_l_option li {
    width: 100%;
    float: left;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
}

.timelineMain .t_l_nav .t_l_select .t_l_option li:hover {
    background-color: #4695FA;
}

.timelineMain .t_l_nav .t_l_select:hover .t_l_option {
    display: block;
    margin-top: -155px;
}

.timelineMain .t_r_nav {
    width: 185px;
    height: 80px;
    float: right;
    margin-left: 5px;
}

.timelineMain .t_r_nav .t_r_playBtn {
    display: block;
    float: left;
    width: 18px;
    height: 18px;
    background-color: #2C85F6;
    color: #fff;
    line-height: 14px;
    text-align: center;
    font-size: 28px;
}

.timelineMain .t_r_nav .t_r_playBtn:hover {
    background-color: #4695FA;
}

.timelineMain .t_r_nav .t_r_select {
    width: 100px;
    float: left;
    height: 18px;
    margin-left: 10px;
    background-color: #2C85F6;
    color: #fff;
    text-align: center;
    position: relative;
}

.timelineMain .t_r_nav .t_r_select .t_r_seled {
    width: 100%;
    float: left;
    height: 18px;
    line-height: 18px;
    cursor: pointer;
}

.timelineMain .t_r_nav .t_r_select .t_r_option {
    display: none;
    width: 100px;
    height: 100px;
    margin-top: -100px;
    background: #2C85F6;
    overflow: hidden;
    border-bottom: #172F4C 5px solid;
}

.timelineMain .t_r_nav .t_r_select .t_r_option li {
    width: 100%;
    float: left;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
}

.timelineMain .t_r_nav .t_r_select .t_r_option li:hover {
    background-color: #4695FA;
}

.timelineMain .t_r_nav .t_r_select:hover .t_r_option {
    display: block;
    margin-top: -105px;
}

.timelineMain .t_c_tl {
    height: 80px;
    float: left;
}

.timelineMain .t_c_tl .t_c_tlBox {
    width: 100%;
    float: left;
    height: 18px;
    background-color: #244671;
}

.timelineMain .t_c_tl .t_c_tlBox .t_c_tlDrop {
    height: 18px;
    position: relative;
    left: 0px;
    top: 0px;
}

.timelineMain .t_c_tl .t_c_tlBox .t_c_tlDrop .drop_playBg {
    background-color: #3A6293;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 18px;
    z-index: 0;
    width: 100px;
}

.timelineMain .t_c_tl .t_c_tlBox .t_c_tlDrop .drop_playBg .drop_playBg_curPlay {
    height: 18px;
    width: 0%;
    float: left;
    background-color: #2D87F9;
}

.timelineMain .t_c_tl .t_c_tlBox .t_c_tlDrop .drop_start {
    display: block;
    width: 14px;
    height: 14px;
    background-color: #DFDFDF;
    position: absolute;
    left: 2px;
    top: 2px;
    z-index: 2;
}

.timelineMain .t_c_tl .t_c_tlBox .t_c_tlDrop .drop_end {
    display: block;
    width: 14px;
    height: 14px;
    background-color: #DFDFDF;
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 2;
}

.timelineMain .t_c_tl .t_c_tlScale {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.timelineMain .t_c_tl .t_c_tlScale .t_c_tlScaleItem {
    float: left;
    display: block;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
}
</style>
