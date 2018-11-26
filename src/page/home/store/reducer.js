import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  gold: 0, // 金币
  coin: 0, // 零钱
  taskInfoQ: {}, // 签到
  taskInfoR: [], // 日常任务
  taskInfoX: [], // 新手任务
  loginstatus: false, // 登录状态
  token: '',
  type: '-1' // 登录方式
});

export default (state = defaultState, action) => {
  switch(action.type) {
    // case constants.ADD_ITEM_LIST: // 初始化左侧信息流
    //   const newsPush = state.get('detailList').push(...action.data)
    //   return state.set('detailList', newsPush)
    case constants.GET_INIT_CONTENT:
    return state.merge({
      'gold': action.data.gold,
      'coin': action.data.coin,
      'taskInfoQ': action.data.taskInfoQ,
      'taskInfoR': action.data.taskInfoR,
      'taskInfoX': action.data.taskInfoX,
      'loginstatus': action.data.loginstatus,
      'token':  action.data.token,
      'type': action.data.type
    })

    case constants.ADD_SIGNIN_GOLD:
      return state.merge({
        'gold': state.get('gold') + action.addGold,
        'taskInfoQ': {...state.get('taskInfoQ'), ...action.updataState }
      })
    case constants.ADD_PERFECT_GOLD:
      const item = state.get('taskInfoX').map(v=> ( v.type === '3' ? {...v, ...action.updataState} : v))
      return state.merge({
        'gold': state.get('gold') + action.addGold,
        'taskInfoX': item
      })
    default:
      return state
  }
}
