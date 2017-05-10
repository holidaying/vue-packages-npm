<template>
    <div class="page-content">
        <!-- <div class="totalNum" v-if="1!=all" :class="{'keepCenter':all==1,'keepLeft':all!=1}">
            <span>总计<i>{{total}}</i>条</span><span>第<i>{{cur}}</i>页</span></div> -->
        <div class="page-bar">
            <ul v-if="1!=all">
                <li><a v-on:click="cut" v-if='cutShow'>&lt;上一页</a></li>
                <li v-for="index in indexs" v-bind:class="{ active: cur == index}"><a v-on:click="btnClick(index)">{{ index }}</a></li>
                <li><a v-on:click="add">下一页&gt;</a></li>
                <!--  <li><a>共<i>{{all}}</i>页</a></li>-->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"posaPagiNation",
    props: {
        cur:{
            type:Number,
            default:1,
        },
        all:{
            type:Number,
            default:5,
        },
        total:{
            type:Number,
            default:5,
        }
    },
    compiled: function() {
        if (this.all == 0 || this.all == 1) {
            this.all = 1;
        }
    },
    data: function() {
        return {
            cutShow: false
        }
    },
    watch: {
        'cur': function(val) {
            if (val >= 2) {
                this.cutShow = true;
            } else {
                this.cutShow = false;
            }
        }
    },
    computed: {
        indexs: function() {
            var left = 1
            var right = this.all
            var ar = []
            if (this.all >= 11) {
                if (this.cur > 5 && this.cur < this.all - 4) {
                    left = this.cur - 5
                    right = this.cur + 4
                } else {
                    if (this.cur <= 5) {
                        left = 1
                        right = 10
                    } else {
                        right = this.all
                        left = this.all - 9
                    }
                }
            }
            while (left <= right) {
                ar.push(left)
                left++
            }
            return ar
        }
    },
    methods: {
        cut: function() {
            if (this.cur != 1) {
                this.cur--
                    $('.baselib-Container').animate({
                        scrollTop: 0
                    }, 500);
                $('.plantform-Container').animate({
                    scrollTop: 0
                }, 500);
            }

        },
        add: function() {
            if (this.cur != this.all) {
                this.cur++
                    $('.baselib-Container').animate({
                        scrollTop: 0
                    }, 500);
                $('.plantform-Container').animate({
                    scrollTop: 0
                }, 500);
            }

        },
        btnClick: function(data) {
            if (data != this.cur) {
                this.cur = data
                this.$dispatch('btn-click', data)
                $('.baselib-Container').animate({
                    scrollTop: 0
                }, 500);
                $('.plantform-Container').animate({
                    scrollTop: 0
                }, 500);
            }
        }
    }
}
</script>
<style scoped>
.keepCenter {
    margin-left: 50%;
}

.keepLeft {
    float: left;
}
@charset "UTF-8";
.page-content{
  width: 100%;
}
.page-bar{
  text-align: center;
  margin:0px auto;
}
.page-bar ul,
.page-bar li{
  margin: 0px;
  padding: 0px;
}
.page-bar li{
  list-style: none;
  display: inline-block;
}
.page-bar li:first-child>a {
  margin-left: 0px
}
.page-bar a{
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 4px 10px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #999999;
  cursor: pointer;
  background-color:#fff;
}
.page-bar a:hover{
  background-color: #eee;
}
.page-bar .active a{
  color: #fff;
  cursor: default;
  background-color: #00A1F2;
  border-color: #00A1F2;
}
.page-bar i{
  font-style:normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
.totalNum {
  margin-right: 158px;
  margin-left: 30%;
  margin-top: 6px;
}
.totalNum span{
  margin-right: 30px;
  color: rgb(153,153,153);
  font-size: 12px;
}
.totalNum span i{
  color: rgb(123,172,251);
}
.pageZone {
   /* position: absolute;
    bottom: 45px;*/
  margin-top: 25px;
    width: 100%;
}

</style>
