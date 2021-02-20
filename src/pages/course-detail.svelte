<template lang="pug">
  Page
    Navbar(backLink title="{theCourse.name}")
      Subnavbar
        Segmented(raised)
          Button(tabLinkActive tabLink="#homeworks") 作業
          Button(tabLink="#announcements") 公告
          Button(tabLink="#syllabus") 大綱
    Tabs
      Tab(tabActive id="homeworks")
        HomeworkView(filter!="{h => h.course.shortname === theCourse.shortname}")
      Tab(id="announcements")
        AnnouncementsView(filter!="{h => h.course.shortname === theCourse.shortname}")
      Tab(id="syllabus")
        iframe.w-full.h-screen(src="https://timetable.nycu.edu.tw/?r=main/crsoutline&Acy={year}&Sem={yearpart}&CrsNo={courseTTID}&lang=zh-tw")
</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {Subnavbar, Segmented, Button} from 'framework7-svelte'
import {Tabs, Tab, Block} from 'framework7-svelte'
import HomeworkView from '../components/homeworks-view.svelte'
import AnnouncementsView from '../components/announcements-view.svelte'
import {derivedNameCourses} from '../js/store/courses.svelte';
import {newe3UserConfig} from '../js/store/e3Store';

export let courseID = ''

$: theCourse = $derivedNameCourses.find( c => `${c.id}` === courseID )
$: semester = $newe3UserConfig.semester
$: year = semester.slice(0,3)
$: yearpart = semester.slice(3,4)
$: courseTTID = theCourse.shortname.replace(semester+'.','')
</script>
