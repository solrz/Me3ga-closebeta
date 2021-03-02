<template lang="pug">
  +if('homeworks.length !== 0')
    List(accordionList inset)
      +each('homeworks as h')
        ListItem(accordionItem onAccordionOpen!="{() => onSelect(h)}",
          header="{h.courseName}",
          title="{h.name}",
          footer="{`至 ${date.format(new Date(h.duedate*1000-1), 'M/D hh:mm')} 截止`}")
          AccordionContent
            Block.bg-gray-100.rounded.break-words
              |{@html (h.intro??'').length !== 0 ? h.intro.replace('<a href','<a class="link external" external="true" target="_blank" href') : '作業規定要自己腦補啊，怎麼會叫老師想呢？'}
              +each('h.introattachments??[] as a')
                ListItem.bg-gray-50
                  Link(href="{a.fileurl.replace('forcedownload=1','')}?token={$newe3Config.token}"
                    external target="_blank").text-center.w-full {a.filename}
                  i.f7-icons.person(slot="media").opacity-60 doc_fill
          div(slot="after")
            +if('!$newe3UserConfig.readHomeworks.includes(h.id)')
              span(transition:scale).badge.color-red new
    +else()
      Block(inset) 沒有作業，交作業大學感到 氣PuiPui >＝(
</template>
<script>
import {List, ListItem, AccordionContent} from 'framework7-svelte'
import {Panel, Block} from 'framework7-svelte'
import {Link, Icon} from 'framework7-svelte'
import {scale} from 'svelte/transition'

import date from 'date-and-time'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
export let filter = (h) => true
$: homeworks = ($newe3Cache.homeworks ?? []).filter(
    filter
).sort((a,b) => a.duedate - b.duedate)
function onSelect(homework) {
  $newe3UserConfig.readHomeworks = [...$newe3UserConfig.readHomeworks, homework.id]
  // f7.panel.open("#panel-nested", true)
}

export function readAll() {
  console.log('hi')
  $newe3UserConfig.readHomeworks = [...$newe3UserConfig.readHomeworks, ...homeworks.map(h => h.id)]
}
</script>
