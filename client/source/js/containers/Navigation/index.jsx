import React from 'react'
import { NavLink } from 'react-router-dom'

import * as styles from './styles.css'

const Item = (props) => {
  return (
    <NavLink
      exact
      activeStyle={{color: 'black', fontWeight: 'bold'}}
      className={styles.item}
      to={props.to}
    >
      {props.children}
    </NavLink>
  )
}

const Wrapper = (props) => {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  )
}

export default {
  Item, Wrapper
}
