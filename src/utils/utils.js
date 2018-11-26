import NativeShare from 'nativeshare'
import axios from 'axios'
import {
  Toast
} from 'antd-mobile';

const nativeShare = new NativeShare()

nativeShare.setShareData({
  icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
  link: 'https://github.com/fa-ge/NativeShare',
  title: 'NativeShare',
  desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
  from: '@fa-ge',
})

export default (value) => {
  switch (value) {



    case '微信好友':
      try {
        nativeShare.call('wechatFriend')
        // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
        // 类似的命令下面有介绍
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        Toast.info('分享失败', 1);
        console.log(err)
      }
      return
    case '生活圈':
      try {
        nativeShare.call('wechatTimeline')
        // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
        // 类似的命令下面有介绍
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        Toast.info('分享失败', 1);
        console.log(err)
      }
      return
    case 'QQ':
      try {
        nativeShare.call('qqFriend')
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        Toast.info('分享失败', 1);
        console.log(err)
      }
      return
    case '新浪微博':
      try {
        nativeShare.call('weibo')
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        Toast.info('分享失败', 1);
        console.log(err)
      }
      return
    default:
      return
  }
}


export const request = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export const handleRequset = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(401, '没有获取到数据'))
      }
      if (data.errno !== 1) {
        resolve(data)
        return reject(createError(data.errno, '未登录或者登陆已过期'))
      }
      resolve(data)
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, '网络错误'))
      }
    })
  })
}

export const createError = (code, msg) => {
  Toast.fail(msg , 2);
}

export const parseURL = (url) => {
  if (typeof (url) !== "undefined" && url !== '' && url != null) {
    let a = document.createElement('a');
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function () {
        let ret = {},
          seg = a.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          i = 0,
          s;
        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }
          s = seg[i].split('=');
          ret[s[0]] = s[1];
        }
        return ret;
      })(),
      // eslint-disable-line no-undef
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
      // eslint-disable-line no-undef
    };
  } else {
    return {
      source: '',
      protocol: '',
      host: '',
      port: '',
      query: '',
      params: {},
      file: '',
      hash: '',
      path: '',
      relative: '',
      segments: []
    };
  }
}