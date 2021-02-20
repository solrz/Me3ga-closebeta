<template lang="pug">
  BlockTitle().font-serif 嘿 {$newe3Cache.userInfo.fullname.replace($newe3Cache.userInfo.department+' ','')}！{noewBonjour}
  Block.font-serif
    span
    |週{chineseWeekdays[weekdayIndex]}
    span 第 {nowTimeslot}
</template>
<script>
import {newe3Cache} from "../js/store/e3Store";
import {BlockTitle, Block} from 'framework7-svelte'
import date from 'date-and-time'
const weekdayIndex = new Date().getDay()
const weekdays = 'UMTWUFS'
const chineseWeekdays = '日一二三四五六'
const timeslotsTableRaw = [
    's00000050',
    't01000150',
    'u02000250',
    'v03000350',
    'w04000450',
    'x05000550',
    'y06000650',
    'z07000750',
    '108000850',
    '209000950',
    '310101100',
    '411101200',
    'n12201310',
    '513201410',
    '614201510',
    '715301620',
    '816301720',
    '917301820',
    'a18301920',
    'b19302020',
    'c20302120',
    'd21302220',
    'e22302320',
    'f23302359',
]
const bonjourText = {
  '猜猜誰會在三點吃客院早餐？': 'stuv',
  '喝城隍廟雞湯囉！': 'wx',
  '日出即將從天而降！': 'yz',
  '早八洞洞，大一起床！': '1',
  '早上起來上早九！': '234',
  '今日運勢：宜吃The Loft！': 'n',
  '睡午覺辣哪次不睡？': '5678',
  '衝巨城！': '9abcd',
  '有人作業Deadline要到囉！': 'ef',
}
$: nowTimeslot = getTimeslotNow()
$: noewBonjour = getBoujour()
const timeslotsTable = new Map(timeslotsTableRaw.map(s => [s[0], {
  f:parseInt(s.slice(1, 1 + 4)),
  t:parseInt(s.slice(5, 5 + 4))}])
)
function getTimeslotNow(){
  const currentTime = date.format(new Date(), 'HHmm')
  console.log(currentTime)
  for (const [symbol, duration] of timeslotsTable) {
    if(duration.f <=currentTime && currentTime < duration.t){
      return symbol+' 節'
    }
    if(currentTime < duration.f){
      return symbol+' 節 開始前下課'
    }
    console.log(JSON.stringify(duration), symbol)
  }
  return 'WTF'
}
function getBoujour(){
  const currentTime = parseInt(`${new Date().getHours()}${new Date().getMinutes()}`)
  for (const [symbol, duration] of Object.entries(bonjourText)) {
    if(duration.includes(nowTimeslot[0])){
      return symbol
    }
  }
  return 'WTF'
}
</script>
