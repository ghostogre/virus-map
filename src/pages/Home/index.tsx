import React, { Component } from 'react'
import { Button, Skeleton } from 'antd'
import { getVirusDataOnTime, getVirusDataByArea, getRumour, getTrend } from '../../services/getData'
import { getMapData } from '../../utils/getMapData'
import styles from './style.module.css'
import Tabs from 'antd-mobile/lib/tabs'
import 'antd-mobile/lib/tabs/style/css'
import Allcountry from './components/Allcountry'

export interface HomeProps {}
export interface HomeState {
  timer: any
  newsList?: Array<any>
  caseList?: []
  ncovcityList: []
  mapList: []
  rumourList: []
  dateList: []
  confirmedTrendList: []
  suspectedTrendList: []
  deadTrendList: []
  curedTrendList: []
  provinceList: string[]
  virusDesc?: {
    confirmedCount: number
    suspectedCount: number
    deadCount: number
    curedCount: number
    seriousCount: number
    seriousIncr: number
    modifyTime: number
    note1: string
    note2: string
    note3: string
    remark1: string
    remark2: string
    confirmedIncr: number
    suspectedIncr: number
    deadIncr: number
    curedIncr: number
  }
  provinceName?: string
  tabIndex: number
  loading: boolean
  trendLoading: boolean
}

class Home extends Component<HomeProps, HomeState> {
  // state写在属性上和constructor里没有区别
  state: HomeState = {
    timer: null,
    newsList: [],
    ncovcityList: [],
    mapList: [],
    rumourList: [],
    dateList: [],
    confirmedTrendList: [],
    suspectedTrendList: [],
    deadTrendList: [],
    curedTrendList: [],
    provinceList: [],
    tabIndex: 0,
    loading: true,
    trendLoading: true
  }
  componentDidMount() {
    this.initData()
    this.setState({
      timer: setInterval(() => {
        this.initData()
      }, 1000 * 60 * 10)
    })
  }
  componentWillMount() {
    clearInterval(this.state.timer)
    this.setState({
      timer: null
    })
  }
  // 初始化地图数据
  initData = async () => {
    const res = await getVirusDataOnTime()
    if (res.status === 200) {
      const { news, desc } = res.data.newslist[0]
      this.setState({
        newsList: news,
        virusDesc: desc,
        caseList: res.data.newslist[0].case
      })
    }

    const res1 = await getVirusDataByArea()
    const { newslist } = res1.data
    const mapList: [] = getMapData(newslist) as []
    let provinceList: string[] = []
    provinceList.push('全国')
    mapList.forEach((item: any) => {
      provinceList.push(item.provinceShortName)
    })
    this.setState({
      loading: false,
      ncovcityList: newslist,
      mapList,
      provinceList
    })
    // 首个tab加载完成就可以展示了
    // 减少过长的等待
    this.getRumourList()
  }
  // 辟谣消息
  getRumourList = async () => {
    const res = await getRumour()
    const { newslist } = res.data
    this.setState({
      rumourList: newslist
    })
  }
  render() {
    const { loading, tabIndex, virusDesc, provinceList, mapList } = this.state
    const tabs = [{ title: '疫情地图' }, { title: '最新消息' }, { title: '辟谣消息' }, { title: '疫情趋势' }]
    return (
      <Skeleton loading={loading} active paragraph={{ rows: 50 }}>
        <div>
          <header className={styles.top}></header>
          <Tabs
            tabs={tabs}
            initialPage={0}
            swipeable={false}
            tabBarInactiveTextColor="#616161"
            tabBarActiveTextColor="#4169e2"
            tabBarUnderlineStyle={{ border: '1px solid #4169e2' }}
            onChange={this.switchTab}
          >
            <Allcountry desc={virusDesc} provinces={provinceList} mapList={mapList}></Allcountry>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </Tabs>
          {tabIndex === 0 ? (
            <footer className={styles.footer}>
              <p>武汉加油</p>
              {/* 打开新窗口 */}
              <a href="http://github.com/ghostogre" target="view_window">
                Github
              </a>
            </footer>
          ) : null}
        </div>
      </Skeleton>
    )
  }
  switchTab = (tab, index) => {
    this.setState({
      tabIndex: index
    })
    if (index === 3) {
      this.getTrendList()
    }
  }
  // 疫情趋势
  getTrendList = async () => {
    const res = await getTrend()
  }
}

export default Home
