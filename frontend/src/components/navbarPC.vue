<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import router from '@/router'
const name = route.name
console.log(name)
import { useTokenStore } from '@/stores/index'
const tokenStore = useTokenStore()
let navShow = ref('')
switch (name) {
  case 'jobDetail':
    navShow.value = '岗位详情'
    break
  case 'home':
    navShow.value = '主页'
    break
  case 'my':
    navShow.value = '个人中心'
    break
  case 'pwdChange':
    navShow.value = '修改密码'
    break
  case 'user':
    navShow.value = '用户信息'
    break
  case 'applyHandle':
    navShow.value = '职位列表'
    break
  case 'applyList':
    navShow.value = '申请列表'
    break

  default:
    break
}
</script>
<template>
  <div class="navbar">
    <div class="header">
      <span style="font-size: 30px; font-weight: 700">{{ navShow }}</span>
      <span style="position: absolute; right: 0px"
        ><el-button
          type="primary"
          v-if="!tokenStore.token"
          style="font-size: 15px"
          @click="router.push('/login')"
          >登录</el-button
        >
        <span v-else style="font-size: 15px; font-weight: 700">
          你好，name </span
        >&nbsp;</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  margin-bottom: 4vh;
  background-color: rgb(255, 255, 255);
  padding-left: 10px;
  padding-right: 10px;
  color: rgb(95, 95, 95);
  border-bottom: 2px solid rgb(199, 199, 199);
  .header {
    height: 100%;
    line-height: 60px;
    position: relative;
  }
}
</style>
