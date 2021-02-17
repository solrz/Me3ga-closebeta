<!-- Views/Tabs container -->
<template lang="pug">
  Page(loginScreen onPageInit="{onShow}").bg-gray-50
    .h-screen
      Button.absolute.top-2.left-1(round onClick="{f7.loginScreen.close}")
        Icon(f7="xmark", size="24px")
      LoginScreenTitle.h-48.pt-16.text-align-left.font-serif
        +if('showing === true')
          div(transition:slide="{transitionParam}")
            h1 Make
            h1 E₃
            h1 Great
            h1 Again
            .w-24.h-1.bg-black
      List(form inset noHairlinesMd).pt-16.space-y-4
        ListInput(type='text' autocomplete="username" placeholder='學號'  bind:value='{username}' clearButton)
          i.f7-icons.person(slot="media").opacity-60 person
        ListInput(type='password' autocomplete="current-password" placeholder='單一入口密碼' bind:value='{password}' clearButton)
          i.f7-icons.person(slot="media").opacity-60 lock
      Button(fill onClick="{login}").mx-4.mt-8
        h2 登入
        //i.f7-icons.person paperplane
      Block
        Row
          Col(width="20")
            Link(href="https://www.facebook.com/NiceCourseToU" external target="_blank")
              img(src="../../static/icons/128.png" alt="NiceCourseToU-LOGO").w-full
          Col(width="80")
            p 由NiceCourseToU團隊精心打造。
            p 透過MEGA，你可以在手機上使用App存取。
            p 無須重新登入，從此拋開難用的NewE3。
</template>
<script>
import {onMount} from 'svelte';
import {slide,} from 'svelte/transition'
import {quintOut,} from 'svelte/easing'
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';
import {
  f7,
  Link,
  View,
  Page, Card,
  LoginScreen, LoginScreenTitle,
  List, ListInput, ListButton,
  Block,
  Button, Icon, Row, Col,
  Swiper, SwiperSlide
} from 'framework7-svelte';
import {e3api} from "../js/api/e3Api";

let username = '';
let password = '';
let showing = false;
const transitionParam = {delay: 1000, duration: 1200, easing: quintOut}

onMount(onShow)

function onShow() {
  if (showing) {
    showing = false
  }
  showing = true
}

async function login() {
  if ((username ?? '').length == 0) {
    f7.toast.create({text: "學號還沒輸", closeTimeout: 3000}).open()
    return
  }
  if ((password ?? '').length == 0) {
    f7.toast.create({text: "密碼還沒輸", closeTimeout: 3000}).open()
    return
  }
  f7.dialog.preloader("登入中...");
  const loginInfo = await e3api.login(username, password)
  f7.dialog.close();
  if (!loginInfo) {
    f7.toast.create({text: "登入失敗QQ", closeTimeout: 3000}).open()
  }
  if (loginInfo) {
    $newe3Config.token = loginInfo.token
    $newe3Config.e3ID = loginInfo.e3ID
    $newe3Config.studentID = username
    f7.toast.create({text: "登入成功！", closeTimeout: 3000}).open()
    f7.loginScreen.close()
    e3api.getCourses()
  }
}


</script>
