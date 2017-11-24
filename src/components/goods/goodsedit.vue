<template>
    <div class="tmpl">
      <!-- 面包屑 -->
      <el-row>
        <el-col :span="24">
          <div class="abread bt-line">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>购物商城</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>修改商品</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="24">
  
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  
            <el-row>
              <div class="el-col el-col-11">
                <el-form-item label="文章标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </div>
              <div class="el-col el-col-11">
                <el-form-item label="副标题" prop="sub_title">
                  <el-input v-model="ruleForm.sub_title"></el-input>
                </el-form-item>
              </div>
            </el-row>
  
            <el-row>
              <div class="el-col el-col-8">
                <el-form-item label="所属类别">
                  <el-select v-model="ruleForm.category_id" placeholder="所属类别">
                    <el-option v-for="item in catelist" :label="item.title" :value="item.category_id">
                      <span v-for="sub in (item.class_layer-1)">&nbsp;</span>
                      <span v-if="item.class_layer>1">|-</span>{{item.title}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="el-col el-col-8">
                <el-form-item label="是否发布">
                  <el-switch v-model="ruleForm.status" on-text="是" off-text="否" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
                    inactive-value="0">
                  </el-switch>
                </el-form-item>
              </div>
              <div class="el-col el-col-8">
                <el-form-item label="推荐类型">
                  <el-switch v-model="ruleForm.is_slide" on-text="轮播图" off-text="轮播图" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
                    inactive-value="0">
                  </el-switch>
                  <el-switch v-model="ruleForm.is_top" on-text="置顶" off-text="置顶" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
                    inactive-value="0">
                  </el-switch>
                  <el-switch v-model="ruleForm.is_hop" on-text="热门" off-text="热门" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
                    inactive-value="0">
                  </el-switch>
                </el-form-item>
              </div>
            </el-row>
  
            <el-row>
              <div class="el-col el-col-11">
                <el-form-item label="封面上传">
                  <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :on-success="imgUploaded" :file-list="ruleForm.imgList"
                    list-type="picture" :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </div>
              <div class="el-col el-col-11">
                <el-form-item label="相册上传">
                  <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :on-success="fileUplaoded" :file-list="ruleForm.fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </div>
            </el-row>
  
            <el-row>
              <div class="el-col el-col-5">
                <el-form-item label="商品货号" prop="goods_no">
                  <el-input v-model="ruleForm.goods_no"></el-input>
                </el-form-item>
              </div>
              <div class="el-col el-col-5">
                <el-form-item label="库存" prop="stock_quantity">
                  <el-input v-model="ruleForm.stock_quantity"></el-input>
                </el-form-item>
              </div>
              <div class="el-col el-col-5">
  
                <el-form-item label="市场价格" prop="market_price">
                  <el-input v-model="ruleForm.market_price"></el-input>
                </el-form-item>
              </div>
              <div class="el-col el-col-5">
                <el-form-item label="销售价格" prop="sell_price">
                  <el-input v-model="ruleForm.sell_price"></el-input>
                </el-form-item>
              </div>
            </el-row>
  
            <el-row>
              <div class="el-col el-col-22">
                <el-form-item label="内容摘要" prop="sell_price">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.zhaiyao">
                  </el-input>
                </el-form-item>
              </div>
            </el-row>
  
            <el-row>
              <div class="el-col el-col-22">
                <el-form-item label="文章详情" prop="content">
                  <quill-editor :content="ruleForm.content" @change="onEditorChange($event)">
                  </quill-editor>
                </el-form-item>
              </div>
            </el-row>
  
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          //下拉框数据
          catelist: [],
          //获取id
          goodsId : this.$route.params.goodsid,
          ruleForm: {
            title: "1",
            sub_title: "2",
            category_id:55,
            goods_no: "NZ000222",
            stock_quantity: 1000,
            market_price: 800,
            sell_price: 800,
            status: true,
            is_slide: true,
            is_top: false,
            is_hot: true,
            zhaiyao: "为不凡而生",
            content: "<p><strong>产品参数：</strong></p>",
            imgList: [
  
            ],
            fileList: [
  
            ]
          },
          rules: {
            title: [
              { required: true, message: '请输入标题名称', trigger: 'blur' },
            ],
            sub_title: [
              { required: true, message: '请输入副标题名称', trigger: 'blur' },
            ],
            category_id: [
              { required: true, message: '请选择所属类别', trigger: 'change' }
            ],
            zhaiyao: [
              { required: true, message: '请输入摘要', trigger: 'blur' },
            ],
            // content: [
            //   { required: true, message: '请输入详情内容', trigger: 'blur' },
            // ]
          }
        }
      },
      methods: {
        //根据id获取商品信息
        getGoosInfo(){
          var url ="/admin/goods/getgoodsmodel/"+this.goodsId;
          this.$ajax.get(url)
                    .then(res=>{
                      //根据id获取信息
                      this.ruleForm=res.data.message;
                      // 把category_id的字符串转为数字
                      this.ruleForm.category_id=(this.ruleForm.category_id - 0)
                    })
        },


        // 获取分类数据方法
        getcatelist() {
          var url = "/admin/category/getlist/goods";
          this.$ajax.get(url).then(res => {
            this.catelist = res.data.message;
            // 把category_id转为数字
            // this.ruleForm.category_id=(thia.resetForm.category_id-0)
          })
        },



        //富文本
        onEditorChange(ev) {
          // console.log(ev);
          this.resetForm.content = ev.html;
        },
        //封面上传
        imgUploaded(response, file, fileList) {
          this.ruleForm.imgList = [response]
        },
        // 相册上传
        fileUplaoded(response, file, fileList) {
          this.ruleForm.fileList.push(response)
        },
  
        //表单提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$ajax.post("/admin/goods/edit/"+this.goodsId,this.ruleForm)
                .then(res => {
                  console.log(res);
                  if (res.data.status == 1) {
                    this.$message({
                      showClose: true,
                      message: 'res.data.message',
                      type: 'error'
                    })
                  } else {
                    this.$router.push({ name: "goodslist" })
                  }
                })
            } else {
              return false;
            }
          })
        },
        //重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
  
      },
  
      mounted() {
        //调用获取分类数据方法
        this.getcatelist();
        this.getGoosInfo();
      }
    }
  </script>
  
  <style scoped>
  </style>