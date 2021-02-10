<template lang="pug">
  Page(name="mega-home")
    Navbar(title="MEGA 首頁")
    Block(inset).text-align-center
      h2
        Icon(f7="person_alt_circle" size="160px")
      h2 {$newe3Config.studentID}
      Button(round fill onClick="{onClickLogin}") 登入E3
    LoginScreen(opened="{isLoginScreenOpened}")
      LoginScreenContent
</template>

<script type="text/javascript">
import {newe3Config} from '../js/store/e3.js';
import {
  BlockHeader,
  Page, Navbar, Row, Col, Button, Block, BlockTitle, Icon,
    LoginScreen, LoginScreenTitle
} from 'framework7-svelte'
import LoginScreenContent from '../components/login-screen.svelte'

let isLoginScreenOpened = false;

function onClickLogin() {
  console.log('Button pressed')
  if(isLoginScreenOpened){
    isLoginScreenOpened = !isLoginScreenOpened
  }
  isLoginScreenOpened = !isLoginScreenOpened
}
</script>
