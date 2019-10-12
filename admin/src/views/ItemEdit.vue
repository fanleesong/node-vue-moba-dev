<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="model.icon"></el-input>
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
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      console.log('id:' + this.id);
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model); //将界面编辑数据发送给后端
      } else {
        res = await this.$http.post("rest/items", this.model); //将界面增加数据发送给后端
      }

      this.$router.push("/items/list"); //跳转到类型列表界面
      this.$message({
        //使用elementUI自带的提示消息
        type: "success",
        message: "保存成功了"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      console.log(JSON.stringify(res.data));
      this.model = res.data;
    },
  },

  created() {
    this.id && this.fetch();
  }
};
</script>