<template lang="pug">
  Page(name="mega-home")
    Navbar(title="ME₃GA 設定")
    List( noHairlinesMd).space-y-2
      Block(inset strong).text-align-center
        img(alt="avatar" src="{userInfo.profileimageurl}" class="w-24").mx-auto.rounded-full.shadow-xl
        h1.font-serif {realname??"尚未登入"}
        h2.font-serif {studentID??""}
        Button.my-2(bottom raised round fill loginScreenOpen=".e3-login-page") {token?'切換帳號':'登入E3'}
        +if('token')
          Button.my-2(bottom raised round popoverOpen=".logout-confrim") 登出
      ListItem(header="捷徑 （需要重新登入！）")
        Segmented(raised round)
          Button(external href="https://portal.nycu.edu.tw") 前往Portal
          Button(external href="https://e3.nycu.edu.tw") 前往NewE3
        //Button(bottom round fill onClick="{e3api.getCourses}").mt-3 更新課程清單
      ListInput(label="存取代號" type="text" value="{token}")
      ListInput(label="切換學期" type="select" bind:value="{$newe3UserConfig.semester}" placeholder="Please choose...")
        span(slot="media").text-gray-600
          Icon( f7="chevron_left_2" )
        option(value="1091") 109年 上學期
        option(value="1092") 109年 下學期
      ListItem(header="版本號" title="20210302 v0.1.2")
  Popover.logout-confrim
    BlockTitle 確定要登出嗎？
    Button.my-2(color="red" bottom fill raised round onClick="{logout}") 確認登出


</template>

<script type="text/javascript">
import {onMount} from 'svelte'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import {
  BlockHeader, ListInput, List, ListItem, Popover,
  Page, Navbar, Row, Col, Button, Block, BlockTitle, Icon, Segmented,
  LoginScreen, LoginScreenTitle, f7,
} from 'framework7-svelte'
import {e3api} from "../js/api/e3Api";
import qs from "qs";

$:  token = $newe3Config.token
$:  userInfo = $newe3Cache.userInfo ?? {fullname: 'hey'}
$:  studentID = $newe3Config.studentID
$:  dep = userInfo.departure
$:  realname = userInfo.fullname.replace(dep + ' ', '')
$: profileimageurl = userInfo.profileimageurl

function logout(){
  localStorage.clear();
  location.reload();
}
</script>
