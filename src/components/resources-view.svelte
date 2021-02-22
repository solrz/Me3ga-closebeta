<template lang="pug">
  List(ul="{false}")
    +await('e3api.getCourseResources(courseID)')
      Preloader
      +then('resources')
        +each('resources as r')
          ListGroup
            ListItem(groupTitle title="{r.name}")
            +each('r.contents as f')
              ListItem
                Link(href="{f.fileurl.replace('forcedownload=1','')}token={$newe3Config.token}"
                  external target="_blank").w-full {f.filename}
                i.f7-icons.person(slot="media").opacity-60 doc_fill

      +catch('err')
        BlockTitle(large) 出錯了！請稍後再試
        Block {err}



</template>
<script>
import {List, ListItem, ListGroup, AccordionContent} from 'framework7-svelte'
import {Preloader} from 'framework7-svelte'
import {BlockTitle, Block} from 'framework7-svelte'
import {Navbar, Searchbar} from 'framework7-svelte'
import {Link, Icon} from 'framework7-svelte'
import {e3api} from '../js/api/e3Api.svelte'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';

export let courseID = 0
function getDeps(members){
  const deps = {}
  members.forEach(m => deps[getDep(m)] = [])
  members.forEach(m => deps[getDep(m)].push(m))
  return Object.entries(deps)
}
function getDep(m){
  return m.fullname.replace(m.fullname.split(' ').pop(), '')
}
function getMemberRoles(m){
  const beginPattern = '{mlang zh_tw}';
  const endPattern = '{mlang}';
  return m.roles.map(
      r => {
        const beginIndex = r.name.indexOf(beginPattern) + beginPattern.length;
        const endIndex = r.name.indexOf(endPattern)
        return r.name.slice(beginIndex, endIndex);
      }).reduce((t, r) => `${t}, ${r}`)
}
</script>
