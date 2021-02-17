<template lang="pug">
  Page
    Navbar(title="所有公告")
      button(slot="right" on:click="{readAll}") 全部已讀
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
</template>
<script>
import {f7} from 'framework7-svelte'
import {Page, Navbar} from 'framework7-svelte'
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Panel, Block} from 'framework7-svelte'
import {Link, Badge, Icon} from 'framework7-svelte'

import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import {scale} from 'svelte/transition'

import date from 'date-and-time'


function onSelect(announcement) {
  $newe3UserConfig.readAnnouncements = [...$newe3UserConfig.readAnnouncements, announcement.id]
  // f7.panel.open("#panel-nested", true)
}

function readAll() {
  console.log('hi')
  $newe3UserConfig.readAnnouncements = [...$newe3UserConfig.readAnnouncements, ...announcements.map(a => a.id)]

}

$: announcements = ($newe3Cache.discussions ?? []).filter(
    a => a.course.shortname.includes($newe3UserConfig.semester)
).sort((a, b) => (b.created - a.created))
</script>
