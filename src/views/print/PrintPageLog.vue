<template>
  <div class="app-container">
    <div class="search-wrapper">
      <!-- <el-form
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
      </el-form> -->
    </div>
    <div class="options-wrapper">
      
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
        <el-table-column prop="print_json" label="打印内容预览">
          <!-- <template slot-scope="scope">{{ scope.row }}</template> -->
          <template slot-scope="scope">---</template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>
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
  </div>
</template>

<script>
import { printLogList } from "@/api/print";

export default {
  name: "print-log-pagelist",
  components: {

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
      printLogList({
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
    }
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
