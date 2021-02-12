<template lang="pug">
  Page(name="today-page")
    Navbar(title="今日")
    BlockTitle 本日課程
    OneDayCoursesGantt

    BlockTitle 近期公告
    List
     ListItem 老師出差

</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {BlockTitle, Block} from 'framework7-svelte'
import {List, ListItem} from 'framework7-svelte'

import OneDayCoursesGantt from '../components/one-day-courses-gantt.svelte'

</script>
