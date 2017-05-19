<template>
    <div>
        <div class="hello">
            <div id="header">
                <a id="logo" href="/">
                    <span>{{ msg }}</span>
                </a>
            </div>
        </div>
        <div id="main">
            <div class="sidebar">
                <ul class="menu-root">
                    <li>
                        <router-link to="/">时间组件(posa-date-picker)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">时间组件(posa-date-picker)</a> -->
                    </li>
                    <li>
                        <router-link to="/uploader">上传组件(posa-uploader)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">上传组件(posa-uploader)</a> -->
                    </li>
                    <li>
                        <router-link to="/cascade">三级联动(posa-cascade)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">三级联动(posa-cascade)</a> -->
                    </li>
                    <li>
                        <router-link to="/pagination">分页组件(posa-pagi-nation)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">分页组件(posa-pagi-nation)</a> -->
                    </li>
                    <li>
                        <router-link to="/dialog">dialog组件(posa-dialog)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">详情组件</a> -->
                    </li>
                    <li>
                        <router-link to="/detailsDialog">dialogDetail组件(posa-dialog-detail)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">详情组件</a> -->
                    </li>
                    <li>
                        <router-link to="/login">login组件(posa-login)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">详情组件</a> -->
                    </li>
                     <li>
                        <router-link to="/jian">测试组件(简历测试)</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">详情组件</a> -->
                    </li>
                    <li>
                        <router-link to="/about">About</router-link>
                        <!-- <a href="/v2/guide/installation.html" class="sidebar-link">详情组件</a> -->
                    </li>
                </ul>
            </div>
            <div class="content">
                <h1 style="text-align:left">{{ msg }}</h1>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data: function() {
        return {
            msg: '前端开发组件',
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
<style>
#header {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
    transition: background-color 0.3s ease-in-out;
    padding: 10px 60px;
    z-index: 2;
    text-align: left;
}

#main {
    z-index: 1;
    padding: 0 60px 30px;
    overflow-x: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

.sidebar ul li {
    list-style-type: none;
    margin: 0;
    line-height: 1.8em;
    padding-left: 1em;
    text-align: left;
}

.menu-root li {
    display: block;
}

a {
    text-decoration: none;
    color: #34495e;
}

.sidebar li a:hover {
    border-bottom: 2px solid #42b983;
}

.sidebar li a:active {
    border-bottom: 2px solid #42b983;
}

.sidebar .sidebar-link {
    color: #7f8c8d;
}

.sidebar {
    position: absolute;
    z-index: 10;
    top: 43px;
    left: 0;
    bottom: 0;
    /* padding: 40px 0 30px 60px; */
    width: 260px;
    margin-right: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    border-right: 1px solid #ccc;
    box-shadow: 0px 0px 0px 5px rgba(34, 34, 34, 0.03);
}

.content {
    position: relative;
    padding: 2.2em 0;
    max-width: 800px;
    margin: 0 auto;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
