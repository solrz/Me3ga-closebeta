<template lang="pug">
  Page(name="mega-home")
    Navbar(title="MEGA 首頁")
    List( noHairlinesMd)
      Block(inset strong).text-align-center
        h1
          Icon(f7="person_alt_circle" size="160px")
        h1 {realname??"尚未登入"}
        h3 {studentID??""}
        Button(bottom round fill loginScreenOpen=".e3-login-page") 登入E3
        //Button(bottom round fill onClick="e3api.logout") 登出E3
        Button(bottom round fill onClick="{e3api.getCourses}").mt-3 更新課程清單
      ListInput(label="切換學期" type="select" bind:value="{$newe3UserConfig.semester}" placeholder="Please choose...")
        i( class="icon demo-list-icon" slot="media")
        option(value="1091") 109年 上學期
        option(value="1092") 109年 下學期
</template>

<script type="text/javascript">
import {onMount} from 'svelte'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import {
  BlockHeader, ListInput, List,
  Page, Navbar, Row, Col, Button, Block, BlockTitle, Icon,
  LoginScreen, LoginScreenTitle, f7
} from 'framework7-svelte'
import {e3api} from "../js/api/e3Api";
import qs from "qs";

$:  userInfo = $newe3Cache.userInfo
$:  studentID = $newe3Config.studentID
$:  dep = (userInfo??{}).departure
$:  realname = ((userInfo??{}).fullname??'').replace(dep+' ','')

</script>
