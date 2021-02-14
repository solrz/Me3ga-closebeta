<template lang="pug">
  table(width="{tableWidthString}" style="table-layout: fixed").overflow-scroll
    thead
      tr
        th(width="0")
        +each('dates as s')
          th(width="{tableWidthString}").z-50.bg-gray-100.shadow.text-align-left.font-serif.sticky.top-0
            h4 {s}
    tbody
      +each('homeworks as h')
        tr.overflow-x-visible.overflow-y-hidden.truncate
          td(width="0").sticky.left-4.z-10
            p.text-sm.font-bold {h.name} ({new Date().getDate() - h.dueDate.date}D)
            p.text-xs -{h.courseName}
          td(colspan="{new Date().getDate() - h.dueDate.date}")
            .rounded.shadow-xl.m-1.p-1.h-12.bg-gradient-to-br.from-red-500.to-purple-200
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'

import {e3Network} from "../js/api/e3";
import qs from "qs";
import * as courseTimeLookup from "../assets/1092-time.json";
import {onMount} from "svelte";
import {newe3Config} from '../js/store/e3.js';


var dates = []
const today = new Date()
const colWidth = 40
const tableWidthString = `${colWidth}px`

let coursesID = []
let homeworks = []

let expanded = false

async function getCourses() {
  for (const offset of [...Array(20).keys()]) {
    dates = dates.concat(new Date(today.getTime() + 86400 * 1000 * offset).getDate())
  }
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'core_enrol_get_users_courses',
    userid: $newe3Config.e3ID
  })).then(function (resp) {
    if (!resp.data.error) {
      coursesID = resp.data.filter(c => c.shortname.includes('1091')).map(c => c.id)
      getHomeworks()
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })

}

async function getHomeworks() {
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'mod_assign_get_assignments',
    courseids: coursesID
  })).then(function (resp) {
    if (!resp.data.error) {
      const courses = resp.data.courses
      courses.forEach(function (c) {
        homeworks = homeworks.concat(
            c.assignments.map(a => ({
              ...a,
              courseName: c.fullname.replace(c.shortname + '.', '').split(' ')[0],
              dueDate: {
                date: new Date(a.duedate * 1000 - 1).getDate(),
                hour: new Date(a.duedate * 1000 - 1).getHours(),
              }
            }))
        )
      })
      console.log(JSON.stringify(resp.data))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })

}

onMount(getCourses)

</script>
