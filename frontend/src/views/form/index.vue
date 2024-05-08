<script setup>
import navbarPC from '@/components/navbarPC.vue'
import { ref } from 'vue'
// import { recruitJobsService } from '@/api/recruit'

const formModel = ref({
  name: '',
  id: '04223147',
  acadmy: '',
  major: '',
  phoneNumber: '15592277810'
})
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  id: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    {
      pattern: /^\d{8}$/,
      message: '学号必须8位数字',
      trigger: 'blur'
    }
  ],
  acdamy: [{ required: true, message: '请输入学院', trigger: 'blur' }],
  major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^\d{11}$/,
      message: '手机号必须11位数字',
      trigger: 'blur'
    }
  ]
}

const form = ref(null)
// const recruitJobs = async () => {
//   const res = await recruitJobsService()
//   if (res.status === 200) {
//     jobTitleList.value = res.data.title
//   } else {
//     ElMessage.error(res.data.msg)
//   }
// }
// recruitJobs()
</script>

<template>
  <div class="form">
    <el-drawer
      v-model="drawer"
      title="I am the title"
      direction="rtl"
      :before-close="handleClose"
    >
      <span>Hi, there!</span>
    </el-drawer>
    <div class="page">
      <navbarPC class="navbar"></navbarPC>
      <el-container class="main">
        <el-form class="elform" :model="formModel" :rules="rules" ref="form">
          <el-form-item prop="name">
            <el-input
              class="elinput"
              v-model="formModel.name"
              placeholder="请输入姓名"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="id">
            <el-input
              class="elinput"
              v-model="formModel.id"
              placeholder="请输入学号"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="acadmy">
            <el-input
              class="elinput"
              v-model="formModel.acadmy"
              placeholder="请输入学院"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="major">
            <el-input
              class="elinput"
              v-model="formModel.major"
              placeholder="请输入专业"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input
              class="elinput"
              v-model="formModel.pwd"
              placeholder="请输入手机号"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.form {
  margin: -8px;
  min-height: 100vh;
  background-color: rgb(242, 242, 242);
  padding-bottom: 2vh;
  .page {
    width: 90vw;
    margin: 0 auto;
    .main {
      margin-top: 4vh;
      min-height: 85vh;
      .aside {
        background-color: rgb(255, 255, 255);
        margin-right: 1vw;
      }
    }
  }
}
</style>
