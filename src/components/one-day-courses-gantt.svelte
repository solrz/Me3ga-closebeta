<template lang="pug">
  Swiper( slidesPerView="auto")
    +each('timeslotShort as s')
      +if('!coursesOccupied.includes(d+s)')
        SwiperSlide(class="w-1/6")
          h1.text-align-center {s}
      +if('coursesOnTable[d+s]')
        SwiperSlide(class="w-{(coursesOnTable[d+s]??{last:1}).last}/6")
          Col
            .rounded-xl.px-4.z-20.bg-blue-100(class="h-{coursesOnTable[d+s].last*12}")
              Row
                +each('[...Array((coursesOnTable[d+s]??{last:1}).last).keys()] as i')
                  Col
                    h1.text-align-center {timeslotShort[timeslotShort.indexOf(s) + i] }
              .display-block
                .font-bold.text-lg.leading-none {coursesOnTable[d+s].name + '\n'}
                .text-2xs.font-serif.text-sm.opacity-70 {d+timeslotShort.slice(timeslotShort.indexOf(s),timeslotShort.indexOf(s)+coursesOnTable[d+s].last)}-{coursesOnTable[d+s].at??''}
</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link, Row, Col} from 'framework7-svelte'
import {Swiper, SwiperSlide} from 'framework7-svelte'

import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import * as courseTimeLookup from "../assets/1092-time.json";
import {onMount} from "svelte";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';
import {derivedNameCourses} from '../js/store/courses.svelte';

const weekdayIndex = new Date().getDay()
const timeslotShort = '1234n56789abc'
const colWidth = 60
const tableWidthString = `${colWidth}px`
$: d = 'UMTWRFS'[weekdayIndex]

const semester = '1092'

let coursesOnTable = {}
let coursesOccupied = []

$: courses = $derivedNameCourses
export function getCourses() {
  courses.forEach(function (c) {
    let times = courseTimeLookup[c.shortname] ?? []
    times.forEach(function (t) {
      const occupyBlock = timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('');
      console.log(JSON.stringify(occupyBlock))
      coursesOccupied += occupyBlock.map(b => t.start[0] + b)
      coursesOnTable[t.start] = {
        ...t,
        id: c.id,
        name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]
      }
    })
  })
  console.log(JSON.stringify(coursesOnTable))


}

onMount(getCourses)


</script>
