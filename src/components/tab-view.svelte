<!-- Views/Tabs container -->
<template lang="pug">
  Views.safe-areas(tabs)
    Toolbar(tabbar labels bottom)
      Link(tabLink='#view-today' iconIos='f7:today' iconAurora='f7:today' iconMd='f7:today' text='今日')
      Link(tabLink='#view-timetable' iconIos='f7:rectangle_split_3x1_fill' iconAurora='f7:rectangle_split_3x1_fill' iconMd='f7:rectangle_split_3x1_fill' text='課表')
      Link(tabLink='#view-aboutme' iconIos='f7:person_alt' iconAurora='f7:person_alt' iconMd='material:person' text='關於我')
      Link( tabLink='#view-homeworks' iconIos='f7:doc_fill' iconAurora='f7:doc_fill' iconMd='material:person' text='作業')
      Link(tabLinkActive tabLink='#view-announcements' iconIos='f7:pin_fill' iconAurora='f7:pin_fill' iconMd='material:person' text='公告')
    View#view-today(name='catalog' tab  url='/today/ tabActive')
    View#view-timetable(name='settings' tab url='/timetable/'  )
    View#view-aboutme(main tab url='/aboutme/')
    View#view-homeworks(main tab url='/homeworks/' )
    View#view-announcements(main tab url='/announcements/' )

</template>

<script>
import {onMount} from 'svelte';

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  Tab, Tabs
} from 'framework7-svelte';


</script>
