import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import { getChinaJson, getProvince } from '../../../../services/getData'
// 导入主模块
import echarts from 'echarts/lib/echarts'
// 地图
import 'echarts/lib/chart/map'
// 提示框
import 'echarts/lib/component/tooltip'
// 视觉映射
import 'echarts/lib/component/visualMap'
// 拼音对照
import provinceMap from '../../../../map/pinyin-province.js'

interface Props {
  mapList: []
  province?: string
}

interface State {
  showLoading: boolean
}

class Map extends Component<Props, State> {
  echartRef: any = undefined
  constructor(props: Props) {
    super(props)
    this.state = {
      showLoading: true
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.province !== this.props.province) {
      this.setState({
        showLoading: true
      })
    }
  }
  async componentDidMount() {
    // didupdate 第一次不会执行
    try {
      const { province } = this.props
      const provincePinyin = provinceMap[province]
      if (!provincePinyin) {
        const res = await getChinaJson()
        echarts.registerMap(province, res)
        // 这里是更新完成之后，这时候注册Map并不会更新
        // 只有重新调用render才会重新获取option
      } else {
        const res = await getProvince(provincePinyin)
        echarts.registerMap(province, res)
      }
      this.setState({
        showLoading: false
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  // 设置province作为key
  // async componentDidUpdate(prevProps, prevState) {
  // const { province } = this.props
  // if (province === prevProps.province) {
  //   // 防止使用setState死循环
  //   return
  // }
  // const provincePinyin = provinceMap[province]
  // this.setState({
  //   showLoading: true
  // })
  // if (!provincePinyin) {
  //   const res = await getChinaJson()
  //   echarts.registerMap(province, res)
  //   // 这里是更新完成之后，这时候注册Map并不会更新
  //   // 只有重新调用render才会重新获取option
  // } else {
  //   const res = await getProvince(provincePinyin)
  //   echarts.registerMap(province, res)
  // }
  //   this.setState({
  //     showLoading: false
  //   })
  //   let instance = this.echartRef.getEchartsInstance()
  //   instance.setOption(this.getOption())
  // }
  render() {
    const { showLoading } = this.state
    return (
      <ReactEcharts
        ref={(ref) => {
          this.echartRef = ref
        }}
        echarts={echarts}
        option={this.getOption()}
        lazyUpdate={true}
        notMerge={true}
        showLoading={showLoading}
        style={{ height: '400px' }}
      />
    )
  }
  getOption = () => {
    const { mapList, province } = this.props
    return {
      tooltip: {
        // 点击地图的气泡提示框
        show: true,
        formatter(params) {
          let tip = ''
          if (params.data) {
            // 传入地图的数据在data里
            tip = `${params.name}：<br>确诊：${params.data['value']}例<br>死亡：${params.data['deadCount']}例<br>治愈：${params.data['curedCount']}例`
          }
          return tip
        }
      },
      visualMap: {
        // 视觉映射
        show: true,
        type: 'piecewise', // 定义为分段型 visualMap
        min: 0,
        max: 5000,
        orient: 'horizontal', // 横向排布
        align: 'right', // label的位置
        // 相对于容器的定位
        left: 'center',
        top: 0,
        right: 0,
        textStyle: {
          // 图例文字样式
          fontSize: 10
        },
        inRange: {
          // 由数值小到大
          color: ['#ffc0b1', '#ff8c71', '#ef1717', '#9c0505']
        },
        showLabel: true,
        text: ['高', '低'], // 两端文字
        padding: 5,
        // 每个小块的大小
        itemWidth: 10,
        itemHeight: 10,
        pieces: [
          // 每一段的范围，以及每一段的文字
          { min: 1000 },
          { min: 500, max: 999 },
          { min: 100, max: 499 },
          { min: 10, max: 99 },
          { min: 1, max: 9 }
        ]
      },
      series: [
        {
          type: 'map',
          left: 'center', // 对齐
          name: '确诊人数',
          mapType: province,
          data: mapList,
          label: {
            show: false,
            position: ['50%', '50%'],
            fontSize: 10,
            color: '#212121'
          },
          zoom: province !== '全国' ? 1.1 : 1.2,
          roam: false, // 关闭鼠标缩放和平移
          showLegendSymbol: false, // 显示图例的颜色标识
          rippleEffect: {
            // 波纹
            show: true,
            brushType: 'stroke',
            scale: 2.5,
            period: 4
          }
        }
      ]
    }
  }
}

export default Map
