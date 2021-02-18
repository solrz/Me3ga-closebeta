<template lang="pug">
  Navbar(title="課表")
  Row(noGap)
    Col(width="5").text-align-center.bg-blue-50
      .h-12
      +each('timeslotShort as s')
        .h-12 {s}
    Col(width="95")
      Swiper(  speed="{500}" slidesPerView="auto")
        +each('weekdaysShort as d')
          SwiperSlide(class="w-1/4")
            Col
              .h-12.text-align-center.bg-blue-50.overflow-y-scroll {d}
              +each('timeslotShort as s')
                +if('coursesOnTable[d+s]')
                  .rounded-xl.p-4.z-20.bg-gradient-to-br.from-red-500.to-purple-200(class="h-{coursesOnTable[d+s].last*12}")
                    .display-block
                      .font-bold.text-lg.leading-none {coursesOnTable[d+s].name + '\n'}
                      .text-2xs.font-serif.text-sm.opacity-70 {d+timeslotShort.slice(timeslotShort.indexOf(s),timeslotShort.indexOf(s)+coursesOnTable[d+s].last)}-{coursesOnTable[d+s].at??''}
                +if('!coursesOccupied.includes(d+s)')
                  .h-12.opacity-0


</template>
<script>
import {Page, Navbar, f7} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {Swiper, SwiperSlide} from 'framework7-svelte'

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
const weekdayIndex = new Date().getDay()
let courses = []
let coursesOnTable = {}
let coursesOccupied = []
$: todayShort = 'UMTWRFS'[weekdayIndex]
$: courses = ($newe3Cache.allCourses??[]).filter( c => c.shortname.includes('1092'))
export async function getCourses() {

  courses.forEach(function (c) {
    let times = courseTimeLookup[c.shortname]
    times.forEach(function (t) {
      const occupyBlock = timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('');
      // console.log(JSON.stringify(occupyBlock))
      coursesOccupied += occupyBlock.map(b => t.start[0] + b)
      coursesOnTable[t.start] = {...t, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
    })
  })

}

onMount(getCourses)

</script>
