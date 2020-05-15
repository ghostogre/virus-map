import axios from 'axios'
const apiKey = 'cd7c2d24ca7db0d1aa2df5c04210eaaa'

// 实时疫情数据接口
export function getVirusDataOnTime() {
  return axios.get(`http://api.tianapi.com/txapi/ncov/index?key=${apiKey}`)
}

// 疫情省市病例数据
export function getVirusDataByArea() {
  return axios.get(`http://api.tianapi.com/txapi/ncovcity/index?key=${apiKey}`)
}

// 获取疫情谣言接口
export function getRumour() {
  return axios.get(`http://api.tianapi.com/txapi/rumour/index?key=${apiKey}`)
}

// 获取疫情趋势接口
export function getTrend() {
  return axios.get('https://lab.isaaclin.cn/nCoV/api/overall?latest=0')
}

// 获取地图json文件
export function getChinaJson() {
  return axios.get('https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/china.json')
}

// 获取省市json文件
export function getProvince(pinyinName) {
  return axios.get(
    `https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/province/${pinyinName}.json`
  )
}
