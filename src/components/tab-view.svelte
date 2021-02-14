<!-- Views/Tabs container -->
<template lang="pug">
  Views.safe-areas(tabs)
    Toolbar(tabbar labels bottom)
      Link(tabLinkActive tabLink='#view-today' iconIos='f7:today' iconAurora='f7:today' iconMd='f7:today' text='今日')
      Link(tabLink='#view-timetable' iconIos='f7:rectangle_split_3x1_fill' iconAurora='f7:rectangle_split_3x1_fill' iconMd='f7:rectangle_split_3x1_fill' text='課表')
      Link(tabLink='#view-aboutme' iconIos='f7:person_alt_circle' iconAurora='f7:person_alt_circle' iconMd='material:person' text='關於我')
    View#view-today(name='catalog' tab tabActive url='/today/')
    View#view-timetable(name='settings' tab url='/timetable/')
    View#view-aboutme(main tab url='/aboutme/')

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
    Tab,Tabs
} from 'framework7-svelte';


</script>
