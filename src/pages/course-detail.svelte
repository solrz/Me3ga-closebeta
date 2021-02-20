<template lang="pug">
  Page
    Navbar(backLink title="{theCourse.name}")
      Subnavbar
        Segmented(raised)
          Button(tabLink="#a") a
          Button(tabLink="#b") b
    Tabs
      Tab(id="a")
        Block HI a
      Tab(id="b")
        Block HI
    p {courseID}
    p
</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {Subnavbar, Segmented, Button} from 'framework7-svelte'
import {Tabs, Tab, Block} from 'framework7-svelte'

import {derivedNameCourses} from '../js/store/courses.svelte';

export let courseID = ''

$: theCourse = $derivedNameCourses.find( c => `${c.id}` === courseID )

</script>
