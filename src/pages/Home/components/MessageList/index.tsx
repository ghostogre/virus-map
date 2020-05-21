import React from 'react'
import { Timeline, Card } from 'antd'
import dayjs from 'dayjs'
import styles from './style.module.css'

interface Props {
  data: []
}

interface ItemProps {
  data: any
}

const openUrl: (string) => any = (url) => {
  const w = window.open('about:blank')
  w.location.href = url
}

const NewsItem: React.FC<ItemProps> = (props) => {
  const { data } = props
  return (
    <div className={styles.newItem}>
      <p>{dayjs(data.pubDate).format('YYYY年MM月DD日 HH时mm分')}</p>
      <Card title={data.title}>
        <p className={styles.newContent}>{data.summary}</p>
        <div className={styles.footer}>
          <p>{data.pubDateStr}</p>
          <p className={styles.from} onClick={() => openUrl(data.sourceUrl)}>
            {data.infoSource}
          </p>
        </div>
      </Card>
    </div>
  )
}

const MessageList: React.FC<Props> = (props) => {
  const { data } = props
  return (
    <Timeline>
      {data.map((item: any, index) => (
        <Timeline.Item key={index}>
          <NewsItem data={item} />
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

export default MessageList
