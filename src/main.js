// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件


// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';


// 商品相关的组件
import goodslist from './components/goods/goodslist.vue';
import goodsadd from './components/goods/goodsadd.vue';
import goodsedit from './components/goods/goodsedit.vue';
import goodscate from './components/goods/goodscate.vue';
//富文本组件
import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor);

// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes: [
        // 默认跳转的路由规则
        { name: 'default', path: '/', redirect: '/admin' },
        // 登录
        { name: 'login', path: '/login', component: login, meta: { nologin: true } },
        // 布局
        {
            name: 'layout', path: '/admin', component: layout,
            children: [
                // 商品列表
                { name: 'goodslist', path: 'goodslist', component: goodslist, mid: "1-1" },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd, mid: "1-1" },
                { name: 'goodsedit', path: 'goodsedit/:goodsid', component: goodsedit, mid: "1-1" },
                { name: 'goodscate', path: 'goodscate', component: goodscate, mid: "1-2" },
            ]
        }
    ]
});

//导入axios
import axios from 'axios';
//设置默认请求域名
axios.defaults.baseURL = 'http://127.0.0.1:8899';
//配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true
//把axios对象绑定到Vue的原型属性$ajsx上，将来直接通过this.$ajax发送请求
Vue.prototype.$ajax = axios;

//在vue-router对象上添加一个全局守卫，在任何组件渲染前需要先执行
router.beforeEach((to, from, next) => {
    //存储mid
    if (to.meta.mid){
        localStorage.setItem('currentId',to.meta.mid);
        console.log(to.meta.mid);
    }
    if (to.meta.nologin) {
        next();
        return;
    }
    
    axios.get("/admin/account/islogin").then(res => {
        if (res.data.code == "nologin") {
            router.push({ name: "login" });
        } else {
            next();
        }
    })
    
})



// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式
import '../statics/theme_rms/index.css';


// 导入自己编写的全局样式
import '../statics/css/site.css';

// 绑定到vue中
Vue.use(elementUI);

// 3.0 实例化vue对象
new Vue({
    el: '#app',
    router,  //绑定路由对象使它生效
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render: create => create(App)
});