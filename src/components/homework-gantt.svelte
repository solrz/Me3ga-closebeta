<template lang="pug">
  table(width="{tableWidthString}" style="table-layout: fixed").overflow-scroll.min-w-full
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
            p.text-sm.font-bold {h.name} ({ date.format(new Date(h.duedate*1000-1), 'M/D') })
            p.text-xs -{h.courseName}
          td(colspan="{new Date().getDate() - new Date(h.duedate*1000-1).getDate()}")
            .rounded.shadow-xl.m-1.p-1.h-12.bg-gradient-to-br.from-purple-400.to-purple-200
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import date from 'date-and-time'

import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';


var dates = [...Array(100).keys()].map((i) => date.addDays(new Date(), i))
const today = new Date()
const colWidth = 40
const tableWidthString = `${colWidth}px`
const semester = '1091'
$: homeworks = ($newe3Cache.homeworks??[]).filter(
    h => h.course.shortname.includes($newe3UserConfig.semester)
)

</script>
