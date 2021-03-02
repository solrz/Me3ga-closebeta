<template lang="pug">
  Searchbar(type="text"
    searchContainer=".members-list"
    searchIn=".item-title")

  List.members-list.searchbar-found(mediaList ul="{false}")
    +await('e3api.getStudents(courseID)')
      Preloader
      +then('members')
        +each('getDeps(members) as [dep, depMembers]')
          ListGroup
            ListItem(groupTitle title="{dep}")
            +each('depMembers as m')
              ListItem(
                title="{m.fullname.split(' ').pop()}"
                subtitle="{getDep(m)}"
                text="{getMemberRoles(m)}")
                img(alt="avatar" slot="media" src="{m.profileimageurlsmall}" width="48").rounded-full
      +catch('err')
        BlockTitle(large) 出錯了！請稍後再試
        Block {err}

  List.searchbar-not-found
    ListItem(
      title="醒醒吧，大腿不會和你修同一門課的啦。"
      subtitle="林奇宏 校長 敬啟")


</template>
<script>
import {List, ListItem, ListGroup} from 'framework7-svelte'
import {Preloader} from 'framework7-svelte'
import {BlockTitle, Block} from 'framework7-svelte'
import {Navbar, Searchbar} from 'framework7-svelte'
import {e3api} from '../js/api/e3Api.svelte'
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
