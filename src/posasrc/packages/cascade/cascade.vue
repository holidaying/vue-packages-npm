<!-- 省市区三级联动使用方式： 参数：cascadeopt { prov: prov, 可选 city: city, 可选 dist: dist, 可选 detail: detail 可选 } cascadeopt.val是返回的选择结果 { prov: prov, city: city, dist: dist, detail: detail }  -->
<template>
    <div id="cascade">
        <select id="prov" class="prov" name="require">
        </select>
        <select id="city" class="city" disabled="disabled" transition="opacityfadeindown">
        </select>
        <select id="dist" class="dist" disabled="disabled" transition="opacityfadeindown">
        </select>
        <input id="detail" placeholder="详细地址" class="detail detailinput" transition="opacityfadeindown" maxlength="60">
    </div>
</template>
<script>
var citySelect = require('./cascade/jquery.cityselect');
var data = require('./cascade/city.min').data;

function oo() {
    return {
        prov: "",
        city: "",
        dist: "",
        detail: ""
    }
};
module.exports = {
    //父组件数据的属性,
    name: "posaCascade",
    props: {
        value: {
            type: String,
            default: ""
        },
        cascadeopt: {
            type: Object,
            default: oo
        }
    },
    //数据对象
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    compiled: function() {

    },
    watch: {
        'cascadeopt': {
            handler: function(valtemp, oldVal) {
                var self = this;
                var setting = {
                    prov: self.cascadeopt.prov || '',
                    city: self.cascadeopt.city || '',
                    dist: self.cascadeopt.dist || '',
                    detail: self.cascadeopt.detail || '',
                    required: false,
                    url: data,
                    bind: function(val) {
                        // self.cascadeopt = val;
                        self.$emit("input", val)
                    }
                };
                $("#cascade").citySelect(setting);
            },
            deep: true
        }
    },
    mounted: function() {
        var self = this;
        var setting = {
            prov: self.cascadeopt.prov || '',
            city: self.cascadeopt.city || '',
            dist: self.cascadeopt.dist || '',
            detail: self.cascadeopt.detail || '',
            required: false,
            url: data,
            bind: function(val) {
                self.$emit("input", val)
                    // self.cascadeopt = val;

            }
        };
        $("#cascade").citySelect(setting);
    }
}
</script>
<style scoped>
#cascade {
    position: relative;
    margin: 0px 10px;
    width: 500px;
    margin: 0px auto;
}

label {
    margin-right: 2px;
}

select {
    width: 100%;
    height: 22px;
    margin-bottom: 10px;
    margin-left: 2px;
    margin-right: 2px;
    border: solid 1px #ccc;
    text-align: center;
}

#cascade .detailinput {
    width: 100%;
    height: 22px;
    margin-left: 2px;
    margin-right: 2px;
    border: solid 1px #ccc;
    text-align: left;
}
</style>
