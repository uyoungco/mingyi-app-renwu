/* eslint-disable radix */
import qs from 'qs'
import * as constants from './constants'
// import { fromJS } from 'immutable';
import { Toast } from 'antd-mobile';
import { handleRequset, request } from '../../../utils/utils'



const changeInitContent = data => ({
  type: constants.GET_INIT_CONTENT,
  data
})

export const initContent = (token = 0, type = -1) => {
  Toast.loading('Loading...', 0)
  return  dispatch => {
    let dataObj = qs.stringify({accesstoken: token,accesstype: type})
    handleRequset(request.post('/n/signInTask.php',dataObj)).then(resp => {
      const data = {
        gold: parseInt(resp.data.goldCoinInfo[0].gold),
        coin: parseInt(resp.data.goldCoinInfo[0].coin),
        taskInfoQ: resp.data.taskInfoQ[0],
        taskInfoR: resp.data.taskInfoR,
        taskInfoX: resp.data.taskInfoX,
        loginstatus: resp.errno === 1 ? true : false,
        token: token,
        type: type
      }
      dispatch(changeInitContent(data))
      Toast.hide()
    })
  }
}


const addSigninGold =  (addGold, updataState) => ({
  type: constants.ADD_SIGNIN_GOLD,
  addGold,
  updataState
})

export const changeSignin = (accesstoken = 0, accesstype = -1, taskType) => {
  Toast.loading('Loading...', 0)
  return dispatch => {
    let dataObj = qs.stringify({
      accesstoken,
      accesstype,
      taskType
    })
    handleRequset(request.post('/n/goldAward.php',dataObj)).then(resp => {
      if(resp.errno === 1) {
        Toast.success('签到成功', 1);
        dispatch(addSigninGold(parseInt(resp.data.gold), {state: false}))
      }
    })
  }
}


const addPerfectGold = (addGold, updataState) => ({
  type: constants.ADD_PERFECT_GOLD,
  addGold,
  updataState
})


export const changePerfect = (accesstoken = 0, accesstype = -1, taskType) => {
  Toast.loading('Loading...', 0)
  return dispatch => {
    let dataObj = qs.stringify({
      accesstoken,
      accesstype,
      taskType
    })
    handleRequset(request.post('/n/goldAward.php',dataObj)).then(resp => {
      if(resp.errno === 1) {
        Toast.success('领取成功', 1);
        dispatch(addPerfectGold(parseInt(resp.data.gold), {state: '2', operation_name: '已领取'}))
      }
    })
  }
}
