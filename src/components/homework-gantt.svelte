<template lang="pug">
  .overflow-y-scroll.overflow-x-hidden(class="h-1/4")
    table(width="{tableWidthString}" style="table-layout: fixed").rounded
      thead.text-align-left
        tr.bg-gray-100
          +each('dates as s')
            th(width="{tableWidthString}").sticky.top-0.bg-gray-100
              h4 {s}
      tbody
        +each('homeworks as h')
          tr
            td(colspan="4" width="`${colWidth*4}`px")
              Card.m-1.h-12.z-50
                CardContent(padding="{false}" )
                  .bg-gradient-to-br.from-red-500.to-purple-200
                    CardHeader.display-block.truncate
                      p.text-sm {h.name}
                      p.text-sm -{h.courseName}
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'

import {e3Network} from "../js/api/e3";
import qs from "qs";
import * as courseTimeLookup from "../assets/1092-time.json";
import {onMount} from "svelte";
import {newe3Config} from '../js/store/e3.js';


const dates = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const colWidth = 60
const tableWidthString = `${colWidth}px`

let coursesID = []
let homeworks = []

let expanded = false

async function getCourses() {
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
      courses.forEach(function (c){
        homeworks = homeworks.concat(c.assignments.map(a => ({...a, courseName:c.fullname})))
      })
      console.log(JSON.stringify(resp.data))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })

}

function onExpand(){
  expanded = true
}

function onClose(){
  expanded = false
}
onMount(getCourses)

</script>
