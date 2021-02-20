<template lang="pug">
  Page
    Navbar(title="所有作業")
      div(slot="right")
        Button(on:click="{view.readAll}") 全部已讀
    HomeworkView(bind:this="{view}" filter!="{h => h.course.shortname.includes(semester+'.')}")
</template>
<script>
import {Page, PageContent, Navbar} from 'framework7-svelte'
import {Button} from 'framework7-svelte'
import HomeworkView from '../components/homeworks-view.svelte'
import {newe3UserConfig} from '../js/store/e3Store'
$: semester = $newe3UserConfig.semester
let view;
</script>
