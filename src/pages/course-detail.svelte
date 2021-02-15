<template lang="pug">
  Page
    Navbar(backLink title="{theCourse.fullname}")
    p {courseID}
    p
</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {newe3Cache} from "../js/store/e3Store";

export let courseID = ''

$: theCourse = $newe3Cache.allCourses.find( c => `${c.id}` === courseID )

</script>
