<template>
    <div class="tmpl">
        <!-- 1.0 左边菜单 -->
        <el-row>
            <el-col :span="4">
                <img id="layout_logo" src="../../statics/imgs/logo.png" alt="">
                <div class="layout menu">
                    <el-menu :default-active="currentId" class="el-menu-vertical-demo">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>购物商城
                            </template>
                            <el-menu-item-group>
                                <router-link to="/admin/goodslist">
                                    <el-menu-item index="1-1">内容管理</el-menu-item>
                                </router-link>
                                <router-link to="/admin/goodscate">
                                    <el-menu-item index="1-2">分类管理</el-menu-item>
                                </router-link>                     
                                <el-menu-item index="1-3">评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-message"></i>订单管理
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1">订单列表</el-menu-item>
                                <el-menu-item index="2-2">分类管理</el-menu-item>
                                <el-menu-item index="2-3">评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="20">
                <el-row>
                    <!--2.0 顶部登录信息条 -->
                    <el-col :span="24">

                        <div class="topbg">
                            <el-row>
                                <!-- 左边图标 -->
                                <el-col :span="1">
                                    <i class="el-icon-menu"></i>
                                </el-col>
                                <!-- 右边登陆导航 -->
                                <el-col :span="23">
                                    欢迎，admin登陆
                                    <el-dropdown>
                                        <span class="el-dropdown-link">
                                            更多菜单
                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>修改密码</el-dropdown-item>
                                            <el-dropdown-item ><span @click="nologin">注销</span></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-col>
                            </el-row>

                        </div>

                    </el-col>
                </el-row>
                <el-row>
                    <!-- 3.0 其他功能的渲染区 -->
                    <el-col :span="24">
                        <router-view></router-view>
                    </el-col>
                </el-row>

            </el-col>

        </el-row>


    </div>
</template>

<script>

    export default {
        data() {
            return {
                currentId:"1-1",
            }
        },
        methods: {
            nologin() {
                console.log(1234);
                var url = "/admin/account/logout";
                this.$ajax.get(url)
                    .then(res => {
                        if (res.data.status == 0) {
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.$router.push({name:"login"})
                        }else{
                            this.$message.error('退出失败')
                        }
                    })
            }
        },
        mounted(){
            this.currentId= localStorage.getItem('currentId');
            console.log(this.currentId);
        }
    }
</script>
<style scoped>
</style>