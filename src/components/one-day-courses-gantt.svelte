<template lang="pug">
  table(backdrop width="{tableWidthString}" style="table-layout: fixed").overflow-scroll.min-w-full
    thead.text-align-left.bg-gray-100.sticky.font-serif.shadow
      tr
        +each('timeslotShort as s')
          th(width="{tableWidthString}")
            h4 {s}
    tbody
      tr
        +each('timeslotShort as s')
          +if('coursesOnTable[d+s]')
            td(colspan="{coursesOnTable[d+s].last}" width="`${colWidth*coursesOnTable[d+s].last}`px").overflow-x-visible.overflow-y-hidden.truncate
              Link(href="/course/{coursesOnTable[d+s].id}/").rounded.shadow-xl.m-1.p-1.h-12.bg-gradient-to-br.from-purple-500.to-purple-200
                Col
                  p.text-sm {coursesOnTable[d+s].name}
                  p.font-serif.text-sm.opacity-70 {coursesOnTable[d+s].at??''}:{d+timeslotShort.slice(timeslotShort.indexOf(s),timeslotShort.indexOf(s)+coursesOnTable[d+s].last)}

          +if('!coursesOccupied.includes(d+s)')
            td(width="{tableWidthString}").h-16.bg-gray-50
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link, Col} from 'framework7-svelte'

import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import * as courseTimeLookup from "../assets/1092-time.json";
import {onMount} from "svelte";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';

const timeslotShort = '1234n56789abc'
const colWidth = 60
const tableWidthString = `${colWidth}px`
const d = 'T'

const semester = '1092'

let coursesOnTable = {}
let coursesOccupied = []
$: courses = ($newe3Cache.allCourses??[]).filter( c => c.fullname.includes('1092'))

export function getCourses() {
  courses.forEach(function (c) {
    let times = courseTimeLookup[c.shortname]??[]
    times.forEach(function (t) {
      const occupyBlock = timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('');
      console.log(JSON.stringify(occupyBlock))
      coursesOccupied += occupyBlock.map(b => t.start[0] + b)
      coursesOnTable[t.start] = {...t,
        id: c.id,
        name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
    })
  })

}

onMount(getCourses)


</script>
