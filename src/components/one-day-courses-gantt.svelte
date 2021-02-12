<template lang="pug">
  Block.overflow-auto
    table(width="{tableWidthString}" style="table-layout: fixed").rounded
      thead.text-align-center.bg-gray-100
        tr
          +each('timeslotShort as s')
            th(width="{tableWidthString}")
              h4 {s}
      tbody
        tr
          +each('timeslotShort as s')
            +if('coursesOnTable[d+s]')
              td(colspan="{coursesOnTable[d+s].last}" width="`${colWidth*coursesOnTable[d+s].last}`px")
                Card(expandable).m-1.h-16
                  CardContent(padding="{false}" )
                    .bg-gradient-to-br.from-red-500.to-purple-200.h-16
                      CardHeader.display-block
                        p.text-sm {coursesOnTable[d+s].name}
                        p.font-mono.text-sm.opacity-70 {d+timeslotShort.slice(timeslotShort.indexOf(s),timeslotShort.indexOf(s)+coursesOnTable[d+s].last)}:{coursesOnTable[d+s].at??''}
                      Link(cardClose iconF7="xmark_circle_fill").card-opened-fade-in.absolute.top-2.right-2
                    .card-content-padding
                      p Hello
                      p Are You OK
            +if('!coursesOccupied.includes(d+s)')
              td(width="{tableWidthString}").h-16.bg-gray-50
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'

import {e3Network} from "../js/api/e3";
import qs from "qs";
import * as courseTimeLookup from "../assets/1092-time.json";
import {onMount} from "svelte";
import {newe3Config} from '../js/store/e3.js';


const timeslotShort = 'yz1234n56789abcd'
const colWidth = 60
const tableWidthString = `${colWidth}px`
const d = 'T'
let courses = []
let coursesOnTable = {}
let coursesOccupied = []
async function getCourses() {
  // console.log(courseTimeLookup)
  e3Network.post('webservice/rest/server.php?moodlewsrestformat=json', qs.stringify({
    wstoken: $newe3Config.token,
    wsfunction: 'core_enrol_get_users_courses',
    userid: $newe3Config.e3ID
  })).then(function (resp) {
    if (!resp.data.error) {
      courses = resp.data.filter(c => c.shortname.includes('1092'))
      console.log(JSON.stringify(courses))
      courses.forEach(function (c) {
        let times = courseTimeLookup[c.shortname]
        times.forEach(function (t) {
          const occupyBlock = timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('');
          console.log(JSON.stringify(occupyBlock))
          coursesOccupied += occupyBlock.map(b => t.start[0] + b)
          coursesOnTable[t.start] = {...t, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
        })
      })
      console.log(JSON.stringify(coursesOnTable))
    } else {
      console.error('Server not provide token!')
      console.error('Detail:' + JSON.stringify(resp.data))
    }
  })

}

onMount(getCourses)

</script>
