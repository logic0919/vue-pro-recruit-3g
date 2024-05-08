<script setup>
import { ref } from 'vue'
import router from '@/router'
import { recruitApplyService } from '@/api/recruit'
const props = defineProps({
  name: String,
  id: Number
})
const apply = async () => {
  await form.value.validate()
  const res = await recruitApplyService(formModel.value)
  if (res.status === 200) {
    ElMessage.success('报名成功')
  } else {
    ElMessage.error(res.data.msg)
  }
}
const detail = () => {
  router.push(`/jobDetail?jobId=${props.id}&jobName=${props.name}`)
}

const formModel = ref({
  name: '',
  id: '04223147',
  acadmy: '',
  major: '',
  phoneNumber: '15592277810',
  job: ''
})
formModel.value.job = props.id
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

const drawer = ref(false)
const handleClose = (done) => {
  ElMessageBox.confirm('确认取消报名？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const options = [
  {
    value: 1,
    label: '前端'
  },
  {
    value: 2,
    label: '后台'
  },
  {
    value: 3,
    label: '安卓'
  },
  {
    value: 4,
    label: 'iOS'
  }
]
</script>

<template>
  <div class="jobBox">
    <div class="page">
      <span class="name">{{ name }}</span>
      <div class="btnGroup">
        <el-button class="btn" type="primary" plain @click="drawer = true"
          >报名</el-button
        >
        <el-button class="btn" type="primary" plain @click="detail()"
          >了解详情</el-button
        >
      </div>
      <div class="form">
        <el-drawer v-model="drawer" title="报名" :before-close="handleClose">
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
            <el-select v-model="formModel.job" placeholder="请选择方向">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              style="margin-top: 20px"
              type="primary"
              plain
              @click="apply()"
              >报名</el-button
            >
          </el-form>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jobBox {
  height: 65px;
  margin-bottom: 10px;
  .page {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .btnGroup {
      position: absolute;
      right: 5vw;
    }
    .name {
      position: absolute;
      left: 4vw;
    }
  }
}
</style>
