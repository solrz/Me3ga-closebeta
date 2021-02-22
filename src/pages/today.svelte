<template lang="pug">
  Page(name="today-page" ptr onPageMounted="{refresh}" onPtrRefresh="{refresh}")
    Navbar(title="今日")
    div
      TodaySummary

      BlockTitle.font-serif 本日課程
      Card
        OneDayCoursesGantt(bind:this="{componentOfOneDayCoursesGantt}")

      BlockTitle.font-serif 近期作業
      Card(class="h-1/4").overflow-y-scroll
        HomeworkGantt(bind:this="{componentOfHomeworkGantt}")

      BlockTitle.font-serif 近期公告
      Card(class="h-1/4").overflow-y-scroll
        AnnouncementList(bind:this="{componentOfAnnouncementList}"
          filter!="{a => !$newe3UserConfig.readAnnouncements.includes(a.id) && a.course.shortname.includes($newe3UserConfig.semester+'.')}")

</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {Row, Col} from 'framework7-svelte'
import {Card, CardHeader, CardContent, Link} from 'framework7-svelte'
import {BlockTitle, Block} from 'framework7-svelte'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';

import OneDayCoursesGantt, {getCourses} from '../components/one-day-courses-gantt.svelte'
import AnnouncementList from '../components/announcements-view.svelte'
import HomeworkGantt from '../components/homework-gantt.svelte'
import TodaySummary from '../components/today-summary.svelte'

let componentOfOneDayCoursesGantt, componentOfHomeworkGantt, componentOfAnnouncementList;
$: semester = $newe3UserConfig.semester

function refresh(done) {
  Promise.all([
    componentOfOneDayCoursesGantt.getCourses(),
    componentOfHomeworkGantt.getHomeworks(),
    componentOfAnnouncementList.getForums()
  ]).then(() => done())
}
</script>
