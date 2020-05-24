import React from 'react'
import { Card, Carousel } from 'antd'
import styles from './style.module.css'
interface Props {
  data: []
}

const Rumor: React.FC<Props> = (props) => {
  const { data } = props
  return (
    <Carousel style={{ background: '#fff', height: '450px' }}>
      {data.map((item: any, index) => {
        let imgUrl: string = ''
        if (
          item.explain === '谣言' ||
          item.explain === '伪科学' ||
          item.explain === '有失实' ||
          item.explain === '假新闻'
        ) {
          imgUrl = 'https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/badge-big@2x.5395c013.png'
        }
        if (item.explain === '尚无定论') {
          imgUrl = 'https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/badge-y-big@2x.c0fd84da.png'
        }
        return (
          <div className={styles.cardbox}>
            <Card
              key={index}
              hoverable
              className={styles.card}
              cover={
                <img
                  src={item.imgsrc}
                  alt=""
                  style={{ borderRadius: '20px 20px 0px 0px', opacity: 0.8, height: 200 }}
                />
              }
            >
              <img src={imgUrl} alt="" className={styles.tip} />
              <div>
                <p className={styles.title}>{item.title}</p>
                <p>{item.desc}</p>
              </div>
            </Card>
          </div>
        )
      })}
    </Carousel>
  )
}

export default Rumor
