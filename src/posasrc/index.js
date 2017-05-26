var dateTime = require('./packages/time-pick/dateTime.vue');
var about = require('./packages/about/about.vue');
var cascade = require('./packages/cascade/cascade.vue');
var notify = require('./packages/notify/notify.js');
var posalogin = require('./packages/login/login.js');
var pagiNation = require('./packages/pagination/pagiNation.vue');
var upLoader = require('./packages/upload/upLoader.vue');
var dialog = require('./packages/dialog/dialog.vue')
var detailsDialog = require('./packages/details-dialog/detailsDialog.vue')
var timeline = require('./packages/timeline/timeline.vue')
var Filter = require('./filter')
const components = [
    dateTime,
    upLoader,
    cascade,
    pagiNation,
    dialog,
    detailsDialog,
    timeline,
    about
];

var install = function(Vue, options) {
    if (install.installed) return;
    components.map(component => {
        Vue.component(component.name, component);
    });
    Filter(Vue);
    notify.initPlugin(Vue, options)
    Vue.prototype.$posalogin = posalogin;
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};
// export default install;
module.exports = {install};
