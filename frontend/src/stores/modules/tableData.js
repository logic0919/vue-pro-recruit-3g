import { defineStore } from 'pinia' //创建仓库
import { ref, computed } from 'vue'
import {
  adminAppService,
  adminAppAllService,
  adminAppUnhandleService,
  adminAppUnhandleAllService
} from '@/api/admin'
export const useTableDataStore = defineStore('xiyouMobile-tableData', () => {
  // 1.测试数据
  const testRes = ref([])
  testRes.value = {
    id: 1,
    name: '前端',
    apply_list: [
      {
        name: 'ljy',
        acadmy: '计算机学院',
        major: '软件工程',
        job: '前端',
        id: '0111111'
      },
      {
        name: 'mst',
        acadmy: '计算机学院',
        major: '软件工程',
        job: '安卓',
        id: '0111111'
      },
      {
        name: 'wxf',
        acadmy: '计算机学院',
        major: '软件工程',
        job: 'iOS',
        id: '0111111'
      },
      {
        name: 'lt',
        acadmy: '计算机学院',
        major: '软件工程',
        job: '安卓',
        id: '0111111'
      },
      {
        name: 'ztr',
        acadmy: '计算机学院',
        major: '软件工程',
        job: '安卓',
        id: '0111111'
      }
    ]
  }
  const tableData = ref([])
  tableData.value = testRes.value.apply_list
  // 2.创建一个数组，下标值等于元素值，用于indexList的生成
  let arr = new Array(tableData.value.length)
  for (let i = 0; i < tableData.value.length; i++) {
    arr[i] = i
  }

  // 3.存放从后台返回回来的四种数据，一般情况下只请求一次
  // 分岗位的，全部人
  // 数组套数组，多少个岗位就多少个数组，故有四个数组
  // 四个数组分别是前端、后台、安卓、iOS
  const app = ref([])
  // 所有数据
  const appAll = ref([])
  // 未处理的，分岗位
  // 数组套数组，多少个岗位就多少个数组，故有四个数组
  // 四个数组分别是前端、后台、安卓、iOS
  const appUnhandle = ref([])
  // 未处理的，不分岗位
  const appUnhandleAll = ref([])

  // 2.以上面四个值切换给tableData，tableData才是实际要导出的数据
  // 对应上面四个数据的函数
  // 初次点击该菜单时，从后端请求数据，并赋值给tableData上，也就是在页面渲染
  // 非初次点击，则不请求数据，只赋值给tableData
  const adminApp = (jobId) => {
    if (app.value == []) {
      const res = adminAppService(jobId)
      app.value[jobId] = res.data.data
      tableData.value = app.value[jobId]
      return
    }
    tableData.value = app.value
  }
  const adminAppAll = (e) => {
    console.log(e.target)
    if (appAll.value == []) {
      const res = adminAppAllService()
      appAll.value = res.data.data
      tableData.value = appAll.value
      return
    }
    tableData.value = appAll.value
  }
  const adminAppUnhandle = (jobId) => {
    if (appUnhandle.value == []) {
      const res = adminAppUnhandleService(jobId)
      appUnhandle.value[jobId] = res.data.data
      tableData.value = appUnhandle.value[jobId]
      return
    }
    tableData.value = appUnhandle.value
  }
  const adminAppUnhandleAll = () => {
    if (appUnhandleAll.value == []) {
      const res = adminAppUnhandleAllService()
      appUnhandleAll.value = res.data.data
      tableData.value = appUnhandleAll.value
      return
    }
    tableData.value = appUnhandleAll.value
  }

  // 4.关于tableData数据的扩展数据
  // 4.1 数据总数
  const totalNum = computed(() => {
    return tableData.value.length
  })
  // 4.2 tableData中isChecked属性值为true的下标组成一个数组
  const indexList = computed(() => {
    return arr.filter((item) => {
      return tableData.value[item].isChecked === true
    })
  })
  // 4.3indexList数据总数
  const checkedNum = computed(() => {
    return indexList.value.length
  })

  // 5. 给tableData每中isChecked属性都赋同一值，true或false
  const checkedChangeAll = (bool) => {
    for (let i = 0; i < tableData.value.length; i++) {
      tableData.value[i].isChecked = bool
    }
  }
  // 页面第一次渲染时都赋值为false
  checkedChangeAll(false)

  return {
    tableData,
    totalNum,
    indexList,
    checkedNum,
    adminApp,
    adminAppAll,
    adminAppUnhandle,
    adminAppUnhandleAll,
    checkedChangeAll
  }
})
