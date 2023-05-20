<template>
  <div class="app-container">
    <div class="search-wrapper">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="字典名称">
          <el-input
            v-model="searchParams.dict_name"
            placeholder="字典名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典编码">
          <el-input
            v-model="searchParams.dict_code"
            placeholder="字典编码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="options-wrapper">
      <el-button type="primary" @click="handleAction('add', {})"
        >新增</el-button
      >
    </div>
    <div class="main-wrapper" >
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="dict_name" label="字典名称"> </el-table-column>
        <el-table-column prop="dict_code" label="字典编码"> </el-table-column>
        <el-table-column prop="description" label="字典备注"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="primary">添加子项</el-button>
            <el-button size="mini" type="primary">删除</el-button>
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
import { getDictPageList } from "@/api/dict";
import DictAdd from "./modules/DictAdd.vue";
export default {
  name: "my-data",
  components: {
    DictAdd,
  },
  data() {
    return {
      loading:false,
      searchParams: {},
      pagination: {
        pageSizes: [10, 20, 30, 40, 50],
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      const that = this;
      let { pageNo, pageSize } = that.pagination;
      that.loading = true
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
        }).finally(() => {
          that.loading = false
        })
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
    handleReset(){
      this.searchParams = {}
      this.pagination = {
        ...this.pagination,
        pageNo:1,
        pageSize:10
      }
      this.loadData()
    },
    handleAction(type, record) {
      const that = this;
      that.$refs.refDictAdd.query(type, record);
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
