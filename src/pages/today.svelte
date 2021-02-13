<template lang="pug">
  Page(name="today-page")
    Navbar(title="今日")

    .h-full.overflow-y-hidden
      BlockTitle 本日課程
      OneDayCoursesGantt

      BlockTitle 近期作業
      HomeworkGantt

      BlockTitle 近期公告
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
