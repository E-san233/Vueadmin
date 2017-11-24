<template>
    <div class="tmpl">
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-row>
                        <el-col :span="6">
                            <el-button size="small" @click="selectedAll(list)">
                                <i class="el-icon-check"></i> {{seletxt}}</span></el-button>

                            <router-link to="/admin/goodsadd">
                                <el-button size="small">
                                    <i class="el-icon-plus"></i> 新增</el-button>
                            </router-link>
                            <el-button size="small" @click="delData">
                                <i class="el-icon-delete"></i> 删除</el-button>
                        </el-col>
                        <!-- 搜索框 -->
                        <el-col :offset="14" :span="4">
                            <el-input @keyup.enter.native="getlist" placeholder="请输入搜索内容" icon="search" v-model="searchValue" :on-icon-click="getlist"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
            <el-col :span="24">
                <el-table ref="multipleTable" :data="list" @select="selected" @select-all="selectedAll" border tooltip-effect="dark" style="width: 100%">
                    <!-- 勾选框 -->
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="标题">
                        <template scope="scope">
                            <el-tooltip class="item" effect="dark" placement="right-start">
                                <div slot='content'>
                                    <img :src="scope.row.imgurl" height="150" width="150" alt="">
                                </div>
                                <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">{{scope.row.title}}</router-link>
                            </el-tooltip>
                        </template>
                    </el-table-column>


                    <el-table-column prop="categoryname" label="所属类别" width="100">
                    </el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" width="100">
                    </el-table-column>
                    <el-table-column prop="market_price" label="市场价" width="100">
                    </el-table-column>
                    <el-table-column prop="sell_price" label="销售价" width="100">
                    </el-table-column>
                    <el-table-column label="属性" width="120">
                        <template scope="scope">
                            <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlight')}"></i>
                            <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlight')}"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 分页 -->
        <el-row>
            <el-col :span="24">
                <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChang" :current-page="pageIndex" :page-sizes="[5, 10, 20, 30]"
                    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                seletxt:"全选",
                isSelectAll: false,
                delist: [],
                // 默认页索引
                pageIndex: 1,
                // 默认页容量
                pageSize: 5,
                // api返回的数据总行数
                totalCount: 0,
                searchValue: '',
                list: [],//存放商品数据数组


            }
        },
        methods: {
            delData() {
                console.log(this.delist);
                if (this.delist.length <= 0) {
                    this.$message.error("请选择输入一条数据")
                    return;
                }
                var ids = this.delist.join(',')
                var url = "/admin/goods/del/" + ids;
                this.$ajax.get(url)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'error'
                            })
                        } else {
                            this.getlist()
                        }
                    })

            },

            //全选方法
            selectedAll(rows) {
                // console.log(this.delist);
                this.isSelectAll = !this.isSelectAll;

                //ture为全选
                if (this.isSelectAll) {
                    this.delist.lenght = 0;
                    //遍历row数组，把row添加到delist中
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                        this.delist.push(row.id);
                        this.seletxt="反选";
                    })
                    // console.log(this.delist);
                } else {
                    rows.forEach(row => {
                        //反选
                        this.$refs.multipleTable.toggleRowSelection(row);
                        this.seletxt="全选";
                    })
                    //清空
                    this.delist = [];
                }
                
            },

            //勾选表格时触发
            selected(selection, row) {
                this.delist.push(row.id);
                console.log(this.delist);
            },

            //页索引
            pageIndexChang(currentPage) {
                this.pageIndex = currentPage;
                this.getlist();

            },

            //当前的页容量
            pageSizeChange(size) {
                // console.log(size);
                //把当前页容量索引赋值给pageSize
                this.pageSize = size;
                this.getlist()
            },
            //发送axios发送ajax请求
            getlist() {

                this.list = [];
                var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;

                this.$ajax.get(url)
                    .then(res => {
                        this.list = res.data.message;

                        this.totalCount = res.data.totalcount;
                    })
            },
        },
        mounted() {
            this.getlist()

        }
    }
</script>
<style scoped>
    .unlight {
        color: rgba(0, 0, 0, 0.3)
    }
</style>