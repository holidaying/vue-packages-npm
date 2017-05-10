<template>
    <div class="model-dialog" v-if="response.dialogShow" v-bind:class="{'modelAfter':bounceInUp}">
        <div class="dialog-main" v-bind:class="{'bounceInUp':bounceInUp,'bounceOutDown':bounceOutDown}">
            <p class="dialog-title-box"><span class="dialog-title">{{response.title}}</span>
                <a href="javascript:void(0)" class="fr icon-dialog-close" v-on:click="closeDialog"></a>
            </p>
            <div style="height:100%">
                <slot name="libBox">
                </slot>
                <slot name="realTimeBox">
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
function oo() {
    return {
        dialogShow: true,
        title: "vdt弹框"
    }
}
export default {
    name:"posaDialog",
    props: {
        response: {
            type: Object,
            default: oo
        },
    },
    watch: {
        'response.dialogShow': function(value) {
            if (value) {
                $("body").find(".view").addClass("overflowY");
                // $("body").find(".subjectlib-Container").css("overflow", "hidden");
            } else {
                $("body").find(".view").removeClass("overflowY");
                // $("body").find(".subjectlib-Container").css("overflowY", "auto");
            }
        }
    },
    data: function() {

        return {
            // show:true,
            modelBg: false,
            bounceInUp: true,
            bounceOutDown: false,
        }
    },
    events: {
        'close-dialog' () {
            this.closeDialog();
        }
    },
    methods: {
        /**
         * 关闭弹层
         * @return {[type]} [description]
         */
        closeDialog: function() {
            var self = this;
            this.response.dialogShow = "closeUpVideoPlay"; //先关闭视频回显
            this.$nextTick(function() {
                self.bounceInUp = false;
                self.bounceOutDown = true;
                try {
                    $("body").find(".realTimeOcxBoxVideo").empty()
                } catch (e) {

                }
                setTimeout(() => {
                    self.response.dialogShow = false;
                    self.bounceInUp = true;
                    self.bounceOutDown = false;
                    if (typeof self.response.isVideoPage != "undefined") {
                        console.log("==========is-special-close==========")
                        self.$emit('is-special-close', true);
                    } else {
                        console.log("==============child-close======================")
                        self.$emit('child-close', true);
                    }

                }, 1000)
            });
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.overflowY {
    overflow-y: hidden!important;
    overflow-x: hidden!important;
}


/**
 * 弹出层
 */

@supports not(transform: rotate(45deg) scale(0.8)) or not (-ms-transform: rotate(45deg) scale(0.8)) or not (-webkit-transform: rotate(45deg) scale(0.8)) {
    .model-dialog .icon-dialog-close:hover {
        background-color: #d2d7df;
    }
}

.bounceInUp {
    -webkit-animation: bounceInUp 1s .2s ease both;
    -ms-animation: bounceInUp 1s .2s ease both;
}

@-webkit-keyframes bounceInUp {
    0% {
        opacity: 0;
        -webkit-transform: translateY(2000px)
    }
    60% {
        opacity: 1;
        -webkit-transform: translateY(-30px)
    }
    80% {
        -webkit-transform: translateY(10px)
    }
    100% {
        -webkit-transform: translateY(0)
    }
}

@keyframes bounceInUp {
    0% {
        opacity: 0;
        -webkit-transform: translateY(2000px)
    }
    60% {
        opacity: 1;
        -webkit-transform: translateY(-30px)
    }
    80% {
        -webkit-transform: translateY(10px)
    }
    100% {
        -webkit-transform: translateY(0)
    }
}

@-ms-keyframes bounceInUp {
    0% {
        opacity: 0;
        -ms-transform: translateY(2000px)
    }
    60% {
        opacity: 1;
        -ms-transform: translateY(-30px)
    }
    80% {
        -ms-transform: translateY(10px)
    }
    100% {
        -ms-transform: translateY(0)
    }
}

.icon-dialog-close {
    position: absolute;
    background-repeat: no-repeat;
    background-size: initial;
    background-position: 12px 12px;
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
    transition: all 0.3s ease;
    transform-origin: center center;
    -ms-transform-origin: center center;
    -webkit-transform-origin: center center;
    display: inline-block;
    right: 10px;
}

.model-dialog .icon-dialog-close:hover {
    background-color: #59606a;
    /*transform: rotate(45deg) scale(0.8);
    -ms-transform: rotate(45deg) scale(0.8);
    -webkit-transform: rotate(45deg) scale(0.8);*/
}

.model-dialog .icon-dialog-close:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -4.5px;
    margin-left: -4.5px;
    height: 9px;
    width: 9px;
    background-image: url("./images/icon-close-small-white.png");
    background-repeat: no-repeat;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.model-dialog .icon-dialog-close:hover:after {
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;
    -ms-transition-duration: 0.25s;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
}

.model-dialog .icon-dialog-close:hover:after {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
}

.model-dialog {
    top: 0px;
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 90;
}

.model-dialog:after {
    content: "";
    left: 0px;
    top: 0px;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 100;
    background: rgba(34, 34, 34, 0);
    transition: all 1s ease-out;
    -moz-transition: all 1s ease-out;
    /* Firefox 4 */
    -webkit-transition: all 1s ease-out;
    /* Safari 和 Chrome */
    -o-transition: all 1s ease-out;
    /* Opera */
}

.model-dialog-tree {
    top: 0px;
    position: fixed;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 90;
}

.model-dialog-tree:after {
    content: "";
    left: 0px;
    top: 0px;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 100;
    background: rgba(34, 34, 34, 0);
    transition: all 1s ease-out;
    -moz-transition: all 1s ease-out;
    /* Firefox 4 */
    -webkit-transition: all 1s ease-out;
    /* Safari 和 Chrome */
    -o-transition: all 1s ease-out;
    /* Opera */
}

.modelAfter:after {
    background: rgba(48, 56, 69, 0.3);
}

.dialog-main {
    position: absolute;
    height: 90%;
    width: 100%;
    bottom: 0px;
    left: 0px;
    background: #fff;
    z-index: 999;
    overflow: hidden;
}

.dialog-title-box {
    position: relative;
    height: 30px;
    background: #303845;
    color: #fff;
    text-align: left;
    padding-left: 30px;
    font-size: 14px;
    margin: 0px;
    line-height: 30px;
}

.dialog-title {
    position: relative;
}

.bounceOutDown {
    -webkit-animation: bounceOutDown 1s .2s ease both;
    -ms-animation: bounceOutDown 1s .2s ease both;
}

@-webkit-keyframes bounceOutDown {
    0% {
        -webkit-transform: translateY(0)
    }
    20% {
        opacity: 1;
        -webkit-transform: translateY(-20px)
    }
    100% {
        opacity: 0;
        -webkit-transform: translateY(2000px)
    }
}

@-ms-keyframes bounceOutDown {
    0% {
        -ms-transform: translateY(0)
    }
    20% {
        opacity: 1;
        -ms-transform: translateY(-20px)
    }
    100% {
        opacity: 0;
        -ms-transform: translateY(2000px)
    }
}
</style>
