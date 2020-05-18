import React, { useState } from 'react'
import { Select, Divider } from 'antd'
import styles from './style.module.css'
import dayjs from 'dayjs'
import Category from '../Category'
import Map from '../Map'
import { getMapProvinceData } from '../../../../utils/getMapData'
const { Option } = Select

interface MapProps {
  desc?: any
  provinces?: string[]
  mapList: []
}

const Allcountry: React.FC<MapProps> = function (props) {
  const { desc, provinces, mapList } = props
  const [province, setProvince] = useState<string>('全国')
  const [chartMap, setChartMap] = useState<[]>(mapList)
  const toProvince = (province) => {
    let cities: [] = []
    for (let item of mapList as any) {
      if (province === item.provinceShortName) {
        cities = item.cities
        break
      }
    }
    if (cities.length) {
      const map = getMapProvinceData(cities, province)
      setChartMap(map)
    } else if (province === '全国') {
      setChartMap(mapList)
    } else {
      setChartMap([])
    }
    setProvince(province)
  }
  return (
    <div className={styles.map}>
      {desc ? (
        <>
          <span className={styles.allCountry}>全国</span>
          <span>
            截至{dayjs(desc.modifyTime).format('YYYY年MM月DD日 HH:mm')}
            (北京时间)
          </span>
          <span>统计</span>
          <div className={styles.category}>
            <Category title="确诊" count={desc.confirmedCount} addcount={desc.confirmedIncr} color="#e57471"></Category>
            <Category title="疑似" count={desc.suspectedCount} addcount={desc.suspectedIncr} color="#dda451"></Category>
            <Category title="重症" count={desc.seriousCount} addcount={desc.seriousIncr} color="#5d4037"></Category>
            <Category title="死亡" count={desc.deadCount} addcount={desc.deadIncr} color="#919399"></Category>
            <Category title="治愈" count={desc.curedCount} addcount={desc.curedIncr} color="#7ebe50"></Category>
          </div>
        </>
      ) : null}
      <Divider />
      <div>
        <p>各省最新疫情查询（点击选择具体省份）：</p>
        <Select defaultValue={province} style={{ width: '80%' }} onChange={toProvince}>
          {provinces.map((item, index) => {
            return (
              <Option key={index} value={item}>
                {item}
              </Option>
            )
          })}
        </Select>
      </div>
      {mapList.length > 0 ? <Map mapList={chartMap} province={province} /> : null}
    </div>
  )
}

export default Allcountry
