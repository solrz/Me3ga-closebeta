<template lang="pug">
  table(width="{tableWidthString}" style="table-layout: fixed").overflow-scroll.min-w-full.h-min-16.h-max-40
    thead
      tr
        th(width="{0}").sticky.left-0.p-4.z-20.bg-gray-100
        +each('dates as d')
          th(width="{tableWidthString}"
            class="{[0,6].includes(d.getDay()) ? 'text-red-500':'text-gray-700'} {d.getDay() === 0 ? 'rounded-br-lg mr-2': 'border-r'} {d.getDay() === 1 ? 'rounded-bl-lg ml-2': ''}").bg-gray-200.z-10.shadow-xl.sticky.top-0
            h4 {d.getDate()===1?`${d.getMonth()+1}/`:''}{d.getDate()}
            h4 {'日一二三四五六'[d.getDay()]}
    tbody
      +each('homeworks as h')
        tr.overflow-x-visible.overflow-y-hidden.truncate.border-b.ml-2
          td(width="{0}").sticky.left-0.px-4.z-20.bg-gray-100
            p.text-md.text-gray-900.font-bold.align-top {h.name}
            p.text-xs.text-gray-700.align-bottom {h.courseName} ~{ date.format(new Date(h.duedate*1000-1), 'M/D') }
          +each('[...Array(getDaysLeft(h)).keys()] as d')
            td(colspan="1")
              div.rounded-lg.shadow.my-2.h-12.bg-blue-200

          td(colspan="{ 120-getDaysLeft(h) }")
          td(colspan="1").sticky.right-16.z-10.bg-opacity-0
            span.bg-opacity-0.text-right
              span.text-xs.align-bottom.text-gray-700 還有
              span.text-2xl.font-serif {getDaysLeft(h)}
              span.text-xs.align-bottom.text-gray-700   天
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import date from 'date-and-time'

import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';

const daysLeft = 120
var dates = [...Array(daysLeft).keys()].map((i) => date.addDays(new Date(), i))
const today = new Date()
const colWidth = 48
const tableWidthString = `${colWidth}px`
const semester = '1091'
$: homeworks = ($newe3Cache.homeworks??[]).filter(
    h => h.course.shortname.includes($newe3UserConfig.semester+'.') && h.duedate * 1000 > Date.now()
).sort((a,b) => a.duedate - b.duedate)

function getDaysLeft(homework){
  return parseInt((new Date(homework.duedate*1000-1) - Date.now()) / (86400*1000) + 1)
}
</script>
