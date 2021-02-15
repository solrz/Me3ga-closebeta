<script context="module">
import axios from "axios";
import qs from 'qs';
import {newe3Config} from '../store/e3';
import {get} from 'svelte/store'

let instance = null;

export const e3Network = axios.create({
  baseURL: 'https://e3.nycu.edu.tw/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  responseType: 'json'

})

class E3Api {
  constructor() {
    if (!instance) {
      instance = this
    }
  }

  async login(studentID, password) {
    const token = await this._login(studentID, password)
    if (token === 'LoginFail') {
      return false
    }

    const e3ID = await this._getUserIDofE3(token, studentID)
    if (e3ID === 'loginFail') {
      return false

    }
    return {token, e3ID}
  }

  async _login(studentID, password) {
    console.debug('Loginning')
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

  async _getUserIDofE3(token, studentID) {
    console.debug('Getting user id...')
    try {
      const resp = await e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
        wstoken: token,
        wsfunction: 'core_user_get_users_by_field',
        'values[0]': studentID,
        field: 'username'
      }))
      if (!resp.data.error) {
        const e3ID = resp.data[0].id
        return e3ID
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

  async getUserInfo(token, studentID) {
    console.debug('Getting user info...')
    try {
      const resp = await e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
        wstoken: token,
        wsfunction: 'core_user_get_users_by_field',
        'values[0]': studentID,
        field: 'username'
      }))
      if (!resp.data.error) {
        return resp.data[0]
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

}

export const e3api = new E3Api();


</script>
