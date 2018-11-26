import React from 'react'
import { connect } from 'react-redux'
import { Flex, Toast } from 'antd-mobile';
import { actionCreators } from '../store'

import IconA from '../../../images/icoA.png'
import IconB from '../../../images/icoB.png'
import IconC from '../../../images/icoC.png'



const handleSignIn = (props) => {
  if(props.loginstatus) {
    props.taskInfoQ.state ? props.geiSignin(props.token, props.type, props.taskInfoQ.type) : Toast.fail('您今天已经签到过了' , 2);
  } else {
    _router.login('注册') // eslint-disable-line no-undef
  }
}
const SignIn = props => {
  const {
    gold,
    coin,
    taskInfoQ
  } = props
  return (
    <div className="SignInWrapper">
     <div className="schedule" onClick={() => handleSignIn(props)}>
        <Flex justify="between">
          {/* <div className="scheduleInfo">签到进度（1/3）</div> */}
          <div></div>
          <span className="scheduleBtn">
            <img src={IconA} alt=""/>
            <span>签到</span>
          </span>
        </Flex>
      </div>
      <div className="SignInContainer">
       
        <div className="Steps">
          <div className="line"></div>
          <Flex justify="between" onClick={() => handleSignIn(props)}>
            <a><img src={taskInfoQ.state ? IconC : IconB} alt="签到"/></a>
            <a><img src={taskInfoQ.state ? IconC : IconB} alt="签到"/></a>
            <a><img src={taskInfoQ.state ? IconC : IconB} alt="签到"/></a>
          </Flex>
        </div>
        <div className="money">
          <div className="line"></div>
          <Flex justify="around">
            <Flex wrap="wrap-reverse" className="quantity">
              <p>金币</p>
              <p>{gold}</p>
            </Flex>
            <Flex wrap="wrap-reverse" className="types">
              <p>零钱</p>
              <p>{coin}</p>
            </Flex>
          </Flex>
          
        </div>
      </div>
    </div>
  );
}


const mapState = state => ({
  gold: state.getIn(['home', 'gold']), // 金币
  coin: state.getIn(['home', 'coin']), //  零钱
  taskInfoQ: state.getIn(['home', 'taskInfoQ']), // 签到
  loginstatus: state.getIn(['home', 'loginstatus']), // 登陆状态
  token: state.getIn(['home', 'token']),
  type: state.getIn(['home', 'type']),
})
const mapDispatch = dispatch => ({
  geiSignin(accesstoken, accesstype, taskType) {
    dispatch(actionCreators.changeSignin(accesstoken, accesstype, taskType))
  }
})

export default connect(mapState, mapDispatch)(SignIn)
