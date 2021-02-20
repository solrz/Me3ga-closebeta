<template lang="pug">
  +if('homeworks.length !== 0')
    List(accordionList inset)
      +each('homeworks as h')
        ListItem(accordionItem onAccordionOpen!="{() => onSelect(h)}",
          header="{h.courseName}",
          title="{h.name}",
          footer="{`至 ${date.format(new Date(h.duedate*1000-1), 'M/D hh:mm')} 截止`}")
          AccordionContent
            Block.bg-gray-50.rounded() {@html h.intro.length !== 0 ? h.intro : '老師很懶，作業內容請腦補'}
          div(slot="after")
            +if('!$newe3UserConfig.readHomeworks.includes(h.id)')
              span(transition:scale).badge.color-red new
    +else()
      Block(inset) 沒有作業，硬課氣噗噗 >＝(
</template>
<script>
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Panel, Block} from 'framework7-svelte'
import {scale} from 'svelte/transition'

import date from 'date-and-time'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
export let filter = (h) => true
$: homeworks = ($newe3Cache.homeworks ?? []).filter(
    filter
).sort((a,b) => b.duedate - a.duedate)
function onSelect(homework) {
  $newe3UserConfig.readHomeworks = [...$newe3UserConfig.readHomeworks, homework.id]
  // f7.panel.open("#panel-nested", true)
}

export function readAll() {
  console.log('hi')
  $newe3UserConfig.readHomeworks = [...$newe3UserConfig.readHomeworks, ...homeworks.map(h => h.id)]
}
</script>
