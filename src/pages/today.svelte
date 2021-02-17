<template lang="pug">
  Page(name="today-page" ptr onPageMounted="{refresh}" onPtrRefresh="{refresh}")
    Navbar(title="今日")
    div
      TodaySummary

      BlockTitle.font-serif 本日課程
      Card.overflow-x-scroll
        OneDayCoursesGantt(bind:this="{componentOfOneDayCoursesGantt}")

      BlockTitle.font-serif 近期作業
      Card(class="h-1/4").overflow-y-scroll
        HomeworkGantt(bind:this="{componentOfHomeworkGantt}")

      BlockTitle.font-serif 近期公告
      Card(class="h-1/4").overflow-y-scroll
        AnnouncementList(bind:this="{componentOfAnnouncementList}")

</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {BlockTitle, Block} from 'framework7-svelte'

import OneDayCoursesGantt, {getCourses} from '../components/one-day-courses-gantt.svelte'
import AnnouncementList from '../components/announcement-list.svelte'
import HomeworkGantt from '../components/homework-gantt.svelte'
import TodaySummary from '../components/today-summary.svelte'

let componentOfOneDayCoursesGantt, componentOfHomeworkGantt, componentOfAnnouncementList;

function refresh(done) {
  Promise.all([
    componentOfOneDayCoursesGantt.getCourses(),
    componentOfHomeworkGantt.getHomeworks(),
    componentOfAnnouncementList.getForums()
  ]).then(() => done())
}
</script>
