<template lang="pug">
  Page
    Navbar(title="所有公告")
      div(slot="right")
        Button(on:click="{view.readAll}") 全部已讀
    AnnouncementView(bind:this="{view}" filter!="{a => a.course.shortname.includes($newe3UserConfig.semester+'.')}")
</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Button} from 'framework7-svelte'

import AnnouncementView from '../components/announcements-view.svelte'

import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';


let view;
</script>
