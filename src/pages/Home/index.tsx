import React, { Component } from 'react'
import { Divider, Skeleton } from 'antd'
import dayjs from 'dayjs'
import { getVirusDataOnTime, getVirusDataByArea, getRumor, getTrend } from '../../services/getData'
import { getMapData } from '../../utils/getMapData'
import styles from './style.module.css'
import Tabs from 'antd-mobile/lib/tabs'
import 'antd-mobile/lib/tabs/style/css'
import Allcountry from './components/Allcountry'
import MessageList from './components/MessageList'
import Pie from './components/Pie'
import Rumor from './components/Rumor'
import Line from './components/Line'

export interface HomeProps {}
export interface HomeState {
  timer: any
  newsList?: []
  caseList?: []
  ncovcityList: []
  mapList: []
  rumorList: []
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
    rumorList: [],
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
    this.getRumorList()
  }
  // 辟谣消息
  getRumorList = async () => {
    const res = await getRumor()
    const { newslist } = res.data
    this.setState({
      rumorList: newslist
    })
  }
  render() {
    const {
      loading,
      tabIndex,
      virusDesc,
      provinceList,
      mapList,
      newsList,
      rumorList,
      confirmedTrendList,
      suspectedTrendList,
      curedTrendList,
      deadTrendList,
      dateList,
      trendLoading
    } = this.state
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
            <div className={styles.mapBox}>
              <Allcountry desc={virusDesc} provinces={provinceList} mapList={mapList}></Allcountry>
            </div>
            <div className={styles.messageBox}>
              <MessageList data={newsList} />
            </div>
            <div className={styles.rumorBox}>
              <Rumor data={rumorList} />
            </div>
            <div className={styles.trendBox}>
              <Skeleton loading={trendLoading} active paragraph={{ rows: 15 }}>
                <Line
                  dateList={dateList}
                  firstList={confirmedTrendList}
                  secondList={suspectedTrendList}
                  firstColor={'#e57471'}
                  secondColor={'#dda451'}
                  legendData={['确诊人数', '疑似人数']}
                />
                <Divider />
                <Line
                  dateList={dateList}
                  firstList={deadTrendList}
                  secondList={curedTrendList}
                  firstColor={'#919399'}
                  secondColor={'#7ebe50'}
                  legendData={['死亡人数', '治愈人数']}
                />
                <Divider />
                <Pie virusDesc={virusDesc} />
              </Skeleton>
            </div>
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
    const trend = await getTrend() // CORS不允许跨域，这个接口目前没有用
    //console.log(trend);
    const trendList = trend.data.results
    let dateArr = [] as any
    let confirmedArr = [] as any
    let suspectedArr = [] as any
    let deadArr = [] as any
    let curedArr = [] as any
    let datelist = [] as any
    let confirmedList = [] as any
    let suspectedList = [] as any
    let deadList = [] as any
    let curedList = [] as any
    trendList.forEach((item: any) => {
      dateArr.push(dayjs(item.updateTime).format('MM-DD'))
      confirmedArr.push(item.confirmedCount)
      suspectedArr.push(item.suspectedCount)
      deadArr.push(item.deadCount)
      curedArr.push(item.curedCount)
    })
    dateArr.reverse().forEach((item, index) => {
      if (item !== dateArr[index + 1]) {
        datelist.push(item)
        confirmedList.push(confirmedArr[index])
        suspectedList.push(suspectedArr[index])
        deadList.push(deadArr[index])
        curedList.push(curedArr[index])
      }
    })
    this.setState({
      dateList: datelist,
      confirmedTrendList: confirmedList.reverse(),
      suspectedTrendList: suspectedList.reverse(),
      deadTrendList: deadList.reverse(),
      curedTrendList: curedList.reverse(),
      trendLoading: false
    })
  }
}

export default Home
