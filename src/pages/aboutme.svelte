<template lang="pug">
  Page(name="mega-home" ptr onPageMounted="{loadUserStatus}" onPtrRefresh="{loadUserStatus}")
    Navbar(title="MEGA 首頁")
    Block(inset strong).text-align-center
      h1
        Icon(f7="person_alt_circle" size="160px")
      h1 {realname??"尚未登入"}
      h3 {studentID??""}
      Button(bottom round fill loginScreenOpen=".e3-login-page") 登入E3
      Button(bottom round fill onClick="{e3api.getCourses}").mt-3 更新課程清單
</template>

<script type="text/javascript">
import {onMount} from 'svelte'
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';
import {
  BlockHeader,
  Page, Navbar, Row, Col, Button, Block, BlockTitle, Icon,
  LoginScreen, LoginScreenTitle, f7
} from 'framework7-svelte'
import {e3api} from "../js/api/e3Api";
import qs from "qs";

$:  userInfo = $newe3Config.userInfo
$:  studentID = $newe3Config.studentID
$:  dep = (userInfo??{}).departure
$:  realname = ((userInfo??{}).fullname??'').replace(dep+' ','')

async function loadUserStatus(done) {
  const userInfo = await e3api.getUserInfo($newe3Config.token, studentID)
  if (userInfo) {
    $newe3Config.userInfo = userInfo
  }
  if(done){
    done()
  }
}

onMount(loadUserStatus)
</script>
