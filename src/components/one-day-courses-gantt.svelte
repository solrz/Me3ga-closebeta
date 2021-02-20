<template lang="pug">
  Swiper( slidesPerView="auto" spaceBetween="{8}")
    +each('timeslotShort as s')
      +if('!coursesOccupied.includes(d+s)')
        SwiperSlide(class="w-1/6")
          h1.text-align-center {s}
      +if('coursesOnTable[d+s]')
        SwiperSlide(class="w-{(coursesOnTable[d+s]??{last:1}).last}/6")
          Link(href="/course/{coursesOnTable[d+s].c.id}/").w-full.rounded-xl.m-2.shadow-lg.bg-blue-100
            Col.w-full
              Row.flex.flex-row.justify-around.font-bold.font-serif.text-sm
                +each('[...Array((coursesOnTable[d+s]??{last:1}).last).keys()] as i')
                  h1.text-align-center {timeslotShort[timeslotShort.indexOf(s) + i] }
              Row.h-12.overflow-y-hidden.px-2
                Col
                  .text-2xs.font-serif.text-sm.opacity-70 {coursesOnTable[d+s].at??''}
                  .font-bold.text-md.overflow-ellipse {coursesOnTable[d+s].c.name + '\n'}
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
import {courses} from '../js/store/courses.svelte';

// $: d = 'UMTWRFS'[weekdayIndex]
$: d = 'T'

const semester = '1092'

let coursesOnTable = {}
let coursesOccupied = []

const showingTimeslotRange = {f: 2, t: 2 + 13}

$: weekdaysShort = 'MTWRFSU'.split('')
$: timeslotShort = 'yz1234n56789abcd'.slice(showingTimeslotRange.f, showingTimeslotRange.t)
$: classicTimeslotShort = 'MNABCDXEFGHYIJKL'.slice(showingTimeslotRange.f, showingTimeslotRange.t)
$: classicWeekdaysShort = '１２３４５６７'
$: chineseWeekdays = '一二三四五六日'
$: weekdayIndex = new Date().getDay()
$: tsBegin = ['0600', '0700', '0800', '0900', '1010', '1110', '1220', '0120', '0220', '0330', '0430', '0530', '0630', '0730', '0830', '0930'].slice(showingTimeslotRange.f, showingTimeslotRange.t)
$: coursesBlocks = $courses.reduce(
    (cts, c) => [...cts, ...((courseTimeLookup[c.shortname] ?? []).map(tb => ({...tb, cobj: c})))], [])
$: coursesOnTable = Object.fromEntries(new Map(coursesBlocks.map(b => ([b.start, {...b, c: b.cobj}]))))
$: coursesOccupied = coursesBlocks.reduce(
    (tarr, t) => [...tarr, ...timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('').map(
        s => t.start[0] + s)], [])
$: todayShort = 'UMTWRFS'[weekdayIndex]


</script>
