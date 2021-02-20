<template lang="pug">
  +if('announcements.length !== 0')
    List(accordionList inset)
      +each('announcements as a')
        ListItem(accordionItem onAccordionOpen!="{() => onSelect(a)}",
          header="{a.course.name}",
          title="{a.name}",
          footer="{`公告於 ${date.format(new Date(a.created*1000-1), 'M/D')}`}")
          AccordionContent
            Block.bg-gray-50.rounded() {@html a.message}
          div(slot="after")
            +if('!$newe3UserConfig.readAnnouncements.includes(a.id)')
              span(transition:scale).badge.color-red new
    +else()
      Block(inset) 沒有公告，老師無話可說 >：(
</template>
<script>
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Panel, Block} from 'framework7-svelte'
import {scale} from 'svelte/transition'

import date from 'date-and-time'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
export let filter = (h) => true
$: announcements = ($newe3Cache.discussions ?? []).filter(
    filter
).sort((a,b) => b.duedate - a.duedate)
export function onSelect(homework) {
  $newe3UserConfig.readAnnouncements = [...$newe3UserConfig.readAnnouncements, announcements.id]
  // f7.panel.open("#panel-nested", true)
}

export function readAll() {
  console.log('hi')
  $newe3UserConfig.readAnnouncements = [...$newe3UserConfig.readAnnouncements, ...announcements.map(h => h.id)]
}
</script>
