<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="120"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heros/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button
            type="primary"
            size="small"
            @click="remove(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/heros`);
      this.items = res.data;
      console.log(JSON.stringify(res.data));
    },

    async remove(row){
       this.$confirm(`确定删除"${row.name}"英雄？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/heros/${row._id}`);
          if(res.data.success){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
          } else{
            this.$message({
                type: 'success',
                message: '删除失败!'
              });
          }
          this.fetch();
        });
    }

  },

  created() {
    this.fetch();
  }
};
</script>
