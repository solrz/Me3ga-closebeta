<template lang="pug">
  Page
    Navbar(title="所有作業")
      button(slot="right" on:click="{readAll}") 全部已讀
    List(accordionList inset)
      +each('homeworks as h')
        ListItem(accordionItem onAccordionOpen!="{() => onSelect(h)}",
          header="{h.courseName}",
          title="{h.name}",
          footer="{`至 ${date.format(new Date(h.duedate*1000-1), 'M/D hh:mm')} 截止`}")
          AccordionContent
            Block.bg-gray-50.rounded() {@html h.intro.length !== 0 ? h.intro : '老師很懶，spec自己想'}
          div(slot="after")
            +if('!$newe3UserConfig.readHomeworks.includes(h.id)')
              span(transition:scale).badge.color-red new
</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Panel, Block} from 'framework7-svelte'

import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import date from 'date-and-time'

import {scale} from 'svelte/transition'

$: homeworks = ($newe3Cache.homeworks ?? []).filter(
    h => h.course.shortname.includes($newe3UserConfig.semester+'.')
).sort((a,b) => b.duedate - a.duedate)
function onSelect(homework) {
  $newe3UserConfig.readHomeworks = [...$newe3UserConfig.readHomeworks, homework.id]
  // f7.panel.open("#panel-nested", true)
}

function readAll() {
  console.log('hi')
  $newe3UserConfig.readHomeworks = [...$newe3UserConfig.readHomeworks, homeworks.map(h => h.id)]

}
</script>
