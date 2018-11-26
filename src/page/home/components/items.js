import React from 'react'
import PropTypes from 'prop-types';

import { List, Button, Flex } from 'antd-mobile';
import IconA from '../../../images/icoA.png'


/**
 * @Component
 * @description 项目组件
 * @param String title
 * @param String size
 * @param String content
 * @param fun onClickEvent
 **/
const login = () => {
  _router.login('login') // eslint-disable-line no-undef
}

const buttons = props => {
  if(props.loginstatus) {
    return props.state ? <Button onClick={props.onClickEvent}>{props.content}</Button> : <Button disabled>已领取</Button>
  } else {
    return <Button onClick={() => login()}>{props.content}</Button>
  }
}
const Items = props => {
  return (
    <List.Item>
      <Flex  justify="between" className="app-item" style={{ height: "12vw"}}>
        <div >
          <span className="app-item-title">{props.title}</span>
          {/* <img src="/assets/images/icoA.png" alt=""/> */}
          <img src={IconA} alt=""/>
          <span className="app-item-size">+{props.size}</span>
        </div>
        {
          buttons(props)
        }
          
      </Flex>
    </List.Item>
  );
}

Items.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClickEvent: PropTypes.func,
};


export default Items;
