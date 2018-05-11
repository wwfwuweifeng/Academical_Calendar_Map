import {loginUrl,meetinggettableUrl,collectmeetingUrl,querymeetingUrl,
  userregisterUrl,loginExitLoginUrl,judgeIsLoginUrl,registeUrl,delcollectmeetingUrl,
  getmyselfmeetingUrl,createmyselfmeetingUrl,querymyselfmeetingUrl,} from "@/api/httpapi"

import {myAxios} from '@/main'

export const login = (userid, pwd) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(loginUrl, {"userId": userid, "pwd": pwd}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const meetinggettable = (sessionid, meetingkind) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(meetinggettableUrl, {"sessionId": sessionid, "meetingKind": meetingkind}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const collectmeeting = (sessionid, meetingid) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(collectmeetingUrl, {"sessionId": sessionid, "meetingId": meetingid}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const querymeeting = (bySystem,meetingid) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(querymeetingUrl, {"bySystem":bySystem,"meetingId": meetingid,'sessionId':localStorage.sessionid}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}


export const Exit = (sessionid) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(loginExitLoginUrl, {'sessionId': sessionid}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const judgeIsLogin = (sessionid) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(judgeIsLoginUrl, {'sessionId': sessionid}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const addOneUser = (userid, pwd) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(registeUrl, {"userName": userid, "pwd": pwd}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const delcollectmeeting = (sessionid, bySystem,meetingid,name) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(delcollectmeetingUrl, {"sessionId": sessionid, "meetingId": meetingid,
      'bySystem':bySystem,'name':name}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const getmyselfmeeting = (sessionid, bySystem) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(getmyselfmeetingUrl, {"sessionId": sessionid, "bySystem":bySystem}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const createmyselfmeeting = (sessionid,name,dateBegin,dateEnd,locate,describe) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(createmyselfmeetingUrl, {"sessionId":sessionid,'name':name,'dateBegin':dateBegin,'dateEnd':dateEnd,'locate':locate
      ,'describe':describe}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}

export const querymyselfmeeting = (name) => {
  var p = new Promise(function (resolve, reject) {
    myAxios.post(querymyselfmeetingUrl, {"sessionId":localStorage.sessionid,'name':name}).then(
      (res) => {
        resolve(res['data'])
      }
    )
  })
  return p
}