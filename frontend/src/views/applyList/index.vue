<script setup>
import navbarPC from '@/components/navbarPC.vue'
import { useRoute } from 'vue-router'
import { Location } from '@element-plus/icons-vue'
import { ref } from 'vue'
const route = useRoute()
const jobId = route.params.jobId
const jobName = route.params.jobName
console.log(jobId)

// 1.关于仓库的使用和请求方法的导入
import { useTableDataStore } from '@/stores/index'
const tableDataStore = useTableDataStore()
// 解构仓库
import { storeToRefs } from 'pinia'
// 数据通过storeToRefs解构，否则无法实现响应式
const { tableData, totalNum, indexList, checkedNum } =
  storeToRefs(tableDataStore)
// 方法直接结构即可
const {
  adminApp,
  adminAppAll,
  adminAppUnhandle,
  adminAppUnhandleAll,
  checkedChangeAll
} = tableDataStore

import { adminHandleService } from '@/api/admin'
// 2.是否批量处理，也就是是否显示多选框
// 默认为false
const isMany = ref()
// isMany.value = true
isMany.value = false
// 切换批量处理，同时清除选中的数据
const switchMany = () => {
  isMany.value = !isMany.value
  if (checkedNum !== 0) {
    checkedChangeAll(false)
    allChecked.value = false
  }
}

// 3.进入页面时，先请求回来一项数据，也就是所有人的不分岗位的
// adminAppAll()

// 4.发送审批或拒绝的请求
// 4.1 参数index默认值为-1，表示未传参，表示传id数组
// 4.2 参数index值不为-1，表示传参了，表示只审批一个人的
const agree = async (index = -1) => {
  let list = new Array()
  if (index !== -1) {
    list = tableData.value[index].phoneNumber
  } else {
    for (let i = 0; i < indexList.value.length; i++) {
      list.push(tableData.value[i].phoneNumber)
    }
  }
  console.log(list)
  // const res = await adminHandleService(list)
  // if (res.status === 200) {
  //   ElMessage.success('审批成功')
  // } else {
  //   ElMessage.error(res.data.msg)
  // }
  ElMessage.success('test:审批成功')
}
const refuse = async (index = -1) => {
  let list = new Array()
  if (index !== -1) {
    list = tableData.value[index].id
  } else {
    for (let i = 0; i < indexList.value.length; i++) {
      list.push(tableData.value[i].id)
    }
  }
  // const res = await adminHandleService(list)
  // if (res.status === 200) {
  //   ElMessage.success('审批成功')
  // } else {
  //   ElMessage.error(res.data.msg)
  // }
  ElMessage.success('test:审批成功')
}

const allChecked = ref()
allChecked.value = false
const judgeAllChecked1 = () => {
  allChecked.value = totalNum.value === checkedNum.value
}
const judgeAllChecked2 = () => {
  checkedChangeAll(totalNum.value !== checkedNum.value)
}
</script>
<template>
  <div class="applyList">
    <div class="page">
      <navbarPC class="navbar"></navbarPC>
      <el-container class="content">
        <el-aside class="aside">
          <el-menu
            default-active="1-1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            active-text-color="rgb(64, 158, 255)"
          >
            <el-sub-menu index="1-1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>所有岗位</span></template
              >
              <el-menu-item index="1-1-1" @click="adminAppAll(this)"
                >所有申请者</el-menu-item
              >
              <el-menu-item index="1-1-2" @click="adminAppUnhandleAll()"
                >未处理</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="1-2">
              <template #title>
                <el-icon> <location /> </el-icon>前端</template
              >
              <el-menu-item index="1-2-1" @click="adminApp(0)"
                >所有申请者</el-menu-item
              >
              <el-menu-item index="1-2-2" @click="adminAppUnhandle(0)"
                >未处理</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="1-3">
              <template #title>
                <el-icon> <location /> </el-icon>后台</template
              >
              <el-menu-item index="1-3-1" @click="adminApp(1)"
                >所有申请者</el-menu-item
              >
              <el-menu-item index="1-3-2" @click="adminAppUnhandle(1)"
                >未处理</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="1-4">
              <template #title>
                <el-icon> <location /> </el-icon>安卓</template
              >
              <el-menu-item index="1-4-1" @click="adminApp(2)"
                >所有申请者</el-menu-item
              >
              <el-menu-item index="1-4-2" @click="adminAppUnhandle(2)"
                >未处理</el-menu-item
              >
            </el-sub-menu>
            <el-sub-menu index="1-5">
              <template #title>
                <el-icon> <location /> </el-icon>iOS</template
              >
              <el-menu-item index="1-5-1" @click="adminApp(3)"
                >所有申请者</el-menu-item
              >
              <el-menu-item index="1-5-2" @click="adminAppUnhandle(3)"
                >未处理</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="main">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="name" label="姓名" width="120" />
              <el-table-column prop="id" label="学号" width="120" />
              <el-table-column prop="acadmy" label="学院" width="120" />
              <el-table-column prop="major" label="专业" width="120" />
              <el-table-column prop="job" label="方向" width="120" />
              <el-table-column
                prop="phoneNumber"
                label="审批状态"
                width="120"
              />
              <el-table-column
                fixed="right"
                label="操作"
                width="150"
                v-if="isMany"
              >
                <template #default="scope">
                  <div class="btnGroup">
                    <el-button link type="primary" @click="agree(scope.$index)"
                      >同意申请</el-button
                    >
                    <el-button link type="primary" @click="refuse(scope.$index)"
                      >拒绝申请</el-button
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="选择" width="150" v-else>
                <template #default="scope"
                  ><el-checkbox
                    size="large"
                    v-model="tableData[scope.$index].isChecked"
                    @change="judgeAllChecked1()"
                /></template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer class="footer">
            <span>共计人数：{{ totalNum }}</span>
            <el-button
              v-if="isMany"
              type="primary"
              @click="switchMany"
              :disabled="totalNum === 0"
              >批量处理</el-button
            >
            <span v-else
              ><el-button
                type="primary"
                :disabled="!checkedNum"
                @click="agree()"
                >同意申请</el-button
              ><el-button
                type="primary"
                :disabled="!checkedNum"
                @click="refuse()"
                >拒绝申请</el-button
              >
              <el-button type="primary" plain @click="switchMany" size="small"
                >取消</el-button
              >
              <el-text> 选中人数：{{ checkedNum }}</el-text
              ><el-checkbox
                label="全选"
                size="large"
                v-model="allChecked"
                @change="judgeAllChecked2()"
              />
            </span>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.applyList {
  margin: -8px;
  min-height: 100vh;
  background-color: rgb(242, 242, 242);
  .page {
    width: 80vw;
    margin: 0 auto;
    .content {
      min-height: 85vh;
      .btnGroup {
        display: flex;
        white-space: nowrap;
      }
      .aside {
        background-color: rgb(255, 255, 255);
        margin-right: 1vw;
      }
      .main {
        background-color: rgb(255, 255, 255);
      }
      .elheader {
        background-color: rgb(211, 211, 211);
        height: 65px;
        line-height: 65px;
        padding-left: 100px;
      }
      .footer {
        margin-top: 5px;
        height: 50px;
        background-color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
