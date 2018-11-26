import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { actionCreators } from '../store'
import { Flex, Accordion, List, Button, InputItem, ActionSheet } from 'antd-mobile';

import { actionCreators } from '../store'
// import Testss from '../../../utils/utils'

import Items from './items'
import ItemsTwo from './itemsTwo'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Task extends Component {
  constructor() {
    super();
    this.state = {
      clicked: 'none'
    };
  }

  dataList = [
    // { url: 'OpHiXAcYzmPQHcdlLFrc', title: 'QQ空间' },
    // { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));


  /**
   * @function
   * @description 分享组件
   * */
  // showShareActionSheet = () => {
  //   ActionSheet.showShareActionSheetWithOptions({
  //     options: this.dataList,
  //     // title: 'title',
  //     // message: 'I am description, description, description',
  //   },
  //     (buttonIndex) => {
  //       this.setState({ clicked: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
  //       buttonIndex > -1 ? Testss(this.dataList[buttonIndex].title) : `cancel`
  //     });
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState)
  // }

  /**
   * @function
   * @description 完善资料
   * */
  handleClickPerfect() {
    try {
      if(this.props.loginstatus) {
        _router.perfect('完善资料')  // eslint-disable-line no-undef
      } else {
        _router.login('login')  // eslint-disable-line no-undef
      }
    } catch(e) {
      console.error(e)
    }
  }

  /**
   * @function
   * @description 阅读奖励
   * @param String test
   * */
  handleCilickRead() {
    try {
      _router.read('阅读奖励') // eslint-disable-line no-undef
    } catch(e) {
      console.error(e)
    }
  }
  

  render() {
    const {
      taskInfoR,
      loginstatus,
      taskInfoX,
      receiveePerfect,
      token,
      accesstype
    } = this.props
    return (
      <div className="taskWrapper">
        <List className="invitation">
          {/* <List.Item>
            <Flex justify="between">
              <p>000000000</p>
              <Button onClick={this.showShareActionSheet}>复制邀请码</Button>
            </Flex>
          </List.Item> */}
        </List>

        <Accordion defaultActiveKey="0" className="accordion" onChange={this.onChange}>
          <Accordion.Panel header="新手活动">
            <List className="my-list">
              {/* <List.Item style={{ height: "12vw"}}>
                <Flex justify="between" className="invitationReward">
                  <InputItem placeholder="请输入邀请码" />
                  <Button >去领取</Button>
                </Flex>
              </List.Item> */}
              {
                taskInfoX.map(v=> (
                  v.type === '3' ?  <ItemsTwo
                                    key={v.type}  
                                    title={v.name}
                                    size={v.gold}
                                    content={v.operation_name}
                                    state={v.state}
                                    loginstatus = {loginstatus}
                                    jiaohu = {() => this.handleClickPerfect()}
                                    onClickEvent={() => receiveePerfect(token, accesstype, v.type)}
                                  /> : null
                ))
              }
            </List>
          </Accordion.Panel>
        </Accordion>

        <List className="my-list">
          <List.Item>日常任务</List.Item>
        </List>
        <List className="my-list">

          {/* <Items
            title="邀请好友"
            size="5000"
            content="去邀请"
            onClickEvent={this.showShareActionSheet}
          /> */}
          {
          taskInfoR.map(v => {
            return (
              <Items
                key={v.type}
                title={v.name}
                size={v.gold}
                content={v.operation_name}
                state={v.state}
                loginstatus = {loginstatus}
                onClickEvent={() => this.handleCilickRead()}
              />
            )
          })
        }
        </List>
          
        
      </div>
    );
  }
}

const mapState = state => ({
  taskInfoR: state.getIn(['home', 'taskInfoR']), // 日常任务
  taskInfoX: state.getIn(['home', 'taskInfoX']), //新手任务
  loginstatus: state.getIn(['home', 'loginstatus']), // 登陆状态
  token: state.getIn(['home', 'token']),
  accesstype: state.getIn(['home', 'type']),
})

const mapDispatch = dispatch => ({
  receiveePerfect(accesstoken, accesstype, taskType) {
    dispatch(actionCreators.changePerfect(accesstoken, accesstype, taskType))
  }
})

export default connect(mapState, mapDispatch)(Task)
