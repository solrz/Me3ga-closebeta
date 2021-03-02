<template lang="pug">
  Panel(resizable right reveal id="timetable-settings-panel")
    List(inset)
      +each('$courses as c')
        ListItem {c.name}
      ListItem.mt-4
        span 顯示整週課表
        Toggle(bind:checked="{timetableExpanded}")
      ListItem
        span 使用祖傳時間代碼
        Toggle(bind:checked="{globalUseClassicTimeslot}")
      ListItem
        span 顯示週末
        Toggle(bind:checked="{showWeekend}")
      ListItem
        span 顯示星期代碼
        Toggle(bind:checked="{showWeekday}")
      //ListItem
      //  span 顯示不在e3上的課程
      //  Toggle(bind:checked="{displayNonE3Courses}")
      //ListInput(type='text' tabindex="1" placeholder='匯入課程'  bind:value='{importCourses}' clearButton)
  Navbar(title="課表")
    div(slot="right")
      Button(raised panelOpen="#timetable-settings-panel")
        Icon(f7="gear")
    div(slot="left")

  Row(noGap style="background-image: url('https://i.imgur.com/jJ3wd5t.png');  background-size: 200px 200px;").bg-center.bg-no-repeat.bg-contain
    Col(width="10").text-align-center.bg-blue-50.font-bold.shadow-lg
      #weekday-placeholder.h-6
      +each('globalUseClassicTimeslot ? classicTimeslotShort : timeslotShort as s')
        #timeslot-header.border-b-2.h-12.object-center.bg-blue(class="{'MNXYyzn9'.includes(s)?'bg-gray-400':''}")
          .font-thin.text-xs {tsBegin[(globalUseClassicTimeslot ? classicTimeslotShort : timeslotShort).indexOf(s)]}
          p {s}
    Col(width="90")
      Swiper( effect="coverflow" coverflowEffect="{coverflowEff}" slidesPerView="auto" )
        +each('weekdaysShort as d')
          SwiperSlide(class="w-1/{weekdayPerPage}")
            Col
              #weekday-header.shadow-lg.h-6.text-align-center.bg-blue-100
                span.font-bold {chineseWeekdays[weekdaysShort.indexOf(d)]}
                +if('showWeekday')
                  span.text-gray-600  ({weekdaysShort[weekdaysShort.indexOf(d)]})
              +each('timeslotShort as s')
                +if('coursesOnTable[d+s]')
                  .absolute.opacity-40.h-12.w-full(class="{'yzn9'.includes(s)?'bg-gray-400':''}")
                  Link(href="/course/{coursesOnTable[d+s].c.id}/" class="h-{coursesOnTable[d+s].last*12}")#course-block.p-2.z-50.w-full
                    Row.shadow-lg.rounded-xl.p-1.bg-blue-100.w-full.h-full.overflow-y-hidden
                      +if('!expanded')
                        Col(width="15").font-bold.font-serif.text-sm.h-full.flex.flex-col.justify-around
                          +each('getTimeslotFullname(d,s).slice(1) as ts')
                            .opacity-40 {ts}
                      Col(width="{expanded?100:85}").px-2.font-bold.text-xs.justify-bottom
                        |{coursesOnTable[d+s].at??''}
                        br
                        |{coursesOnTable[d+s].c.name + '\n'}
                +if('!coursesOccupied.includes(d+s)')
                  #empty-timeslot-placeholder.opacity-40.h-12(class="{'yzn9'.includes(s)?'bg-gray-400':''}")

</template>
<script>
import {Page, Navbar, f7} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {Panel} from 'framework7-svelte'
import {Swiper, SwiperSlide} from 'framework7-svelte'
import {Icon, Button, Toggle} from 'framework7-svelte'
import {List, ListItem, AccordionContent} from 'framework7-svelte'


import {onMount} from 'svelte'
import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';
import {courses} from '../js/store/courses.svelte'
import * as courseTimeLookup from '../assets/1092-time.json'
const coverflowEff = {rotate:15,stretch:0,depth:20,modifier:1,slideShadows:false}

const showingTimeslotRange = {f:1, t:2+13}
let globalUseClassicTimeslot = true
let showWeekend = false
let showWeekday = false
let timetableExpanded = false
let displayNonE3Courses = true
let importCourses = ''


$: weekdayNumberToShow = showWeekend? 7 : 5
$: weekdaysShort = 'MTWRFSU'.split('').slice(0,weekdayNumberToShow)
$: timeslotShort = 'yz1234n56789abcd'.slice(showingTimeslotRange.f, showingTimeslotRange.t)
$: classicTimeslotShort = 'MNABCDXEFGHYIJKL'.slice(showingTimeslotRange.f, showingTimeslotRange.t)
$: classicWeekdaysShort = '１２３４５６７'.slice(0,weekdayNumberToShow)
$: chineseWeekdays = '一二三四五六日'.slice(0,weekdayNumberToShow)
$: weekdayIndex = new Date().getDay()
$: tsBegin = ['0600','0700','0800','0900','1010','1110','1220','0120','0220','0330','0430','0530','0630','0730','0830','0930'].slice(showingTimeslotRange.f, showingTimeslotRange.t)
$: weekdayPerPage = timetableExpanded ? 5 : 3
$: expanded = weekdayPerPage !== 3
$: coursesBlocks = $courses.reduce(
    (cts, c) => [...cts, ...((courseTimeLookup[c.shortname] ?? []).map(tb => ({...tb, cobj:c}))) ], [])
$: coursesOnTable = Object.fromEntries(new Map(coursesBlocks.map(b => ([b.start,{...b, c:b.cobj}]))))
$: coursesOccupied = coursesBlocks.reduce(
    (tarr, t) => [...tarr, ...timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('').map(
        s => t.start[0] + s)],[])
$: todayShort = 'UMTWRFS'[weekdayIndex]
// export async function getCourses() {
//
//   courses.forEach(function (c) {
//     let times = courseTimeLookup[c.shortname]
//     times.forEach(function (t) {
//       const occupyBlock = timeslotShort.slice(timeslotShort.indexOf(t.start[1]), timeslotShort.indexOf(t.start[1]) + t.last).split('');
//       // console.log(JSON.stringify(occupyBlock))\      coursesOccupied += occupyBlock.map(b => t.start[0] + b)
//       // coursesOccupied += occupyBlock.map(b => t.start[0] + b)
//       // coursesOnTable[t.start] = {...t, obj: c, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
//     })
//   })
//
// }

function getTimeslotFullname(d,s,useClassic=globalUseClassicTimeslot){
  var timeslot = d+timeslotShort.slice(timeslotShort.indexOf(s),timeslotShort.indexOf(s)+coursesOnTable[d+s].last)
  if(useClassic){
    for(const i in weekdaysShort){
      timeslot = timeslot.replace(weekdaysShort[i], classicWeekdaysShort[i])
    }
    for(const i in timeslotShort){
      timeslot = timeslot.replace(timeslotShort[i], classicTimeslotShort[i])
    }
  }
  return timeslot
}

// onMount(getCourses)

</script>
