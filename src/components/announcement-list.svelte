<template lang="pug">
  List.overflow-y-scroll
      +each('announcements as a')
        ListItem
          h3 {a.name}

</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {List, ListItem} from 'framework7-svelte'

import {e3Network} from "../js/api/e3";
import qs from "qs";
import {onMount} from "svelte";
import {newe3Config} from '../js/store/e3.js';

let coursesID = []
let announcements = []
async function getCourses() {
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'core_enrol_get_users_courses',
    userid: $newe3Config.e3ID
  })).then(function (resp) {
    if (!resp.data.error) {
      coursesID = resp.data.filter(c => c.shortname.includes('1091')).map(c => c.id)
      // console.log(JSON.stringify(coursesID))
      getForums()
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })

}

async function getForums() {
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'mod_forum_get_forums_by_courses',
    courseids: coursesID
  })).then(function (resp) {
    if (!resp.data.error) {
      resp.data.forEach(function (f){
        getAnnouncements(f.id)
      })
      // console.log(JSON.stringify(resp.data))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })
}

async function getAnnouncements(forumid) {
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'mod_forum_get_forum_discussions_paginated',
    forumid,
    perpage:'100',
    sortby:'timemodified'
  })).then(function (resp) {
    if (!resp.data.error) {
      announcements = announcements.concat(resp.data.discussions)
      // console.log(JSON.stringify(resp.data))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })
}

onMount(getCourses)

</script>
