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
                            <el-button size="small"><i class="el-icon-plus"></i> 全选</el-button>
                            <el-button size="small"><i class="el-icon-check"></i> 新增</el-button>
                            <el-button size="small"><i class="el-icon-delete"></i> 删除</el-button>
                        </el-col>
                        <!-- 搜索框 -->
                        <el-col :offset="14" :span="4">
                            <el-input @keydown.13='getlist' placeholder="请输入搜索内容" icon="search" v-model="searchValue" :on-icon-click="getlist"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <!-- 列表 -->
        <el-row>
            <el-col :span="24">
                <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
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
                            <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlight')}" ></i>
                            <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlight')}"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <a href="#">修改</a>
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
                // 默认页索引
                pageIndex: 1,
                // 默认页容量
                pageSize: 5,
                // api返回的数据总行数
                totalCount: 0,
                searchValue: '',
                list: []//存放商品数据数组
            }
        },
        methods: {
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
    .unlight{
        color: rgba(0, 0, 0, 0.3)
    }
</style>