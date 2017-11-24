<template>
    <div id="logintmpl" class="tmpl">
        <ul>
            <li>
                账号：
                <input type="text" class="uname" v-model="user.uname">

            </li>
            <li>
                密码：
                <input type="password" class="upwd" v-model="user.upwd">
            </li>
            <li>
                <el-button @click="login">登陆</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    uname: 'admin',
                    upwd: '123456'
                }

            }
        },
        methods: {
            login() {
                var url = "/admin/account/login";
                this.$ajax.post(url, this.user)
                    .then(res => {
                        // console.log(this.user);
                        // console.log(res);
                        if (res.data.status==1) {
                            this.$message({
                                showClose: true,
                                message: '登陆失败',
                                type: 'error'
                            })
                            return;
                        } else {
                            this.$router.push({ name: 'goodslist' })
                        }
                    })
            }
        }
    }
</script>
<style scoped>
</style>