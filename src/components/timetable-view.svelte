<template lang="pug">
  Navbar(title="課表")
  table(width="{tableWidthString}" style="table-layout: fixed")
    thead.text-align-center
      tr
        th.w-4.shadow
        +each('showingWeekdays as d')
          th(width="{tableWidthString}").sticky.top-0.z-50.bg-gray-100.font-serif.shadow
            h4 {d}
    tbody
      +each('timeslotShort as s')
        tr(class="{'z24579bd'.includes(s) ? 'bg-gray-100' : 'bg-gray-50'}").h-12
          th.w-4.sticky.left-0.z-40.bg-gray-100.text-align-center.font-serif.shadow
            h4 {s}
          +each('weekdaysShort as d')
            +if('coursesOnTable[d+s]')
              td(rowspan="{coursesOnTable[d+s].last}" width="{tableWidthString}")
                Card(expandable class="h-{coursesOnTable[d+s].last*12}").m-1
                  CardContent(padding="{false}" )
                    .bg-gradient-to-br.from-red-500.to-purple-200.h-36
                      CardHeader.display-block.text-lg
                        | {coursesOnTable[d+s].name}
                        br
                        p.font-mono.text-sm.opacity-70 {d+timeslotShort.slice(timeslotShort.indexOf(s),timeslotShort.indexOf(s)+coursesOnTable[d+s].last)}:{coursesOnTable[d+s].at??''}
                      Link(cardClose iconF7="xmark_circle_fill").card-opened-fade-in.absolute.top-2.right-2
                    .card-content-padding
                      p Hello
                      p Are You OK
            +if('!coursesOccupied.includes(d+s)')
              td(width="{tableWidthString}").h-12

</template>
<script>
import {Page, Navbar, f7} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'

const tableWidth = 120
const tableWidthString = `${tableWidth}px`
const cellWidthString = `${tableWidth / 5}px`
const showingWeekdays = ['1-Mon', '2-Tue', '3-Wed', '4-thR', '5-Fri', '6-Sat', '7-sUn']
const weekdaysShort = 'MTWRFSU'.split('')
const showingTimeslot = ['A', 'B', 'C', 'D', 'X', 'E', 'F', 'G', 'H', 'Y', 'I', 'J', 'K']
const timeslotShort = 'yz1234n56789abcd'

import {onMount} from 'svelte'
import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';
import * as courseTimeLookup from '../assets/1092-time.json'

let courses = []
let coursesOnTable = {}
let coursesOccupied = []

export async function getCourses() {
  courses = ($newe3Cache.allCourses??[]).filter( c => c.fullname.includes('1092'))
  courses.forEach(function (c) {
    let times = courseTimeLookup[c.shortname]
    times.forEach(function (t) {
      const occupyBlock = timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('');
      console.log(JSON.stringify(occupyBlock))
      coursesOccupied += occupyBlock.map(b => t.start[0] + b)
      coursesOnTable[t.start] = {...t, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
    })
  })

}

onMount(getCourses)

</script>
