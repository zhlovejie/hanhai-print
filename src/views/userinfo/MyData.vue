<template>
  <div class="app-container">
    <div class="tips">
      <el-alert
        style="margin-bottom: 20px"
        title="使用说明"
        type="info"
        show-icon
      >
        <div>
          <p>举例说明：</p>
          <p>
            1.点击【新增字典】输入 性别 点击保存后，在列表 操作栏 点击
            【编辑子项】
          </p>
          <p>
            2.点击【新增字典项】 输入 男
            点击保存后关闭，一个字典数据就创建好了。
          </p>
        </div>
      </el-alert>
    </div>
    <div class="search-wrapper">
      <el-form
        :inline="true"
        :model="searchParams"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="字典名称">
          <el-input
            v-model="searchParams.dict_name"
            placeholder="字典名称模糊查询"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="options-wrapper">
      <div style="display: flex">
        <el-button type="primary" size="small" @click="handleAction('add', {})"
          >新增字典</el-button
        >

        <FileUpload @ok="() => loadData()" style="margin-left: 10px" />

        <a
          :href="templateUrl"
          target="_self"
          style="
            margin-left: 10px;
            font-size: 12px;
            line-height: 32px;
            color: #409eff;
          "
          >下载字典模板</a
        >
      </div>
    </div>
    <div class="main-wrapper">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="dict_name" label="序号">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="dict_name" label="字典名称"> </el-table-column>
        <el-table-column prop="description" label="字典备注"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleAction('edit', scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleAction('editSub', scope.row)"
              >编辑子项</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleAction('del', scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>

    <DictAdd ref="refDictAdd" @ok="handleDictAddOk" />

    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      :direction="drawerDirection"
      size="60%"
    >
      <DictItemList ref="dictItemList" />
    </el-drawer>
  </div>
</template>

<script>
import { getDictPageList, dictDel } from "@/api/dict";
import DictAdd from "./modules/DictAdd.vue";

import DictItemList from "./modules/DictItemList.vue";

import FileUpload from "@/components/common/UploadFile.vue";

export default {
  name: "my-data",
  components: {
    DictAdd,
    DictItemList,
    FileUpload,
  },
  data() {
    let templateUrl = `${process.env.VUE_APP_BASE_API}/static/download/%E5%AD%97%E5%85%B8%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx`;
    return {
      loading: false,
      searchParams: {},
      pagination: {
        pageSizes: [10, 20, 30, 40, 50],
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],

      drawer: false,
      drawerDirection: "rtl",
      drawerTitle: "",
      templateUrl,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      const that = this;
      let { pageNo, pageSize } = that.pagination;
      that.loading = true;
      getDictPageList({
        ...that.searchParams,
        page_no: pageNo,
        page_size: pageSize,
      })
        .then((res) => {
          let { page, count, records } = res.result;
          that.tableData = records;
          that.pagination = {
            ...that.pagination,
            total: count,
            pageNo: page,
          };
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          that.loading = false;
        });
    },
    handleSearch() {
      this.loadData();
    },
    handleSizeChange(val) {
      this.pagination = {
        ...this.pagination,
        pageNo: 1,
        pageSize: val,
      };
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagination = {
        ...this.pagination,
        pageNo: val,
      };
      this.loadData();
    },
    handleReset() {
      this.searchParams = {};
      this.pagination = {
        ...this.pagination,
        pageNo: 1,
        pageSize: 10,
      };
      this.loadData();
    },
    handleAction(type, record) {
      const that = this;
      console.log(arguments);
      if (type === "del") {
        that
          .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            dictDel(record.id)
              .then((res) => {
                if (res.code === 200) {
                  that.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                  that.loadData();
                } else {
                  that.$message({
                    type: "info",
                    message: res.message,
                  });
                }
              })
              .catch((err) => {
                that.$message({
                  type: "info",
                  message: err.message,
                });
              });
          })
          .catch(() => {
            that.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (type === "editSub") {
        that.drawerTitle = `${record.dict_name}`;
        that.drawer = true;
        that.$nextTick(() => {
          that.$refs.dictItemList.query(record);
        });
      } else if (type === "import") {
      } else {
        that.$refs.refDictAdd.query(type, record);
      }
    },
    handleDictAddOk() {
      this.loadData();
    },
  },
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  margin-top: 20px;
}

.pagination-wrapper {
  margin-top: 18px;
}
</style>
