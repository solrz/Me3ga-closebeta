<!-- Views/Tabs container -->
<template lang="pug">
  Page(loginScreen onPageInit="{onShow}").bg-gray-50
    Navbar
      div(slot="left")
        Button(round onClick="{f7.loginScreen.close}")
          Icon(f7="xmark", size="24px")

    Subnavbar
      Segmented(raised)
        Button(tabLinkActive tabLink="#normal-login") 密碼登入
        Button(tabLink="#token-login") 使用存取代碼登入
    .h-screen
      LoginScreenTitle.px-4.h-48.pt-16.text-align-left.font-serif
        +if('showing === true')
          div
            h1(transition:slide="{{...transitionParam, delay:3000}}") Make
            h1(transition:slide="{{...transitionParam, delay:3400}}") E₃
            h1(transition:slide="{{...transitionParam, delay:3800}}") Great
            h1(transition:slide="{{...transitionParam, delay:4400, duration:3500}}") Again
            .w-24.h-1.bg-black

      Tabs
        Tab(tabActive id="normal-login")
          List(form inset noHairlinesMd onSubmit="{login}").pt-16.space-y-4
            ListInput(type='email' tabindex="1" autocomplete="username" placeholder='學號'  bind:value='{username}' clearButton)
              i.f7-icons.person(slot="media").opacity-60 person
            ListInput(type='password' tabindex="2" autocomplete="current-password" placeholder='單一入口密碼' bind:value='{password}' clearButton)
              i.f7-icons.person(slot="media").opacity-60 lock
          Button(fill onClick="{login}").mx-4.mt-8
            h2 登入
          Button(fill onClick="{f7.loginScreen.close}").mx-4.mt-2
            h2 不登入預覽App

        Tab(id="token-login")
          List(form inset noHairlinesMd onSubmit="{tokenLogin}").pt-16.space-y-4
            ListInput(type='email' tabindex="1" autocomplete="username" placeholder='學號'  bind:value='{username}' clearButton)
              i.f7-icons.person(slot="media").opacity-60 person
            ListInput(type='password' tabindex="2" autocomplete="current-password" placeholder='存取代碼' bind:value='{password}' clearButton)
              i.f7-icons.person(slot="media").opacity-60 lock
          Button(fill onClick="{tokenLogin}").mx-4.mt-8
            h2 以存取代碼登入
        //i.f7-icons.person paperplane
      Block
        Row
          Col(width="20")
            Link(href="https://www.facebook.com/NiceCourseToU" external target="_blank")
              img(src="https://i.imgur.com/jJ3wd5t.png" alt="NiceCourseToU-LOGO").w-full
          Col(width="80")
            p 由NɪᴄᴇCᴏᴜʀꜱᴇTᴏU團隊精心打造。
            p 透過ME₃GA，在手機上輕鬆存取課程新訊息。
            p 無須重新登入，從此拋開把你登出的NewE3。
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
  Swiper, SwiperSlide, Navbar, Subnavbar,
  Tab, Tabs, Segmented
} from 'framework7-svelte';
import {e3api} from "../js/api/e3Api";
import {e3ID} from "../js/store/userInfo.svelte";

let username = '';
let password = '';
let showing = false;
const transitionParam = {delay: 3000, duration: 2000, easing: cubicOut}

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
  f7.dialog.preloader("登入中...")

  const loginInfo = await e3api.login(username, password)

  f7.dialog.close();
  if (!loginInfo) {
    f7.toast.create({
      text: "登入失敗QQ。\n若您已經重新陽交註冊單一入口，且確定密碼正確，是因為學校設定特別擋住了你的登入。\n此時不用擔心，請隔4小時回來重試就好。",
      closeTimeout: 8000
    }).open()
  }
  if (loginInfo) {
    $newe3Config.e3ID = loginInfo.id
    $newe3Config.studentID = username
    $newe3Config.token = loginInfo.token
    e3api.refreshCache(loginInfo.token, loginInfo.e3ID)
    f7.toast.create({text: "登入成功！", closeTimeout: 3000}).open()
    f7.loginScreen.close()
  }
}

async function tokenLogin() {
  if ((username ?? '').length == 0) {
    f7.toast.create({text: "學號還沒輸", closeTimeout: 3000}).open()
    return
  }
  if ((password ?? '').length == 0) {
    f7.toast.create({text: "存取代碼還沒輸", closeTimeout: 3000}).open()
    return
  }
  f7.dialog.preloader("登入中...");

  $newe3Config.token = password
  const loginInfo = await e3api.tokenLogin(username, password)

  f7.dialog.close();
  if (!loginInfo) {
    f7.toast.create({
      text: "登入失敗QQ。\n登入代碼可能已經失效，清況允許請用密碼登入。",
      closeTimeout: 10000
    }).open()
  }
  if (loginInfo) {
    $newe3Config.e3ID = loginInfo.e3ID
    $newe3Config.studentID = username
    e3api.refreshCache(password, loginInfo.e3ID)
    password = ''
    f7.toast.create({text: "登入成功！", closeTimeout: 3000}).open()
    f7.loginScreen.close()
  }
}

</script>
