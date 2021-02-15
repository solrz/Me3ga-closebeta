<template lang="pug">
  table(width="{tableWidthString}" style="table-layout: fixed").overflow-scroll
    thead
      tr
        th(width="0")
        +each('dates as d')
          th(width="{tableWidthString}").z-50.bg-gray-100.shadow.text-align-left.font-serif.sticky.top-0
            h4 {d.getDate()}
    tbody
      +each('homeworks as h')
        tr.overflow-x-visible.overflow-y-hidden.truncate
          td(width="0").sticky.left-4.z-10
            p.text-sm.font-bold {h.name} ({ date.format(h.dueDate.obj, 'M/D') })
            p.text-xs -{h.courseName}
          td(colspan="{new Date().getDate() - h.dueDate.date}")
            .rounded.shadow-xl.m-1.p-1.h-12.bg-gradient-to-br.from-purple-400.to-purple-200
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import date from 'date-and-time'

import {e3Network} from "../js/api/e3";
import qs from "qs";
import * as courseTimeLookup from "../assets/1092-time.json";
import {onMount} from "svelte";
import {newe3Config, newe3Cache} from '../js/store/e3.js';


var dates = [...Array(100).keys()].map((i) => date.addDays(new Date(), i))
const today = new Date()
const colWidth = 40
const tableWidthString = `${colWidth}px`
const semester = '1091'
$: coursesID = $newe3Cache.allCourses.filter(c => c.shortname.includes(semester)).map(c => c.id)
let homeworks = []

let expanded = false


export async function getHomeworks() {
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'mod_assign_get_assignments',
    courseids: coursesID
  })).then(function (resp) {
    if (!resp.data.error) {
      const courses = resp.data.courses
      homeworks = []
      courses.forEach(function (c) {
        homeworks = [...homeworks,
            ...c.assignments.map(a => ({
                  ...a,
                  courseName: c.fullname.replace(c.shortname + '.', '').split(' ')[0],
                  dueDate: {
                    obj: new Date(a.duedate * 1000 - 1),
                    date: new Date(a.duedate * 1000 - 1).getDate(),
                    hour: new Date(a.duedate * 1000 - 1).getHours(),
                  }
                })
            )
        ]
      })
      homeworks = homeworks
          .sort((l, r) => l.duedate - r.duedate)
          .filter((h) => h.duedate * 1000 > new Date().getTime())
      console.debug(JSON.stringify(resp.data))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })

}

onMount(getHomeworks)

</script>
