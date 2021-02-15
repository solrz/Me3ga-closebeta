<script context="module">
import axios from "axios";
import qs from 'qs';
import {newe3Config, newe3Cache} from '../store/e3Store';
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
  console.log(`e3NetworkApi(${JSON.stringify(funcName)}, ${JSON.stringify(payload)}, ${JSON.stringify(onDone)})`)
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
    this.refreshCache(token, e3ID)
    return {token, e3ID}
  }

  async _login(studentID, password) {
    console.debug('Loginning')
    if(debug){
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
    const studentID = _studentID??get(newe3Config).studentID
    console.debug('Getting user info...')
    const data = await e3NetworkApi(
        'core_user_get_users_by_field',
        {field: 'username', values: [studentID]},
        (d) => newe3Cache.update({userInfo: d}))
    return data
  }

  async refreshCache(token = get(newe3Config).token, e3ID = get(newe3Config).e3ID) {
    if (!token) {
      console.warn("User have not Login yet!")
      return
    }
    await Promise.all([
      this.getCourses()
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


}

export const e3api = new E3Api();


</script>
