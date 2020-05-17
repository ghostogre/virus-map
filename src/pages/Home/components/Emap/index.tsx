import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import { getChinaJson } from '../../../../services/getData'
// 导入主模块
import echarts from 'echarts/lib/echarts'
// 地图
import 'echarts/lib/chart/map'
// 提示框
import 'echarts/lib/component/tooltip'
// 视觉映射
import 'echarts/lib/component/visualMap'

interface Props {
  mapList: []
  province?: string
}

interface State {}

class Emap extends Component<Props, State> {
  echartRef: any = undefined
  async componentDidMount() {
    const res = await getChinaJson()
    echarts.registerMap('china', res)
  }
  render() {
    return (
      <ReactEcharts
        ref={(ref) => {
          this.echartRef = ref
        }}
        echarts={echarts}
        option={this.getOption()}
        lazyUpdate={true}
        notMerge={true}
        style={{ height: '400px' }}
      />
    )
  }
  getOption = () => {
    const { mapList, province } = this.props
    return {
      tooltip: {},
      visualMap: {},
      series: [
        {
          type: 'map',
          left: 'center', // 对齐
          name: '确诊人数',
          mapType: province || 'china',
          data: mapList,
          label: {
            show: true,
            position: 'inside',
            fontSize: 6
          },
          zoom: province ? 1.1 : 1.2,
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

export default Emap
