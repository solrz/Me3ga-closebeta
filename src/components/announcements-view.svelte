<template lang="pug">
  +if('announcements.length !== 0')
    List(accordionList inset)
      +each('announcements as a')
        ListItem(accordionItem onAccordionOpen!="{() => onSelect(a)}",
          header="{a.course.name}",
          title="{a.name}",
          footer="{`公告於 ${date.format(new Date(a.created*1000-1), 'M/D')}`}")
          AccordionContent
            Block.bg-gray-100.rounded()
              |{@html a.message.replace('<a href','<a class="link external" external="true" target="_blank" href') }
              Link(href="/course/{a.course.id}/").font-serif   前往課程 ->
          div(slot="after")
            +if('!$newe3UserConfig.readAnnouncements.includes(a.id)')
              span(transition:scale).badge.color-red new
    +else()
      BlockTitle() 沒有公告，老師無話可說 >：(
</template>
<script>
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Panel, Block, BlockFooter, BlockTitle} from 'framework7-svelte'
import {Link, Preloader} from 'framework7-svelte'
import {scale} from 'svelte/transition'

import date from 'date-and-time'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
export let filter = (h) => true
$: announcementsSrc = ($newe3Cache.discussions ?? []).sort((a,b) => b.created - a.created)
$: announcementsCount = announcementsSrc.length
let currentAnnouncementsCount = announcementsCount
let announcements = ($newe3Cache.discussions ?? []).sort((a,b) => b.created - a.created).filter(filter)
$: if ($newe3Config.token && currentAnnouncementsCount !== announcementsCount){
  refresh()
  announcementsCount = announcementsSrc.length
}

export function onSelect(a) {
  $newe3UserConfig.readAnnouncements = [...$newe3UserConfig.readAnnouncements, a.id]
  // f7.panel.open("#panel-nested", true)
}

export function readAll() {
  console.log('hi')
  $newe3UserConfig.readAnnouncements = [...$newe3UserConfig.readAnnouncements, ...announcements.map(h => h.id)]
}

export function refresh(){
   announcements = ($newe3Cache.discussions ?? []).sort((a,b) => b.created - a.created).filter(filter)

}
</script>
