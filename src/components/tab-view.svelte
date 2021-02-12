<!-- Views/Tabs container -->
<template>
  <Views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <Toolbar tabbar labels bottom>
      <Link tabLink="#view-today" iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill"
            iconMd="material:view_list" text="今日"/>
      <Link tabLinkActive tabLink="#view-timetable" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings"
            text="課表"/>
      <Link tabLink="#view-aboutme" iconIos="f7:person_alt_circle" iconAurora="f7:person_alt_circle"
            iconMd="material:person" text="關於我"/>
    </Toolbar>


    <!-- Catalog View -->
    <View id="view-today" name="catalog" tab url="/today/"/>

    <!-- Settings View -->
    <View id="view-timetable" name="settings" tab tabActive url="/timetable/"/>

    <!-- Your main view/tab, should have "view-main" class. It also has "tabActive" prop -->
    <View id="view-aboutme" main tab url="/aboutme/"/>


  </Views>
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
