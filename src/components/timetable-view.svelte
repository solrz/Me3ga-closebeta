<template lang="pug">
  Navbar(title="課表")
    div(slot="right")
      Button(onClick!="{() => weekdayPerPage = weekdayPerPage==3?5:3 }")
        Icon(f7="person_alt_circle" size="24px" )

  Row(noGap style="background-image: url('https://i.imgur.com/jJ3wd5t.png');  background-size: 200px 200px;").bg-center.bg-no-repeat.bg-contain
    Col(width="10").text-align-center.bg-blue-50.font-bold.shadow-lg
      #weekday-placeholder.h-6
      +each('globalUseClassicTimeslot ? classicTimeslotShort : timeslotShort as s')
        #timeslot-header.border-b-2.h-12.object-center.bg-blue(class="{'MNXY'.includes(s)?'bg-gray-400':''}")
          .font-thin.text-xs {tsBegin[(globalUseClassicTimeslot ? classicTimeslotShort : timeslotShort).indexOf(s)]}
          p {s}
    Col(width="90")
      Swiper( effect="{weekdayPerPage==3?'coverflow':''}" coverflowEffect="{weekdayPerPage==3?coverflowEff:{}}" centeredSlides slidesPerView="auto" )
        +each('weekdaysShort as d')
          SwiperSlide(class="w-1/{weekdayPerPage}")
            Col
              #weekday-header.shadow-lg.h-6.text-align-center.bg-blue-50.font-bold {chineseWeekdays[weekdaysShort.indexOf(d)]}
              +each('timeslotShort as s')
                +if('coursesOnTable[d+s]')
                  .absolute.opacity-40.h-12.w-full(class="{'yzn9'.includes(s)?'bg-gray-400':''}")
                  Link(href="/course/{coursesOnTable[d+s].obj.id}/" class="h-{coursesOnTable[d+s].last*12}")#course-block.p-2.z-50
                    Row.shadow-lg.rounded-xl.px-1.py-2.bg-blue-100.h-full.overflow-y-hidden
                      +if('!expanded')
                        Col(width="15").font-bold.font-serif.text-sm.h-full.flex.flex-col.justify-around
                          +each('getTimeslotFullname(d,s).slice(1) as ts')
                            .opacity-40 {ts}
                      Col(width="{expanded?100:85}").px-2.font-bold.text-xs.justify-bottom
                        |{coursesOnTable[d+s].at??''}
                        br
                        |{coursesOnTable[d+s].name + '\n'}
                +if('!coursesOccupied.includes(d+s)')
                  #empty-timeslot-placeholder.opacity-40.h-12(class="{'yzn9'.includes(s)?'bg-gray-400':''}")


</template>
<script>
import {Page, Navbar, f7} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {Swiper, SwiperSlide} from 'framework7-svelte'
import {Icon, Button} from 'framework7-svelte'


import {onMount} from 'svelte'
import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';
import * as courseTimeLookup from '../assets/1092-time.json'
const coverflowEff = {rotate:10,stretch:0,depth:0,modifier:1,slideShadows:true}

const showingTimeslotRange = {f:2, t:2+13}
const globalUseClassicTimeslot = true
const showingWeekdays = ['1-Mon', '2-Tue', '3-Wed', '4-thR', '5-Fri', '6-Sat', '7-sUn']
const weekdaysShort = 'MTWRFSU'.split('')
const timeslotShort = 'yz1234n56789abcd'.slice(showingTimeslotRange.f, showingTimeslotRange.t)
const classicTimeslotShort = 'MNABCDXEFGHYIJKL'.slice(showingTimeslotRange.f, showingTimeslotRange.t)
const classicWeekdaysShort = '１２３４５６７'
const chineseWeekdays = '一二三四五六日'
const weekdayIndex = new Date().getDay()
const tsBegin = ['0600','0700','0800','0900','1010','1110','1220','0120','0220','0330','0430','0530','0630','0730','0830','0930'].slice(showingTimeslotRange.f, showingTimeslotRange.t)
let weekdayPerPage = 5
$: expanded = weekdayPerPage !== 3
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
      coursesOnTable[t.start] = {...t, obj: c, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
    })
  })

}

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

onMount(getCourses)

</script>
