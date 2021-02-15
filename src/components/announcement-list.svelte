<template lang="pug">
  List.overflow-y-scroll
      +each('announcements as a')
        ListItem
          h3 {a.name}

</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {List, ListItem} from 'framework7-svelte'

import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import {onMount} from "svelte";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';

const semester = '1091'

$: coursesID = ($newe3Cache.allCourses??[]).filter(c => c.shortname.includes(semester)).map(c => c.id)

let announcements = []
export async function getForums() {
  announcements = []
  const token = $newe3Config.token;
  if(!token){
    return
  }
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: token,
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

onMount(getForums)

</script>
