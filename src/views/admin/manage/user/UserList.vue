<template>
  <div class="app-container">
    <div class="search-wrapper">
      <el-form
        :inline="true"
        :model="searchParams"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="账号">
          <el-input
            v-model="searchParams.username"
            placeholder="账号模糊查询"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-select v-model="searchParams.status" placeholder="请选择账号状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="删除状态">
          <el-select
            v-model="searchParams.del_flag"
            placeholder="请选择删除状态"
          >
            <el-option
              v-for="item in delFlagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
      <el-button type="primary" size="small" @click="handleAction('add', {})"
        >添加用户</el-button
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
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="username" label="账号名称"> </el-table-column>
        <el-table-column prop="realname" label="真实姓名"> </el-table-column>

        <el-table-column prop="sex" width="80" label="性别">
          <template slot-scope="scope">{{
            { 1: "男", 2: "女" }[scope.row.sex] || "-"
          }}</template>
        </el-table-column>
        <el-table-column prop="birthday" label="生日"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>

        <el-table-column prop="status" width="120" label="账号状态">
          <template slot-scope="scope">{{
            { 1: "正常", 2: "冻结" }[scope.row.status] || "-"
          }}</template>
        </el-table-column>
        <el-table-column prop="del_flag" width="120" label="删除状态">
          <template slot-scope="scope">{{
            { 0: "正常", 1: "删除" }[scope.row.del_flag] || "-"
          }}</template>
        </el-table-column>

        <el-table-column prop="user_identity" width="160" label="账号类型">
          <template slot-scope="scope">{{
            { 1: "管理员", 2: "运营人员", 3: "正式客户", 4: "试用客户" }[
              scope.row.user_identity
            ] || "-"
          }}</template>
        </el-table-column>

        <el-table-column prop="trial_times" width="120" label="试用次数">
        </el-table-column>
        <el-table-column prop="trial_used" width="120" label="已使用">
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间"> </el-table-column>

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
              @click="handleAction('password', scope.row)"
              >修改密码</el-button
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

    <UserAdd ref="refUserAdd" @ok="handleUserAddOk" />
    <ResetPassword ref="resetPassword" />
  </div>
</template>

<script>
import { userPageList } from "@/api/user";
import UserAdd from "./UserAdd.vue";
import ResetPassword from "@/components/common/ResetPasswordSys.vue";
export default {
  name: "user-list",
  components: {
    UserAdd,
    ResetPassword,
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
      statusOptions: [
        {
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "冻结",
        },
      ],
      delFlagOptions: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "删除",
        },
      ],
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
      userPageList({
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
      if (type === "password") {
        that.$refs.resetPassword.query(record);
        return;
      } else if (type === "del") {
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
      } else {
        that.$refs.refUserAdd.query(type, Object.assign({}, record));
      }
    },
    handleUserAddOk() {
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
