import Vue from 'vue'
import Router from 'vue-router'
import index from 'src/components/index'
import timePick from 'src/components/timePick'
import cascade from 'src/components/cascade'
import uploader from 'src/components/uploader'
import pagination from 'src/components/pagination'
import dialog from 'src/components/dialog'
import about from 'src/components/about'
import detailsDialog from 'src/components/detailsDialog'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: index,
        children: [{
            path: "/",
            name: "timePick",
            component: timePick
        }, {
            path: "/cascade",
            name: "cascade",
            component: cascade
        }, {
            path: "/uploader",
            name: "uploader",
            component: uploader
        }, {
            path: "/pagination",
            name: "pagination",
            component: pagination
        }, {
            path: "/dialog",
            name: "dialog",
            component: dialog
        }, {
            path: "/detailsDialog",
            name: "detailsDialog",
            component: detailsDialog
        }, {
            path: "/about",
            name: "about",
            component: about
        }, ]
    }]
})
