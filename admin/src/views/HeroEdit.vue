<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="finishUpload">
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name:'',
        avatar:''
      },
    };
  },
  methods: {

   finishUpload(res){
      console.log(res.url);
      // this.$set(this.model,'avatar',res.url);//如果data()中model没有定义的话就用这种方式<显式复制>
      this.model.avatar = res.url;//如果data()中model定义的话就用这种方式建议每次现在model中将需要的数行都先定义好之后直接使用这中方法
    },

    async save() {
      let res;
      console.log('id:' + this.id);
      if (this.id) {
        res = await this.$http.put(`rest/heros/${this.id}`, this.model); //将界面编辑数据发送给后端
      } else {
        res = await this.$http.post("rest/heros", this.model); //将界面增加数据发送给后端
      }

      this.$router.push("/heros/list"); //跳转到类型列表界面
      this.$message({
        //使用elementUI自带的提示消息
        type: "success",
        message: "保存成功了"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);
      console.log(JSON.stringify(res.data));
      this.model = res.data;
    },
  },

  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>