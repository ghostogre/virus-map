import React from 'react'
import styles from './style.module.css'

interface Props {
  title: string
  count?: number
  addcount?: number
  color?: string
}
// FC = FunctionComponents, SFC是过时的语法
const Category: React.FC<Props> = function (props) {
  const { title, count, addcount, color } = props
  return (
    <div style={{ color }} className={styles.category}>
      <p>{title}</p>
      <p>{count || 0}例</p>
      <p>
        <span className={styles.tip}>较昨日</span>
        <span className={styles.add}>+{addcount || 0}</span>
      </p>
    </div>
  )
}

export default Category
