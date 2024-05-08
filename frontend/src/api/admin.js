import request from '@/utils/request'

// 管理员仪表板或主页
const adminDashboardService = () => {
  return request.get('/admin/dashboard')
}
// 查看所有职位发布
const adminJobsService = () => {
  return request.get('/admin/jobs')
}
// 查看职位详情
const adminJobDetailService = (jobid) => {
  return request.get(`/admin/job/${jobid}`)
}
// 查看职位申请
const adminAppService = (jobid) => {
  return request.get(`/admin/applications/${jobid}`)
}
const adminAppAllService = () => {
  return request.get('/admin/applications/all')
}
const adminAppUnhandleService = (jobid) => {
  return request.get(`/admin/applications/unhandle/${jobid}`)
}
const adminAppUnhandleAllService = () => {
  return request.get('/admin/applications/unhandle')
}
// 审批或拒绝职位申请 + 自动发送录取短信
const adminHandleService = (list) => {
  return request.get('/admin/application', { list })
}

export {
  adminDashboardService,
  adminJobsService,
  adminJobDetailService,
  adminAppService,
  adminAppAllService,
  adminAppUnhandleService,
  adminAppUnhandleAllService,
  adminHandleService
}
