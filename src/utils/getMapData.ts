// 将数据格式化为地图所需格式
export function getMapData(staticList: []): Array<any> {
  let mapList: Array<any>
  mapList = staticList.map((item: any) => {
    return {
      name: item.provinceShortName,
      value: item.confirmedCount,
      ...item
    }
  }) as any
  return mapList
}

export function getMapProvinceData(staticList: [], provinceName: string): [] {
  let mapList: []
  if (provinceName.includes('省') || provinceName.includes('自治区')) {
    mapList = staticList.map((item: any) => {
      return {
        name: item.cityName + '市',
        value: item.confirmedCount,
        ...item
      }
    }) as []
  } else {
    mapList = staticList.map((item: any) => {
      return {
        name: item.cityName,
        value: item.confirmedCount,
        ...item
      }
    }) as []
  }
  return mapList
}
