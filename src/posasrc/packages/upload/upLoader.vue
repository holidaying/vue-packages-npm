<!-- 使用方法 -->
<!-- <up-loader data-id="icon-load" data-type="jpeg,png" v-model="getUploaderData" data-class="uploader-btn"> -->
<!-- <span slot="textWord" class="textWord">选择</span> -->
<!-- </up-loader> -->
<template>
    <label :for="dataId" :style="dataStyle" class="upLoaderFile" :class="dataClass">
        <input type="file" class="dishidden fileSelectUpButton" name="file" :id="dataId" multiple>
        <slot name="textWord" class="textWord">上传</slot>
    </label>
</template>
<script>
var server_uploader_ulr = "";
var widget = require('./uploadFile/js/jquery.ui.widget.js'); //上传图片
var fileUpLoader = require('./uploadFile/js/jquery.fileupload.js'); //上传图片
export default {
    name: "posaUploader",
    props: {
        //不用管，父组件v-model传递值
        value: {
            type: '',
            default: ''
        },
        //需要给一个jquery取dom的id
        dataId: {
            type: String,
            default: 'fileImage'
        },
        //上传文件的类型
        dataType: {
            type: String,
            default: 'jpg,jpeg'
        },
        //组件的文件的style
        dataStyle: {
            type: String,
            default: ''
        },
        //组件的文件的class
        dataClass: {
            type: String,
            default: ''
        },
        autoUpload: {
            type: false,
            default: ''
        },
        progressAll: {
            type: false,
            default: ''
        },
        actionUrl:
        {
            type: String,
            default: ''
        },
    },
    data: function() {
        return {
            fileObject: {
                name: '',
                sourceData: ''
            },
            dataTemp: {},
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        // 绑定事件
        upLoaderEventHander: function() {
            var self = this;
            // //图片上传
            $("body").find('#' + this.dataId).fileupload({
                url: self.actionUrl,
                dataType: 'json',
                add: function(e, data) {
                    var message = "只允许上传"
                        //解决IE9下获取data.originalFiles失效，导致校验失败问题
                    var arrName = data.originalFiles[0].name.split(".");
                    var fileTypeStrTxt = arrName[arrName.length - 1];
                    self.dataTemp = data;
                    self.fileObject.name = arrName;
                    fileTypeStrTxt = fileTypeStrTxt.toLowerCase(); //无论大小写均转小写字母
                    if (self.dataType.indexOf(fileTypeStrTxt) < 0) {
                        self.$notify.warning(message + self.dataType + '格式的文件');
                        return;
                    };
                    self.$emit('on-selected', data.originalFiles[0],data.fileInput[0].value);
                    if (self.autoUpload == false) {
                        data.submit();
                    }
                },
                progressall: function(e, data) {

                },
                done: function(e, data) {
                    self.fileObject.sourceData = data.result; //fileObject
                    self.$emit('input', JSON.stringify(self.fileObject)) //把fileImage给父组件v-model
                }
            });
        },
        upLoaderSubmit: function() {
            var self = this;
            self.dataTemp.submit();
        },
    },
    mounted: function() {
        this.upLoaderEventHander();
    }
};
</script>
<style lang="less">
.fileSelectUpButton {
    display: inline-block;
    height: 100%;
    width: 100%;
    font-size: 20px;
    margin-top: -2px;
    position: absolute;
}

.upLoaderFile {
    position: relative;
    text-align: center;
    vertical-align: middle;
    line-height: 28px;
    height: 28px;
    width: 70px;
    display: inline-block;
    background-color: #ADCD00;
    border-radius: 5px;
    .textWord {
        color: #fff;
    }
}

.dishidden {
    opacity: 0;
}
</style>
