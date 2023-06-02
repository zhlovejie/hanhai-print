<template>
  <el-dialog
    title="数据选择器"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    v-loading="dictLoading"
  >
    <div class="dict-select-wrapper">
      <div class="left" v-if="dictList.length > 0">
        <el-tabs
          type="border-card"
          tab-position="left"
          v-model="activeName"
          @tab-click="handleTabClick"
          style="height: 600px"
        >
          <el-tab-pane
            v-for="dict in dictList"
            :label="dict.dict_name"
            :name="dict.id"
            :key="dict.id"
          >
            <div class="dict-tab-pane-main" v-if="dictItemList.length > 0">
              <div
                class="dict-item"
                v-for="dictItem in dictItemList"
                :key="dictItem.id"
                :title="dictItem.item_text"
                @click="handleDictItemClick(dictItem)"
              >
                {{ dictItem.item_text }}
              </div>
            </div>
            <div class="empty-wrapper" v-else>
              <span class="empty-desc">暂无数据，请先去【我的数据】菜单添加数据吧。</span>
              <div class="empty-options">
                <el-button size="mini" type="primary" @click="handleAddData">去添加数据</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="empty-wrapper" v-else>
        <span class="empty-desc">暂无数据，请先去【我的数据】菜单添加数据吧。</span>
              <div class="empty-options">
                <el-button size="mini" type="primary" @click="handleAddData">去添加数据</el-button>
              </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getDictPageList, getDictItemPageList } from "@/api/dict";

/**
 * 数据选择器组件
 */
export default {
  name: "dict-select",
  data() {
    return {
      visible: false,
      dictLoading: false,
      dictItemLoading: false,
      dictList: [],
      dictItemList: [],
      activeName: "",
      input: {},
    };
  },
  methods: {
    query(input) {
      this.visible = true;
      this.input = input;
      this.loadData();
    },
    async loadData() {
      const that = this;
      that.dictLoading = true;
      try {
        let dictList = await that.fetchDict();
        that.dictList = dictList;
        if (dictList.length > 0) {
          that.activeName = dictList[0].id;
          let dictItemList = await that.fetchDictItem(dictList[0].id);
          that.dictItemList = dictItemList;
        }
        that.dictLoading = false;
      } catch (err) {
        that.dictLoading = false;
        that.$message.error(err.message);
      }
    },

    fetchDict() {
      return getDictPageList({
        page_no: 1,
        page_size: 100,
      })
        .then((res) => res.result.records || [])
        .catch((err) => {
          console.log(err);
        });
    },
    fetchDictItem(dict_id) {
      const that = this;
      that.dictLoading = true;
      return getDictItemPageList({
        dict_id,
        page_no: 1,
        page_size: 100,
      })
        .then((res) => res.result.records || [])
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          that.dictLoading = false;
        });
    },
    async handleTabClick(tab) {
      const that = this;
      that.activeName = tab.name;
      let dictItemList = await that.fetchDictItem(tab.name);
      that.dictItemList = dictItemList;
    },
    handleDictItemClick(item) {
      this.$emit("select", {
        input: this.input,
        output: item.item_text,
      });
      this.visible = false;
    },
    handleAddData(){
      this.$router.push({
                  name: "mydata",
                  query: { t: Math.random() },
                });
    }
  },
};
</script>

<style lang="scss" scoped>
.dict-select-wrapper {
  ::v-deep .el-tabs__content {
    padding: 0;
  }
  .empty-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    .empty-desc{
      
    }
    .empty-options{
      margin-top: 20px;
    }
  }
  .dict-tab-pane-main {
    .dict-item {
      position: relative;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      padding-left: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #dcdfe6;
      }
    }
  }
}
</style>
