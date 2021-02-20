<template lang="pug">
  Page(name="mega-home")
    Navbar(title="ME₃GA 首頁")
    List( noHairlinesMd)
      Block(inset strong).text-align-center
        img(src="{userInfo.profileimageurl}" class="w-1/2").mx-auto.rounded-full.shadow-xl
        h1 {realname??"尚未登入"}
        h3 {studentID??""}
        Button(bottom round fill loginScreenOpen=".e3-login-page") {token?'切換帳號':'登入E3'}
        //Button(bottom round fill onClick="e3api.logout") 登出E3
        //Button(bottom round fill onClick="{e3api.getCourses}").mt-3 更新課程清單
      //ListInput(label="Token" type="text" value="{token}")
      ListInput(label="切換學期" type="select" bind:value="{$newe3UserConfig.semester}" placeholder="Please choose...")
        span(slot="media")
          Icon( f7="chevron_left_2" )
        option(value="1091") 109年 上學期
        option(value="1092") 109年 下學期

</template>

<script type="text/javascript">
import {onMount} from 'svelte'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import {
  BlockHeader, ListInput, List,
  Page, Navbar, Row, Col, Button, Block, BlockTitle, Icon,
  LoginScreen, LoginScreenTitle, f7,
} from 'framework7-svelte'
import {e3api} from "../js/api/e3Api";
import qs from "qs";

$:  token = $newe3Config.token
$:  userInfo = $newe3Cache.userInfo
$:  studentID = $newe3Config.studentID
$:  dep = (userInfo??{}).departure
$:  realname = ((userInfo??{}).fullname??'').replace(dep+' ','')

</script>
