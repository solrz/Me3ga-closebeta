<template lang="pug">
  Page(name="today-page")
    Navbar(title="今日")

    .h-full.overflow-y-hidden
      BlockTitle 本日課程
      Card.overflow-x-scroll
        OneDayCoursesGantt

      BlockTitle 近期作業
      Card(class="h-1/4").overflow-y-scroll
        HomeworkGantt

      BlockTitle 近期公告
      Card(class="h-1/4").overflow-y-scroll
        AnnouncementList

</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {BlockTitle, Block} from 'framework7-svelte'

import OneDayCoursesGantt from '../components/one-day-courses-gantt.svelte'
import AnnouncementList from '../components/announcement-list.svelte'
import HomeworkGantt from '../components/homework-gantt.svelte'
</script>
