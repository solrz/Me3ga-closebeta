<script context="module">
import axios from "axios";
import qs from 'qs';
import {newe3Config, newe3Cache} from '../store/e3Store';
import {courseIDs, derivedNameCourses} from '../store/courses.svelte'
import {get} from 'svelte/store'

let instance = null;
const debug = true
export const e3Network = axios.create({
  baseURL: 'https://e3.nycu.edu.tw/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  responseType: 'json'

})

async function e3NetworkApi(funcName, payload, onDone) {
  let data = {
    wsfunction: funcName,
    wstoken: get(newe3Config).token,
    ...payload
  }
  console.debug(`e3NetworkApi(${JSON.stringify(funcName)}, ${JSON.stringify(payload)}, ${JSON.stringify(onDone)})`)
  try {
    const resp = await e3Network.post(e3ApiGeneralUrl, qs.stringify(data))
    if (!resp.data.error) {
      console.debug(resp.data)
      if (onDone) {
        onDone(resp.data)
      }
      return resp.data
    } else {
      console.error('Server Response Error!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  } catch (err) {
    console.error(err)
  }
  return false
}

const e3ApiGeneralUrl = 'webservice/rest/server.php?moodlewsrestformat=json';

class E3Api {
  constructor() {
    if (!instance) {
      instance = this
    }
  }

  async login(studentID, password) {
    const token = await this._login(studentID, password)
    newe3Config.update({token, studentID})

    const profiles = await this.getUserInfo()
    const e3ID = profiles[0].id
    newe3Config.update({e3ID})
    newe3Cache.update({userInfo: profiles[0]})
    this.refreshCache(token, e3ID)
    return {token, e3ID}
  }

  async _login(studentID, password) {
    console.debug('Loginning')
    if (debug) {
      return '85dba17db6eed41970338eeca5d1c028'
    }
    try {
      const resp = await e3Network.post('login/token.php', qs.stringify({
        service: 'moodle_mobile_app',
        username: studentID,
        password: password
      }))
      if (resp.data.token) {
        const token = resp.data.token
        return token
        console.log('Got Token')
        console.debug(resp.data)
      } else {
        console.error('Server not provide token!')
        console.error('Detail:' + JSON.stringify(resp.data))
      }
    } catch (err) {
      console.error("Network Error During _login")
      console.error(err)
    }
    return 'LoginFail'
  }

  async getUserInfo(_studentID) {
    const studentID = _studentID ?? get(newe3Config).studentID
    console.debug('Getting user info...')
    const data = await e3NetworkApi(
        'core_user_get_users_by_field',
        {field: 'username', values: [studentID]},
        (profiles) => newe3Cache.update({userInfo: profiles[0]}))
    return data
  }

  async refreshCache(token = get(newe3Config).token) {
    if (!token) {
      console.warn("User have not Login yet!")
      return
    }
    if(debug) {
      console.debug('Refresh is disabled during degug')
      return
    }
    await Promise.all([
      this.getUserInfo(),
      this.getCourses(),
      this.getHomeworks(),
      this.getAnnouncements(),
    ])
  }

  async getCourses(e3ID = get(newe3Config).e3ID) {
    console.debug('Getting user info...')
    const resp = await e3NetworkApi(
        'core_enrol_get_users_courses',
        {userid: e3ID},
        (d) => newe3Cache.update({allCourses: d})
    )
    return resp
  }

  async getHomeworks(_courseIDs) {
    const cIDs = _courseIDs ?? get(courseIDs)
    console.debug(`${cIDs} ${_courseIDs} ${get(courseIDs)}`)
    console.debug('Getting Homeworks...')
    const resp = await e3NetworkApi(
        'mod_assign_get_assignments',
        {courseids: cIDs},
        function (data) {
          var homeworks = []
          data.courses.forEach(function (c) {
            homeworks = [...homeworks,
              ...c.assignments.map(a => ({
                    ...a,
                    course: c,
                    courseName: c.fullname.replace(c.shortname + '.', '').split(' ')[0],
                  })
              )
            ]
          })
          homeworks = homeworks
              .sort((l, r) => l.duedate - r.duedate)
          newe3Cache.update({homeworks})
        })

    return resp
  }

  async getAnnouncements(_courseIDs) {
    async function _getAnnouncements(forum) {
      console.debug('Getting announcements...')
      const resp = await e3NetworkApi(
          'mod_forum_get_forum_discussions_paginated',
          {
            forumid:forum.id,
            perpage: 100,
            sortby: 'timemodified'
          })
      // console.debug(JSON.stringify(disscussions))
      const discussions = resp.discussions.map(d => ({...d, course: forum.courseObj}))
      newe3Cache.update({disscussions: [...get(newe3Cache).disscussions, ...discussions]})
      return resp.discussions
    }

    const cIDs = _courseIDs ?? get(courseIDs)
    console.debug('Getting announcements...')
    newe3Cache.update({disscussions:[]})
    const resp = await e3NetworkApi(
        'mod_forum_get_forums_by_courses',
        {courseids: cIDs},
        function (forums) {
          forums = forums.map( f => ({...f, courseObj: get(derivedNameCourses).find(c => c.id === f.course)}))
          forums.filter(f => f.intro === '一般消息與公告').forEach(f => _getAnnouncements(f))
          newe3Cache.update({forums})
        })

    return resp
  }
}

export const e3api = new E3Api();


</script>
