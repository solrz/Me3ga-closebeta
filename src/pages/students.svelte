<template lang="pug">
  Page
    Navbar(title="所有學生")
    List(accordionList inset)
      +each('$courses as c')
        ListItem(accordionItem,
          title="{c.name}",
          footer="{c.enrolledstudents}")
          AccordionContent
            List
              //+await('e3api.getStudents(c.id)')
              //  +then('students')
              //    ListItem Hi
</template>
<script>
import {Page, Navbar} from 'framework7-svelte'
import {List, ListItem, ListGroup, AccordionContent} from 'framework7-svelte'
import {Panel, Block} from 'framework7-svelte'

import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import {e3api} from '../js/api/e3Api.svelte'
import {courses} from '../js/store/courses.svelte';
import date from 'date-and-time'

import {scale} from 'svelte/transition'

</script>
