<template lang="pug">
  Page(name="mega-home")
    Navbar(title="MEGA 首頁")
    Block(inset strong).text-align-center
      h1
        Icon(f7="person_alt_circle" size="160px")
      h1 {$newe3Config.realname??"尚未登入"}
      h3 {$newe3Config.studentID??""}
      h4 {$newe3Config.dep??""}
      Button(bottom round fill loginScreenOpen=".e3-login-page") 登入E3
      Button(bottom round fill onClick="{refreshCourses}").mt-3 更新課程清單
</template>

<script type="text/javascript">
import {newe3Config, newe3Cache} from '../js/store/e3.js';
import {
  BlockHeader,
  Page, Navbar, Row, Col, Button, Block, BlockTitle, Icon,
  LoginScreen, LoginScreenTitle, f7
} from 'framework7-svelte'
import LoginScreenContent from '../components/login-screen.svelte'
import {e3Network} from "../js/api/e3";
import qs from "qs";

let isLoginScreenOpened = false;

function onClickLogin() {
  console.log('Button pressed')
  if (isLoginScreenOpened) {
    isLoginScreenOpened = !isLoginScreenOpened
  }
  isLoginScreenOpened = !isLoginScreenOpened
}

function loadUserStatus() {

  let getUserInfoForm = {
    wstoken: $newe3Config.token,
    wsfunction: 'core_user_get_users_by_field',
    'values[0]': useStudentID,
    field: 'username'
  };
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify(getUserInfoForm)).then(function (resp) {
    if (!resp.data.error) {
      const e3ID = resp.data[0].id
      newe3Config.e3ID = e3ID
      console.log('Got E3ID')
      f7.dialog.alert('登入成功', () => {
        f7.loginScreen.close();
      });
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })
}

async function refreshCourses() {
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'core_enrol_get_users_courses',
    userid: $newe3Config.e3ID
  })).then(function (resp) {
    if (!resp.data.error) {
      $newe3Cache.allCourses = resp.data
      $newe3Cache.courses = resp.data.filter(c => c.shortname.includes('1092'))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })


}
</script>
