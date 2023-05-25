<template>
  <div class="app-container">
    <div class="search-wrapper">
      <el-form
        :inline="true"
        :model="searchParams"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="名称">
          <el-input
            v-model="searchParams.item_text"
            placeholder="名称模糊查询"
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
      <el-button size="small" type="primary" @click="handleAction('add', {})"
        >新增字典项</el-button
      >
    </div>
    <div class="main-wrapper">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="item_text" label="名称"> </el-table-column>
        <el-table-column prop="description" label="备注"> </el-table-column>
        <el-table-column prop="sort_order" label="排序"> </el-table-column>
        <el-table-column label="操作" width="160">
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
  </div>
</template>

<script>
import { getDictItemPageList, dictItemDel } from "@/api/dict";
import DictAdd from "./DictItemAdd.vue";
export default {
  name: "dict-item-list",
  components: {
    DictAdd,
  },
  data() {
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
      dictItem: {},
    };
  },
  created() {
    // this.loadData();
  },
  methods: {
    query(record) {
      this.dictItem = { ...record };
      this.searchParams = {
        ...this.searchParams,
        dict_id: this.dictItem.id,
      };
      this.loadData();
    },
    loadData() {
      const that = this;
      let { pageNo, pageSize } = that.pagination;
      that.loading = true;
      getDictItemPageList({
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
      this.searchParams = {
        dict_id: this.dictItem.id,
      };
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
            dictItemDel(record.id)
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
      } else {
        that.$refs.refDictAdd.query(type, {
          ...record,
          dict_id: that.dictItem.id,
        });
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
