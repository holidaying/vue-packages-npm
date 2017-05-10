<template>
    <div>
        <div class="details-main">
            <a href="javascript:void(0)" class="detail-btn-close" id="detailClose_btn" v-on:click="closeDialog"></a>
            <slot>
                <div class="details-content">
                    <div class="left-pre">
                        <div class="left-pre-imge icon-last icon13441 icon-last-active" @click="upClick"></div>
                    </div>
                    <div class="left-content" id="showInfoBox">
                        <div id="imgShowBox" class="detailsImg" :style="{'background-image': 'url(' + this.details[this.detailindex].imageUrl + ')'}">
                        </div>
                        <div id="videoShowBox">
                            <iframe class="videoImg" id="videoImgBg" scrolling="no" frameborder="0" align="center"></iframe>
                            <div class="ocxBox" id="ocxBox"></div>
                            <div class="videoTool">
                                <div id="v_playbar" class="v_playbar" alt="进度条">
                                    <div id="v_curbar" class="v_curbar"></div>
                                </div>
                                <div class="v_playInfo">
                                    <div class="v_btnBox">
                                        <a href="javascript:void(0)" id="v_playBtn" @click="playVideo" class="v_playBtn" title="播放视频"></a>
                                        <a href="javascript:void(0)" id="v_playOrPauseBtn" @click="playOrPauseVideo" class="v_playOrPauseBtn v_PauseIcon"></a>
                                        <a href="javascript:void(0)" class="v_playSeepdBtn v_playSeepdLeftBtn" @click="playSpeedLeft" title="慢速播放"></a>
                                        <a href="javascript:void(0)" class="v_playSeepdBtn v_playSeepdRightBtn" @click="playSpeedRight" title="快速播放"></a>
                                        <span id="v_playInfoTxt"></span>
                                    </div>
                                    <a href="javascript:void(0)" class="v_fullBtn" @click="playFullWindow" title="全屏"></a>
                                    <span class="v_time">
                                        <em id="v_t_cur">00:00</em>/<em id="v_t_total">00:00</em>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-bar"></div>
                    <div class="right-content">
                        <div class="imageTools">
                            <div class="toolsContent"><a  id="pic1" target='_blank' title="下载"><i class='downloadImg'></i> </a>
                                <i class="toolTips">下载</i>
                            </div>
                            <div class="toolsContent" v-show="this.details[this.detailindex].searchImageUrl"><a class="toolLink" href="javascript:void(0)" v-on:click="linkToBaselibSearch(this.details[this.detailindex].searchImageUrl)" title="以图搜图"><i class='searchImg'></i> </a>
                                <i class="toolTips">以图搜图</i>
                            </div>
                        </div>
                        <div class="lc-container">
                            <div class="top-title">
                                <p>{{this.details[this.detailindex].imageName}}</p>
                            </div>
                            <div class="cross-Line"></div>
                            <div class="bottom-container" v-show="this.detailtype=='car'">
                                <p>车牌颜色：<span>{{this.details[this.detailindex].color_Plate|ifPlateColor}}</span></p>
                                <p>车牌类型：<span>{{this.details[this.detailindex].type_Plate|ifPlateType}}</span></p>
                                <p>车辆品牌：<span>{{this.details[this.detailindex].sBrand|ifVehicleBrand}}</span></p>
                                <p>车辆颜色：<span>{{this.details[this.detailindex].vehicleColor|ifVehiclecolor}}</span></p>
                                <p>车型子类：<span>{{this.details[this.detailindex].sSubBrand|ifVehicleSubBrand}}</span></p>
                                <p>行驶速度：<span>{{this.details[this.detailindex].passSpeed}} km/h</span></p>
                                <p>通过卡口：<span>{{this.details[this.detailindex].passAddress}}</span></p>
                                <p>通过时间：<span>{{this.details[this.detailindex].passTime}}</span></p>
                            </div>
                            <div class="bottom-container" v-show="this.detailtype=='face'">
                                <p>类别：<span>{{this.details[this.detailindex].imageName}}</span></p>
                                <p>性别：<span>{{this.details[this.detailindex].sex}}</span></p>
                                <p>年龄：<span>{{this.details[this.detailindex].age|faceScore}}</span></p>
                                <p>经过时间：<span>{{this.details[this.detailindex].time|dateTimeFormat}}</span></p>
                                <p>拍摄地点：<span>{{this.details[this.detailindex].deviceName}}</span></p>
                                <p>微笑：<span>{{this.details[this.detailindex].smile|ifAttractive}}</span></p>
                                <p>眼镜：<span>{{this.details[this.detailindex].eyeGlass|ifAttractive}}</span></p>
                                <p>太阳镜：<span>{{this.details[this.detailindex].sunGlass|ifAttractive}}</span></p>
                                <p>颜值：<span>{{this.details[this.detailindex].attractive|faceScore}}</span></p>
                            </div>
                            <div class="bottom-container" v-show="this.detailtype=='body'">
                                <p>类别：<span>{{this.details[this.detailindex].imageName}}</span></p>
                                <p>经过时间：<span>{{this.details[this.detailindex].time|dateTimeFormat}}</span></p>
                                <p>拍摄地点：<span>{{this.details[this.detailindex].deviceName}}</span></p>
                                <p>上身颜色：<span>{{this.details[this.detailindex].upperColor|colorTrans}}</span></p>
                                <p>下身颜色：<span>{{this.details[this.detailindex].lowerColor|colorTrans}}</span></p>
                                <p>描述：<span>{{this.details[this.detailindex].remark|ifNUll}}</span></p>
                            </div>
                            <div class="bottom-container" v-show="this.detailtype=='upload'">
                                <p>类别：<span>{{this.details[this.detailindex].imageType}}</span></p>
                                <p>上传人：<span>{{this.details[this.detailindex].userName}}</span></p>
                                <p>拍摄地点：<span>{{this.details[this.detailindex].deviceName}}</span></p>
                                <p>创建时间：<span>{{this.details[this.detailindex].createTime|dateTimeFormat}}</span></p>
                                <p>描述：<span>{{this.details[this.detailindex].remark|ifNUll}}</span></p>
                                <p>拍摄时间：<span style="color:#2d87f9!important">{{this.details[this.detailindex].time|dateTimeFormat}}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="right-pre">
                        <div class="right-pre-imge icon-next icon13441 icon-next-active" @click="downClick"></div>
                    </div>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
var v_playInterval;
var v_playCloseInterval;
var page_this;
import Check  from "../checkPlayer/check-player.js";
export default {
    name:"posaDetailsDialog",
    props: ['details', "detailindex", "isshow", "detailtype", "pageheight"],
    mounted: function() {
        var self = this;
        page_this = this;
    },
    watch: {
        'isshow': function(val) {
            if (val) {
                this.showDialog();
                $(".details-main").slideDown(500);
                // $(".details-main").css({
                //     "left": "-30px",
                //     "width": document.getElementsByClassName("viewTypeContent")[0].offsetWidth
                // });
                var self = this;
                document.onkeydown = function(e) {
                    var ev = e || window.event || arguments.callee.caller.arguments[0];
                    if (ev.keyCode == 27) {

                        //判断当前是否为全屏播放，如果是，关闭全屏，如果不是则关闭details页面
                        if ($("#videoShowBox").attr('display') == 'block') {
                            var playOCX = document.getElementById("PlAY_OCX");
                            var bool = playOCX.IsControlFullScreen();
                        }

                        if (bool) {
                            playOCX.RestoreControlScreenShow(); //设置非全屏
                        } else {
                            self.closeDialog();
                        }

                    } else if (ev.keyCode == 37) {

                        self.upClick();

                    } else if (ev.keyCode == 39) {

                        self.downClick();

                    }
                };
            } else {
                $(".details-main").slideUp(500);
                clearPalyerInfo(0);
                $(".details-content-item .detailContent").removeClass("bg-c33");
            }
        },
        "detailindex": function() {
            debugger
            this.showDialog();
            //添加未安装ocx提示
            this.$nextTick(function() {
                if ($("#videoShowBox").css("display") == "block") {
                    var isCanPlay = new Check().checkPlayerForDown(); //chk是否安装ocx控件
                }
            });
            if ($(".baselib-Container").scrollTop == self.pageheight && self.isshow) {
                $(".details-main").slideDown(500, function() {
                    $(".auxiliary-height").css("height", "0px");
                    $(".pageZoneHoldHigh").css("height", "0px");
                });
            }
        }
    },
    data: function() {
        return {
           
        }
    },
    methods: {
        linkToBaselibSearch: function(img) {
            var self = this;
            loading.showLoading("正在检索，请稍候...");
            self.$dispatch('baseLibImgSearchForDetails', img);

        },
        showDialog: function() {

            $(".details-content-item .detailContent").removeClass("bg-c33");
            $(".details-content-item .detailMain").removeClass("fc-cff");
            var appendAllIndex = this.details[this.detailindex].lineAllCount / 6;
            var appendIndex = this.details[this.detailindex].lineCount;
            var lineNumber = 1 + Math.floor((this.detailindex) / (this.details[this.detailindex].lineCount / 6));
            if (this.details[this.detailindex].lineCount == appendAllIndex * 6) {
                appendIndex = (1 + Math.floor((this.detailindex) / (this.details[this.detailindex].lineCount / 6))) * (this.details[this.detailindex].lineCount / 6) - 1;

            } else if (this.details[this.detailindex].lineCount < appendAllIndex * 6) { //不铺满时的计算
                var detailindexTemp = this.detailindex > 1 ? this.detailindex : 1;
                appendIndex = Math.ceil(detailindexTemp * 1.01 / appendAllIndex) * appendAllIndex - 1;

                //只有一行
                if (Math.ceil(detailindexTemp * 1.01 / appendAllIndex) * appendAllIndex - this.details[this.detailindex].lineCount >= 0) {
                    appendIndex = this.details[this.detailindex].lineCount - 1;
                }
                lineNumber = Math.ceil((detailindexTemp * 1.01 / appendAllIndex));
            } else {
                appendIndex = this.details[this.detailindex].lineCount - 1;
                lineNumber = 1;
            }
            if (this.details[this.detailindex].imageType == "主题库视频" && this.detailindex < appendAllIndex - 1 && this.details[this.detailindex].lineCount>=appendAllIndex) {
                appendIndex = appendIndex - 1;
            }
            // 主题库如果是首行第一个则显示下一行
            if (this.details[this.detailindex].imageType == "主题库视频" && this.detailindex % (appendAllIndex - 1) == 0 && this.detailindex!==0) {
                appendIndex = this.details[this.detailindex].lineCount - 1;
            }
            var targetDom = $(".details-content-item")[appendIndex];
            $($(".details-content-item")[this.detailindex]).find(".detailContent").addClass("bg-c33");
            $($(".details-content-item")[this.detailindex]).find(".detailMain").addClass("fc-cff");

            $(targetDom).after($(".details-main"));
            var filterPanelHight = 0;
            if (this.detailtype == 'car') {
                filterPanelHight = 480;
            } else if (this.detailtype == 'face') {
                filterPanelHight = 460;
            } else if (this.detailtype == 'body') {
                filterPanelHight = 370;
            } else if (this.detailtype == 'upload') {
                filterPanelHight = 326;
            }

            //当为资源为视频时，隐藏图片，显示ocx视频控件
            if (this.details[this.detailindex].resourceType == '1') {
                $("#videoImgBg").css("background-image", "url(" + this.details[this.detailindex].imageUrl + ")").fadeIn();
                $("#videoShowBox").css("display", "block");
                $("#imgShowBox").css("display", "none");
            } else {
                //当不为视频资源时，显示图片
                $("#videoShowBox").css("display", "none");
                $("#imgShowBox").css("display", "block");
                $("#videoImgBg").hide();
            }
            clearPalyerInfo(0); //当视频播放时切换显示资源,用以清空视频播放信息
            $(".baselib-Container").scrollTop(this.pageheight);
        },
        closeDialog: function() {
            window.isShowDialogBool = false;
            // this.isshow = false;
            clearPalyerInfo(0);
            this.$emit("close-dialog",true);
            $(".details-content-item .detailMain").removeClass("fc-cff");

            $("#ocxBox").html(""); //清空掉ocx控件，防止上传出错
        },
        upClick: function() {
            if (this.detailindex >= 1) {
                this.detailindex--;
            } else {
                notify.success("已是第一条");
            }
            var tempH = $($(".details-content-item")[this.detailindex]).offset().top;
            if (this.isshow) {
                if ($(".details-main").offset().top < tempH) {
                    this.pageheight = tempH - 60 + $(".baselib-Container").scrollTop() - 550;
                } else {
                    this.pageheight = tempH - 60 + $(".baselib-Container").scrollTop()
                }
            }
        },
        downClick: function() {
            if ((this.detailindex + 1) < this.details[this.detailindex].lineCount) {
                this.detailindex++;
            } else {
                notify.success("已是最后一条");
            }
            var tempH = $($(".details-content-item")[this.detailindex]).offset().top;
            if (this.isshow) {
                if ($(".details-main").offset().top < tempH) {
                    this.pageheight = tempH - 60 + $(".baselib-Container").scrollTop() - 550;
                } else {
                    this.pageheight = tempH - 60 + $(".baselib-Container").scrollTop()
                }
            }
        },
        playVideo: function() {
            var isCanPlay = new Check().checkPlayerForDown();
            if (isCanPlay) {
                clearPalyerInfo(0); //当视频播放时切换显示资源,用以清空视频播放信息
                playCloseInterval(); //启动监听

                //播放视频按钮 调用ocx播放视频
                var playOCX = document.getElementById("PlAY_OCX");
                var pfsIp = window.pfsIp; //pfs文件服务 IP
                var pfsPort = window.pfsPort; //pfs文件服务 端口
                var pfsUsername = window.pfsUsername; //pfs文件服务 用户名
                var pfsPassword = window.pfsPassword; //pfs文件服务 密码
                var pfsStorageRootDir = window.pfsStorageRootDir; //pfs文件服务 根目录

                $(playOCX).css("width", "100%");
                $(playOCX).css("height", "450px");

                //进度条滑块
                $("#v_playbar").slider({
                    slide: function(event, ui) {
                        setPlayTime(ui.value);
                    }
                });

                //播放路径不包含PFS信息，仅为文件路径
                var tempPath = this.details[this.detailindex].resourcePath;
                tempPath = tempPath.substring(tempPath.indexOf(":") + 1, tempPath.length);
                var videoPath = '{"type":3,"filename":"NPFS:' + pfsIp + ':' + pfsPort + '/username=' + pfsUsername + '&password=' + pfsPassword + '#' + tempPath + '","displayMode":0}';
                console.log("videoPath:" + videoPath);
                var playMsg = playOCX.PlayEx2(videoPath, 0, function playCallBack(index, result, userParam) {
                    console.log("playCallBack:" + result);
                    //播放动作完成后回调
                    //index为播放成功的窗口索引
                    //result为播放完成的结果， 0 表示成功，其他值表示失败，请参考错误返回类型， 如果失败，则不会触发
                    //userParam  与PlayEx2()中用户传入的userPlayParam值保持一致
                    if (result != "0") {
                        clearPalyerInfo(1); //当视频播放时切换显示资源,用以清空视频播放信息
                        $("#v_playInfoTxt").html("播放失败，错误码：" + result);
                        notify.warn("播放失败，错误码：" + result);
                    } else {
                        //显示播放暂停按钮，播放暂停调用ocx的TogglePlay方法
                        $("#v_playBtn").hide(); //隐藏播放按钮
                        $("#v_playOrPauseBtn").show(); //显示播放暂停按钮
                        $("#videoImgBg").fadeOut(); //关闭预览图
                        $("#v_playbar").slider(); //进度条滑块
                    }
                }, 0, function displayFirstFrameCallBack(index, result, userParam) {
                    console.log("displayFirstFrameCallBack:" + result);
                    //播放完成并真正显示出一帧画面时回调
                    //index 为播放成功的窗口索引
                    // result 0：为得到第一帧解码数据回调，//index为播放窗口索引
                    // result 0：为得到第一帧解码数据回调，-1：为10秒钟未得到解码数据回调， // userParam  用户参数，与PlayEx2()中用户传入的userDisplayFirstFrameParam值保持一致
                    if (result != "0") {
                        clearPalyerInfo(1); //当视频播放时切换显示资源,用以清空视频播放信息
                        $("#v_playInfoTxt").html("播放失败，错误码：" + result);
                        notify.warn("播放失败，错误码：" + result);
                    } else {
                        getPlayInfo(index, playOCX); //计时器开始,获取视频播放信息
                    }

                }, 0, function RecordEndCallBack(index, result, userParam) {
                    //index 为播放成功的窗口索引 result 0为录像结束 userParam  用户参数，与PlayEx2()中用户传入的lRecordEndParam值保持一致
                    //停止播放后,视频显示信息归位,不循环播放
                    //PVG能回调,PFS进不来
                    console.log("----------结束了----------");
                }, 0);

                console.log("playResult:" + playMsg);
                if (playMsg != "0") {
                    clearPalyerInfo(1); //当视频播放时切换显示资源,用以清空视频播放信息
                    $("#v_playInfoTxt").html("播放失败，错误码：" + playMsg);
                    notify.warn("播放失败，错误码：" + playMsg);
                }
            }



        },
        playOrPauseVideo: function() {
            //播放、暂停按钮点击事件
            //v_playOrPauseBtn v_playBtn
            var playOCX = document.getElementById("PlAY_OCX");
            var toggleMsg = playOCX.TogglePlay(0);
            //设置播放暂停按钮样式
            if ($("#v_playOrPauseBtn").hasClass("v_PauseIcon")) {
                $("#v_playOrPauseBtn").removeClass("v_PauseIcon").addClass("v_playIcon");
                //$("#v_playOrPauseBtn").html("播放");
                //计时器停止计时
                if (typeof(v_playInterval) != "undefined") {
                    clearInterval(v_playInterval);
                }
            } else if ($("#v_playOrPauseBtn").hasClass("v_playIcon")) {
                $("#v_playOrPauseBtn").removeClass("v_playIcon").addClass("v_PauseIcon");
                //$("#v_playOrPauseBtn").html("暂停");
                getPlayInfo(0, playOCX);
            }
        },
        playSpeedLeft: function() {
            //减速播放
            var playOCX = document.getElementById("PlAY_OCX");
            var nowSpeed = playOCX.GetPlayMode(0); //获取当前速度
            if ("ERROR" != nowSpeed) {
                if (nowSpeed != "1/8") {
                    var msg = playOCX.SetPlayMode(0, -1, 0);
                    nowSpeed = playOCX.GetPlayMode(0);
                    if (nowSpeed == "1") {
                        $("#v_playInfoTxt").html("");
                    } else {
                        $("#v_playInfoTxt").html("倍速：" + playOCX.GetPlayMode(0) + "x");
                    }
                } else {
                    $("#v_playInfoTxt").html("倍速：" + playOCX.GetPlayMode(0) + "x&nbsp;&nbsp;&nbsp;&nbsp;已到最小倍速");
                }
                //点击倍速会激活播放，需开启计时器
                $("#v_playOrPauseBtn").removeClass("v_playIcon").addClass("v_PauseIcon");
                getPlayInfo(0, playOCX);
            } else {
                $("#v_playInfoTxt").html("视频还未播放！");
            }

        },
        playSpeedRight: function() {
            //加速播放
            var playOCX = document.getElementById("PlAY_OCX");
            var nowSpeed = parseInt(playOCX.GetPlayMode(0)); //获取当前速度
            if (!isNaN(nowSpeed)) {
                if (nowSpeed < 8) { //最大八倍速率播放
                    var msg = playOCX.SetPlayMode(0, 1, 0);
                    nowSpeed = playOCX.GetPlayMode(0);
                    if (nowSpeed == "1") {
                        $("#v_playInfoTxt").html("");
                    } else {
                        $("#v_playInfoTxt").html("倍速：" + playOCX.GetPlayMode(0) + "x");
                    }
                } else {
                    $("#v_playInfoTxt").html("倍速：" + playOCX.GetPlayMode(0) + "x&nbsp;&nbsp;&nbsp;&nbsp;已到最大倍速");
                }
                //点击倍速会激活播放，需开启计时器
                $("#v_playOrPauseBtn").removeClass("v_playIcon").addClass("v_PauseIcon");
                getPlayInfo(0, playOCX);
            } else {
                $("#v_playInfoTxt").html("视频还未播放！");
            }
        },
        //全屏播放
        playFullWindow: function() {
            var playOCX = document.getElementById("PlAY_OCX");
            var nowSpeed = parseInt(playOCX.GetPlayMode(0)); //获取当前速度
            if (!isNaN(nowSpeed)) {
                playOCX.SetControlFullScreen();
            } else {
                $("#v_playInfoTxt").html("视频还未播放！");
            }
        }
    }
}

//设定从哪一时间开始播放，传入当前需要播放的进度条值
function setPlayTime(Time) {
    var playOCX = document.getElementById("PlAY_OCX");
    //获取视频总长
    var vInfo = playOCX.GetVideoAttribute(0);
    vInfo = jQuery.parseJSON(vInfo);

    //设定当前需要播放的时间点
    var setTime = parseFloat(vInfo.duration) * (parseFloat(Time) / 100);
    var setTimeRp = playOCX.SetPlayMode(2, setTime, 0);
}

//计时器定时获取视频播放信息
function getPlayInfo(index, playOCX) {
    if (typeof(v_playInterval) != "undefined") {
        clearInterval(v_playInterval); //结束计时器   
    }
    var vInfo = playOCX.GetVideoAttribute(index);
    vInfo = jQuery.parseJSON(vInfo);
    $("#v_t_total").html(MillisecondToDate(vInfo.duration)); //设置总时长

    v_playInterval = setInterval(function() {
        var curTime = playOCX.GetPlayTime(0); //当前播放时间毫秒数
        $("#v_t_cur").html(MillisecondToDate(curTime)); //设置当前播放时间
        $("#v_curbar").css("width", curTime / vInfo.duration * 100 + "%"); //设置当前播放进度条
        $("#v_playbar span").css("left", curTime / vInfo.duration * 100 + "%"); //设置拖拽滑块位置
        $("#v_playbar span").css("background", "#830000"); //设置拖拽滑块css
        $("#v_playbar span").css("border", "none"); //设置拖拽滑块css
        //当全局设置关闭detail时，关闭详情显示
        if (window.videoImgDetail == false) {
            page_this.closeDialog();
        }
    }, 100);
}

//监听全局变量变化时，关闭detail窗口
function playCloseInterval() {
    v_playCloseInterval = setInterval(function() {
        //当全局设置关闭detail时，关闭详情显示
        if (window.videoImgDetail == false) {
            page_this.closeDialog();
        }
    }, 100);
}

//初始化视频播放信息,用以清空界面播放显示信息
function clearPalyerInfo(error) {
    $("#videoImg").show(); //
    $("#v_t_total").html("00:00");
    $("#v_t_cur").html("00:00");
    $("#v_curbar").css("width", "0%");
    $("#v_info").html("点击播放按钮播放视频"); //设置到页面上显示
    $("#v_playBtn").show(); //显示播放按钮
    $("#v_playOrPauseBtn").hide(); //隐藏播放暂停按钮
    $("#v_playOrPauseBtn").removeClass("v_playIcon").addClass("v_PauseIcon");
    $("#v_playInfoTxt").html("");
    $("#v_playbar span").css("left", "0%"); //设置拖拽滑块位置

    if (typeof(v_playInterval) != "undefined") {
        clearInterval(v_playInterval); //结束计时器   
    }
    if (typeof(playCloseInterval) != "undefined") {
        clearInterval(playCloseInterval); //结束监听
    }
    //因视频播放产生错误处理
    if (error == "1") {
        $("#videoImgBg").show();
    }
    var playOCX = document.getElementById("PlAY_OCX");
    try {
        var stopPaly = playOCX.StopEx(false, 0, function stopCallBack(index, result, userParam) {}, 1);
    } catch (e) {
        //console.log("为统一处理停止播放问题,捕获当ocx未渲染完成时调用方法失败问题");
    }

    //初始化ocx
    if (document.getElementById("ocxBox")) {
        var ocx = document.getElementById("ocxBox");
        var ocxHtml = '<object id="PlAY_OCX" class="UIOCX" type="applicatin/x-firebreath" style="witdh:1px; height:1px;"><param name="onload" value="pluginLoaded"/></object>';
        ocx.innerHTML = ocxHtml;
    }
    window.videoImgDetail = true; //重新设置全局变量为true，重置变量为初始值

}

//转换时间
function MillisecondToDate(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
                parseInt(time / 60.0)) * 60) + "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "时" + parseInt((parseFloat(time / 3600.0) -
                    parseInt(time / 3600.0)) * 60) + "分" +
                parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                    parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        } else {
            time = parseInt(time) + "秒";
        }
    }
    return time;
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**
   * 弹出层
   */

.imageTools {
    width: 50px;
    height: 500px;
    display: inline-block;
    position: absolute;
    margin-left: -60px;
}

.toolsContent {
    margin-bottom: 30px;
    text-align: center;
}

.toolLink {
    display: block;
}

.toolTips {
    position: absolute;
    display: block;
    color: #666666;
    width: 100%;
}

.irc_pc {
    border-bottom: 10px solid #222;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    position: absolute;
    /*top: -10px;*/
    width: 0;
}

.details-main {
    background: rgb(34, 34, 34);
    width: 100%;
    height: 550px;
    position: relative;
    left: 0;
    z-index: 1;
    display: none;
}


/*  .detail-dialog{
    position: relative;
    top:230px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .detail-dialog:after {
    content: "";
    left: 0px;
    top: 0px;
    position: relative;
    height: 100%;
    width: 100%;
  }*/


/*.dialog-title-box {
    position: relative;
    height: 30px;
    background: rgb(34,34,34);
    color: #fff;
    text-align: left;
    padding-left: 30px;
    font-size: 14px;
    line-height: 30px;
  }*/

.details-content {
    width: 100%;
}

.details-main .detail-btn-close {
    background: url("./images/details-btn-close.png");
    width: 42px;
    height: 42px;
    background-position: 0px 0px;
    position: absolute;
    display: inline-block;
    right: 0px;
    z-index: 2;
    text-align: center;
}

.details-main .detail-btn-close:hover {
    background: url("./images/details-btn-close-hover.png");
}

.details-content .left-pre {
    float: left;
    width: 5%;
}

.left-pre-imge {
    margin-top: 184px;
}

.details-content .left-content {
    width: 55%;
    float: left;
    padding: 20px;
}

.details-content .right-content {
    float: left;
    width: 30%;
    height: 520px;
    padding-top: 30px;
}

.details-content .right-pre {
    /*float: left;*/
    width: 41px;
    position: absolute;
    right: 0px;
    z-index: 1;
}

.right-pre-imge {
    margin-top: 184px;
    float: right;
}

.detailsImg {
    height: 500px;
    width: 55%;
    /*min-width: 150px;*/
    /*min-height: 150px;;*/
    text-align: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    display: inline-block;
    position: absolute;
}

.lc-container {
    margin-left: 20px;
}

.lc-container .top-title {
    height: 20px;
    line-height: 20px;
    margin-bottom: 20px;
}

.lc-container .bottom-container {
    padding-top: 10px;
    text-align: left;
}

.lc-container .top-title p {
    font-size: 16px;
    color: #edeef0;
    word-break: break-all;
}

.lc-container .bottom-container p {
    font-size: 12px;
    margin: 5px 0 0 0;
    color: #edeef0;
    word-break: break-all;
}

.lc-container .bottom-container span {
    font-size: 12px;
    color: #666666;
}

.imageTools .searchImg {
    display: inline-block;
    width: 31px;
    height: 31px;
    background-image: url('./images/search-icon.png');
    background-repeat: no-repeat;
}

.imageTools .searchImg:hover {
    background-image: url('./images/search-hover-icon.png');
}

.imageTools .downloadImg {
    display: inline-block;
    width: 31px;
    height: 31px;
    background-image: url('./images/download-large-icon.png');
    background-repeat: no-repeat;
}

.imageTools .downloadImg:hover {
    background-image: url('./images/download-large-icon-hover.png');
}

.vertical-bar {
    /*background-image: url('./images/icons/vertical-bar.png');*/
    float: left;
    height: 500px;
    border-left: 1px solid #121212;
    border-right: 1px solid #343434;
    margin-top: 2%;
    margin-left: 2%;
}

.cross-Line {
    border-top: 1px solid #121212;
    border-bottom: 1px solid #343434;
}

/* 视频播放器相关css */

#videoShowBox {
    width: 100%;
    min-height: 450px;
    float: left;
    position: relative;
    overflow: hidden;
}

#PlAY_OCX {
    width: 100%;
    height: auto;
    min-height: 450px;
}

.videoImg {
    width: 100%;
    height: 450px;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #000;
    border: none;
    overflow-x: hidden;
    overflow-y: hidden;
    background-size: auto 400px;
    background-position: center;
    background-repeat: no-repeat;
}

.ocxBox {
    width: 100%;
    height: 450px;
    float: left;
}

.videoTool {
    width: 100%;
    float: left;
    height: 60px;
    background: #111;
    margin-top: -5px;
}

.videoTool .v_playbar {
    width: 98%;
    height: 5px;
    background: #999;
    float: left;
    margin-top: 9px;
    margin-left: 5px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.videoTool .v_playbar .v_curbar {
    width: 0%;
    height: 5px;
    position: absolute;
    left: 0px;
    top: 0px;
    background: #B60000;
}

.videoTool .v_playInfo {
    width: 98%;
    height: 20px;
    float: left;
    margin-top: 3px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
}

.videoTool .v_playInfo .v_btnBox {
    float: left;
}

.videoTool .v_playInfo .v_btnBox #v_playInfoTxt {
    float: left;
    line-height: 43px;
    margin-left: 10px;
    font-size: 11px;
    color: #999;
}

.videoTool .v_playInfo .v_btnBox .v_playBtn {
    display: block;
    width: 36px;
    height: 36px;
    float: left;
    margin: 5px;
    margin-top: 2px;
    background-image: url("./images/playBtnIcon.png");
    background-position: 0px -75px;
}


/* background-position:0px -75px; */

.videoTool .v_playInfo .v_btnBox .v_playBtn:hover {
    background-position: -40px -75px;
}

.videoTool .v_playInfo .v_btnBox .v_playOrPauseBtn {
    display: block;
    width: 36px;
    height: 36px;
    float: left;
    margin: 5px;
    margin-top: 2px;
    display: none;
    background-image: url("./images/playBtnIcon.png");
}

.videoTool .v_playInfo .v_btnBox .v_playIcon {
    background-position: 0px -75px;
}

.videoTool .v_playInfo .v_btnBox .v_playIcon:hover {
    background-position: -40px -75px;
}

.videoTool .v_playInfo .v_btnBox .v_PauseIcon {
    background-position: 0px -36px;
}

.videoTool .v_playInfo .v_btnBox .v_PauseIcon:hover {
    background-position: -40px -36px;
}

.videoTool .v_playInfo .v_btnBox .v_playSeepdBtn {
    display: block;
    width: 28px;
    height: 28px;
    float: left;
    margin: 5px;
    background-image: url("./images/playBtnIcon.png");
    margin-top: 6px;
}

.videoTool .v_playInfo .v_btnBox .v_playSeepdLeftBtn {
    background-position: -0px -0px;
}

.videoTool .v_playInfo .v_btnBox .v_playSeepdLeftBtn:hover {
    background-position: -30px -0px;
}

.videoTool .v_playInfo .v_btnBox .v_playSeepdRightBtn {
    background-position: -80px -0px;
}

.videoTool .v_playInfo .v_btnBox .v_playSeepdRightBtn:hover {
    background-position: -110px -0px;
}

.videoTool .v_playInfo .v_time {
    float: left;
    line-height: 43px;
    color: #999;
    font-size: 11px;
    margin-left: 15px;
}

.videoTool .v_playInfo .v_time em {
    font-style: normal;
    margin: 0px 5px;
}

.videoTool .v_playInfo .v_fullBtn {
    display: block;
    height: 30px;
    float: right;
    margin-top: 5px;
    line-height: 32px;
    color: #fff;
    padding: 0px 7px;
    padding-right: 43px;
    background-image: url("./images/playFullIcon.png");
    background-position: right;
    background-size: 30px 30px;
    background-repeat: no-repeat;
}
</style>
