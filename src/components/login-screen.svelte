<!-- Views/Tabs container -->
<template lang="pug">
  Page(loginScreen)
    .h-screen.m-4.px-2
      Button.absolute.top-2.left-1(round onClick="{close}")
        Icon(f7="xmark", size="24px")
      LoginScreenTitle.pt-16.text-align-left.font-serif
        h1 Make
        h1 E₃
        h1 Great
        h1 Again
        .w-24.h-1.bg-black
      List(form inset noHairlinesMd).pt-16.space-y-4
        ListInput(type='email' placeholder='學號' bind:value='{username}' clearButton)
          i.f7-icons.person(slot="media").opacity-60 person
        ListInput(type='password' placeholder='單一入口密碼' bind:value='{pwd}' clearButton)
          i.f7-icons.person(slot="media").opacity-60 lock
      Button(fill onClick="{login}").mx-4.mt-8
        h2 登入
        i.f7-icons.person(slot="media") paperplane
      Block
        p 由NiceCourseToU團隊精心打造。
        p 透過MEGA，你可以在手機上使用App存取。
        p 無須重新登入，從此拋開難用的NewE3。
</template>
<script>
import {onMount} from 'svelte';
import {newe3Config} from '../js/store/e3.js';
import {
  f7,
  View,
  Page,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  Block,
  Toast,
  Button, Icon
} from 'framework7-svelte';
import {e3Network} from "../js/api/e3";
import qs from "qs";


let username = '';
let pwd = '';
let isShowing = false;

function login() {
  if ((username ?? '').length == 0) {
    f7.toast.create({text: "學號還沒輸", closeTimeout: 3000}).open()
    return
  }
  if ((pwd ?? '').length == 0) {
    f7.toast.create({text: "密碼還沒輸", closeTimeout: 3000}).open()
    return
  }
  f7.toast.create({text: "登入中...", closeTimeout: 3000}).open()
  e3Network.post('login/token.php', qs.stringify({
    service: 'moodle_mobile_app',
    username: username,
    password: pwd
  })).then(function (resp) {
    if (resp.data.token) {
      const token = resp.data.token
      $newe3Config.token = token
      $newe3Config.studentID = username
      console.log('Got Token')
      _getUserInfo(username)
    } else {
      f7.toast.create({text: "登入失敗，請重試...", closeTimeout: 3000}).open()
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })
}

function _getUserInfo(studentID) {
  const useStudentID = studentID ?? $newe3Config.studentID
  if (!useStudentID) {
    console.error('User has not login yet!')
    return
  }
  let getUserInfoForm = {
    wstoken: $newe3Config.token,
    wsfunction: 'core_user_get_users_by_field',
    'values[0]': useStudentID,
    field: 'username'
  };
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify(getUserInfoForm)).then(function (resp) {
    if (!resp.data.error) {
      const e3ID = resp.data[0].id
      const dep = resp.data[0].department;
      const realname = resp.data[0].fullname.replace(dep+' ', '');
      $newe3Config.e3ID = e3ID
      $newe3Config.dep = dep
      $newe3Config.realname = realname
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

function alertLoginData() {
  login(username, pwd)
}
function close(){
  f7.loginScreen.close()
  console.log('closed')
}

</script>
