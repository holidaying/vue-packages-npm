define(function(){
    var initFilter=function(Vue) {
        //单向过滤器
        //年-月-日 时：分：秒
        Vue.filter('dateTimeFormat', function(value) {
            //to do
            if (value == "") {
                return "";
            }
            if (value == undefined) {
                return "";
            }
            var data = new Date(value);
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            value = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + ss;
            return value;
        });
        //年-月-日
        Vue.filter('timeTransformTMD', function(value) {
            if (value == "") {
                return "未知";
            }
            if (value == undefined) {
                return "未知";
            }
            var data = new Date(value);
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            value = year + "/" + month + "/" + day + " ";
            return value;
        });
        //年-月-日 时：分
        Vue.filter('timeTransformTMDHM', function(value) {
            //to do
            if (value == "0") {
                value = "长期有效";
            } else {
                var data = new Date(value);
                var year = data.getFullYear();
                var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
                var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
                var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
                var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
                var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
                value = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
            }
            return value;
        });
        // 时：分 :秒
        Vue.filter('timeTransformHMS', function(value) {
            //to do
            if (value == "0") {
                value = "长期有效";
            } else {
                var data = new Date(value);
                var year = data.getFullYear();
                var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
                var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
                var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
                var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
                var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
                value = year + "/" + month + "/" + day + " ";
            }
            return value;
        });
        // 年.月.日 时:分
        Vue.filter('timeTransformYYYYMMDDhhmm', function(value) {
            //to do
            if (value == "0") {
                value = "长期有效";
            } else {
                var oDate = new Date(value);
                oYear = oDate.getFullYear();
                oMonth = oDate.getMonth() + 1;
                oDay = oDate.getDate();
                oHour = oDate.getHours();
                oMin = oDate.getMinutes();
                value = oYear + "." + oMonth + '.' + oDay + " " + oHour + ":" + oMin; //最后拼接时间  
            }
            return value;
        });


        //pvd时间转换
        Vue.filter('dateTimeFormatForPvd', function(value) {
            //to do
            var timeStr = "未知";
            if (value) {
                timeStr = value.replace("-", "/").replace("-", "/");
            }
            if (null == value) {
                timeStr = value;

            }
            return timeStr;

        });
        //pvd地址过滤
        Vue.filter('carAddressFormat', function(value) {
            //to do
            var addStr = "未知";
            if (value) {
                addStr = value;
            }
            return addStr;
        });

        //双向过滤器
        Vue.filter('currencyDisplay', {
            // model -> view
            // 在更新 `<input>` 元素之前格式化值
            read: function(val) {
                //to do
                return val;
            },
            // view -> model
            // 在写回数据之前格式化值
            write: function(val, oldVal) {
                //to do
                var number = +val.replace(/[^\d.]/g, '')
                return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
            }
        });
        //双向过滤器
        Vue.filter('idCard', {
            // model -> view
            // 在更新 `<input>` 元素之前格式化值
            read: function(val) {
                //to do
                if (val.length >= 15 && (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(val)) {
                    return val
                } else {
                    return ""
                }
            },
            // view -> model
            // 在写回数据之前格式化值
            write: function(val, oldVal) {
                //to do
                var str = val;
                if (val.length >= 15 && (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(val)) {
                    return val
                } else {
                    return ""
                }
            }
        });
        Vue.filter('ifNUll', function(value) {
            //to do

            if (value === null || $.trim(value) === "") {
                return "未知";
            } else {
                return value;
            }

        });
        Vue.filter('ifPassed', function(value) {
            //to do

            if (value === 2) {
                return "已过期";
            } else {
                return "";
            }
        });
        // 年龄
        Vue.filter('ageTrans', function(value) {
            //to do
            if (value == "-1" || value == "" || value == null) {
                return "未知";
            } else {
                return value;
            }
        });
        // 性别
        Vue.filter('sexTrans', function(value) {
            //to do

            if (value == "1") {
                return "男";
            } else if (value == "2") {
                return "女";
            } else {
                return "未知";
            }

        });
        //设备类型
        Vue.filter('serviceType', function(value) {

            var type = Base.GetDictionaryValue("DEVICE_TYPE", value);
            if (!type) {
                type = "未知";
            }
            return type;
        });
        //设备状态
        Vue.filter('serviceStatus', function(value) {

            var status = Base.GetDictionaryValue("DEVICE_STATUS", value);
            if (!status) {
                status = "未知";
            }
            return status;
        });

        //报警规则
        Vue.filter('alarmType', function(value) {
            var alarm;
            //var status=Base.GetDictionaryValue("DEVICE_STATUS",value);
            if (value == "0") {
                alarm = "低阈值报警";
            } else if (value == "1") {
                alarm = "高阈值报警";
            }
            return alarm;
        });
        //基础库 人脸 是否微笑 是否戴眼镜 是否带太阳镜
        Vue.filter('ifAttractive', function(value) {
            var Attractive;
            //var status=Base.GetDictionaryValue("DEVICE_STATUS",value);
            if (value == "0") {
                Attractive = "无";
            } else if (value == "1") {
                Attractive = "有";
            } else {
                Attractive = "未知";
            }
            return Attractive;
        });
        //基础库 人脸 颜值
        Vue.filter('faceScore', function(value) {
            var Attractive;
            //var status=Base.GetDictionaryValue("DEVICE_STATUS",value);
            if (value == "-1") {
                value = "未知";
            }
            return value;
        });
        //服务管理
        Vue.filter('serverStatus', function(value) {
            if (value == "UP") {
                value = "正常";
            } else {
                value = "异常";
            }
            return value;
        });
        //天线类型
        Vue.filter('radioType', function(value) {
            //to do

            if (value == "0") {
                return "2.4G";
            } else if (value == "1") {
                return "5G";
            } else {
                return "未知";
            }
        });
        //是否关联用户
        Vue.filter('ifAssociated', function(value) {
            //to do

            if (value == "0") {
                return "未关联";
            } else if (value == "1") {
                return "关联";
            } else {
                return "未知";
            }
        });
        //以图搜图 比分类型判断
        Vue.filter('filterBaselibResultScoreType', function(score) {
            var num = null;
            if (score) {
                num = parseInt(score);
                if (num == 10000 || num == 100) {
                    return "most";
                } else if (num >= 90) {
                    return "high";
                } else if (num > 40 && num < 90) {
                    return "center";
                } else if (num <= 40) {
                    return "low";
                } else {
                    return null;
                }
            }

        });
        //以图搜图 比分渲染
        Vue.filter('filterBaselibResultScoreNum', function(score) {
            var num = null;
            if (score) {
                num = parseInt(score.toString().substring(0, 4) * 100) + "%";
            }
            return num;
        });
        //以图搜图 比分渲染
        Vue.filter('filterBaselibResultScoreNumForFace', function(score) {
            var num = null;
            if (score) {
                if ("100.0" == score || 100 == score) {
                    num = "100%";
                } else {
                    num = parseInt(score.toString().substring(0, 2) * 1) + "%";
                }

            }
            return num;
        });
        //报警信息 报警类型
        Vue.filter('ifAlarmType', function(value) {
            //to do

            if (value == "2") {
                return "人脸报警";
            } else if (value == "3") {
                return "车辆报警";
            } else if (value == "4") {
                return "人体报警";
            } else {
                return "未知";
            }
        });
        //报警信息 报警级别
        /*  Vue.filter('ifAlarmLevel', function(value) {
              //to do

              if (value == "0") {
                  return "报警级别：严重";
              }
          });*/
        //基础库颜色选择
        Vue.filter('colorTrans', function(value) {
            var colorArray = ["白", "灰", "黄", "粉", "红", "绿", "蓝", "棕", "黑", "紫"]
            if (Number(value) == -1) {
                return "其他"
            } else {
                return colorArray[Number(value)];
            }
        });
        //报警信息 行车速度
        Vue.filter('ifAlarmSpeed', function(value) {
            //to do

            if (value) {
                return value + 'km/h';
            } else {
                return "未知";
            }
        });

        Vue.filter('monitorImageFilter', function(value) {
            if (value == undefined || imageProxy + "undefined" == value || null == value) {
                
            }
            return value

        });
        //imageUrlFilter
        Vue.filter('imageFaceDefaul', function(value) {
            if (value == undefined || imageProxy + "undefined" == value) {
                
            }
            return value

        });
        //imageUrlFilter
        Vue.filter('imageBodyDefaul', function(value) {
            if (value == undefined || imageProxy + "undefined" == value) {
               
            }
            return value
        });
        //imageUrlFilter
        Vue.filter('imageUploadDefaul', function(value) {
            if (value == undefined || imageProxy + "undefined" == value) {
              
            }
            return value
        });
        //imageUrlFilter
        Vue.filter('imageDetailDefaul', function(value) {
            if (value == undefined || imageProxy + "undefined" == value) {
              
            }
            return value
        });
        //车辆信息 汽车品牌
        Vue.filter('ifVehicleBrand', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("VehicleBrand", "VehicleBrand", value);
            } else {
                return "未知";
            }
        });
        //车辆信息, 车辆颜色
        Vue.filter('ifVehiclecolor', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("VehicleColor", "VehicleColor", value);
            } else {
                return "未知";
            }
        });
        //车辆信息, 车辆颜色---PCCtoPVD
        Vue.filter('ifVehiclecolorForMonitor', function(value) {
            //to do

            var PvdColorCode = Base.GetPvdDictionaryValue("VehicleColor-PCCToPVD", "VehicleColor-PCCToPVD", value);
            return Base.GetPvdDictionaryValue("VehicleColor", "VehicleColor", PvdColorCode);

        });
        //车辆信息 
        Vue.filter('ifVehicleNK', function(key) {
            //to do
            if (key == "0") {
                return "未知";
            }
            if ("undefined" == localStorage.dictPvdData || null == localStorage.dictPvdData) {
                return "未知";
            } else {
                var nksData = JSON.parse(localStorage.dictPvdData)
                var nks = nksData.VehicleNK;
                var years = [];
                for (var i = 0, l = nks.length; i < l; i++) {
                    if (key & nks[i].key) {
                        years.push(nks[i].value.replace("YEAR_", ""));
                    }
                }
                return years.join('|');
            }

        });
        //车辆信息 
        Vue.filter('ifVehicleSubBrand', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("VehicleSubBrand", "VehicleSubBrand", value);
            } else {
                return "未知";
            }
        });
        //车辆颜色 
        Vue.filter('ifPlateColor', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("PlateColor", "PlateColor", value);
            } else {
                return "未知";
            }
        });
        //车辆信息 
        Vue.filter('ifPlateType', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("PlateType", "PlateType", value);
            } else {
                return "未知";
            }
        });
        //报警级别 
        Vue.filter('ifAlarmLevel', function(value) {
            //to do
            if (value) {
                return Base.GetPvdDictionaryValue("AlarmLevel", "AlarmLevel", value);
            } else {
                return "未知";
            }
        });
        //报警类别 
        Vue.filter('isalarmType', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("AlarmType", "AlarmType", value);
            } else {
                return "未知";
            }
        });
        //车辆类型
        Vue.filter('ifVehicleType', function(value) {
            //to do

            if (value) {
                return Base.GetPvdDictionaryValue("VehicleType", "VehicleType", value);
            } else {
                return "未知";
            }
        });
        //图片前缀 
        Vue.filter('imgUrlProxyFilter', function(value) {
            //to do

            if (value) {
                return window.imageProxy + value + "&width=90";
            } else {
                return "未知";
            }
        });

        //实时监控摄像机布控筛选--人脸
        Vue.filter('monitorTaskFilterFace', function(mapping) {
            //to do
            var domClass = "icon-face-off";

            if (mapping.running && mapping.face) {
                domClass = ""

            }
            return domClass;
        });
        //实时监控摄像机布控筛选--人体
        Vue.filter('monitorTaskFilterBody', function(mapping) {
            //to do
            var domClass = "icon-body-off";

            if (mapping.running && mapping.body) {
                domClass = ""

            }
            return domClass;
        });

        //实时监控，车辆车牌过滤
        Vue.filter('carNumberFormat', function(carNum) {
            //to do
            var value = "";
            if ('-1' == carNum) {
                value = "未知";
            } else {
                value = carNum;
            }
            return value;
        });
        //实时监控摄像机布控筛选--车辆
        Vue.filter('monitorTaskFilterCar', function(mapping) {
            //to do
            var domClass = "icon-car-off";

            if (mapping.running && mapping.vehicle) {
                domClass = ""

            }
            return domClass;
        });

        //格式化数量为可读形式，如1000 格式后1,000
        Vue.filter('numFormatFilter', function(num) {
            if (!isNaN(num)) {
                var s = num;
                var n = 0;
                if (s) {
                    n = n >= 0 && n <= 20 ? n : 2;
                    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                    var l = s.split(".")[0].split("").reverse();
                    t = "";
                    for (i = 0; i < l.length; i++) {
                        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                    }
                    return t.split("").reverse().join("");
                } else {
                    return 0;
                }
            } else {
                return 0;
            }

        });

        //关系挖掘根据数据分数大小 返回对应的class类
        Vue.filter('filterRelationsDataType', function(score) {
            var num = null;
            if (score) {
                num = score.toString().substring(0, 4) * 100;
                if (num == 10000 || num == 100) {
                    return "red";
                } else if (num >= 90) {
                    return "red";
                } else if (num > 50 && num < 90) {
                    return "yellow";
                } else if (num <= 50) {
                    return "blue";
                } else {
                    return null;
                }
            }
        });

        //民族

        Vue.filter('filterLibNation', function(num) {
            var nationDatas = JSON.parse(window.localStorage.nationData);
            var nationName = '';
            for (var i = 0; i < nationDatas.length; i++) {
                if (num == nationDatas[i].code) {
                    nationName = nationDatas[i].name;
                }
            }
            if (nationName == '') {
                return '未知';
            } else {
                return nationName;
            }

        });

        //用户管理 用户等级
        Vue.filter('ifUserLevel', function(value) {
            //to do

            if (value == "1") {
                return "管理员";
            } else if (value == "2") {
                return "普通用户";
            } else {
                return "未知";
            }
        });
        Vue.filter('libType', function(value) {
            return value == '0' ? "布控人员库" : '静态人员库';
        })
    };
    return initFilter;
});
