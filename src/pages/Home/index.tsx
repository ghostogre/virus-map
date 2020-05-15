import React, { Component } from 'react'

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
  provinceList: []
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
    loading: false,
    trendLoading: false
  }
  render() {
    return <div></div>
  }
}

export default Home
