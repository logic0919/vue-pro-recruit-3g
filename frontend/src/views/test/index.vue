<template>
  <div class="test">
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>

    <el-drawer v-model="drawer" title="报名" :before-close="handleClose">
      <el-form
        class="elform"
        :model="signFormModel"
        :rules="signRules"
        ref="form"
      >
        <el-form-item prop="name">
          <el-input
            class="elinput"
            v-model="signFormModel.name"
            placeholder="请输入姓名"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="id">
          <el-input
            class="elinput"
            v-model="signFormModel.id"
            placeholder="请输入学号"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="acadmy">
          <el-input
            class="elinput"
            v-model="signFormModel.acadmy"
            placeholder="请输入学院"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="major">
          <el-input
            class="elinput"
            v-model="signFormModel.major"
            placeholder="请输入专业"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber">
          <el-input
            class="elinput"
            v-model="signFormModel.pwd"
            placeholder="请输入手机号"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
// import { recruitJobsService } from '@/api/recruit'

const signFormModel = ref({
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
</script>
