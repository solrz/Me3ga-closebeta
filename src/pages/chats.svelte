<template lang="pug">
  Page
    Navbar(title="測試聊天室")
    div
      Messages
        +each('messages as m')
          Message(htmlText="{m.text}")
      Messagebar(value="{inputMessage}")
        a(class="link icon-only" slot="inner-end" on:click="{sendMessage}")
          Icon(
          ios="f7:arrow_up_circle_fill"
          aurora="f7:arrow_up_circle_fill"
          md="material:send")

</template>
<script>
  // import {Page, Navbar} from 'framework7-svelte'

  import {
    f7,
    f7ready,
    App,
    View,
    Navbar,
    Page,
    Messages,
    MessagesTitle,
    Message,
    Messagebar,
    Icon,
    MessagebarAttachments,
    MessagebarAttachment,
    MessagebarSheet,
    MessagebarSheetImage,
  } from 'framework7-svelte';
  import {newe3Cache} from "../js/store/e3Store";

  $:  userInfo = $newe3Cache.userInfo
  $:  dep = (userInfo??{}).departure
  $:  realname = ((userInfo??{}).fullname??'').replace(dep+' ','')
  let inputMessage = ''
  let messages = [{text: 'HelloWorld'}]
  function sendMessage(){
    console.log('hi')
    fetch("https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/d/e/1FAIpQLScwLdnczlj1M9vOvjalVCOSMtnvOWpoTHwb7I6j_No2MNnOpA/formResponse", {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "referrer": "https://docs.google.com/forms/d/e/1FAIpQLScwLdnczlj1M9vOvjalVCOSMtnvOWpoTHwb7I6j_No2MNnOpA/viewform?fbzx=-5371508408721868843",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `entry.1172091780=${realname}&entry.49933495=${inputMessage}&fvv=1&draftResponse=%5Bnull%2Cnull%2C%22-5371508408721868843%22%5D%0D%0A&pageHistory=0&fbzx=-5371508408721868843`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
  }
</script>
