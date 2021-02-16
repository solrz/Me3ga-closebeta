<template lang="pug">
  List.overflow-y-scroll
      +each('announcements as a')
        ListItem
          h3 Hi

</template>
<script>
import {BlockTitle, Block} from 'framework7-svelte'
import {List, ListItem} from 'framework7-svelte'

import {e3Network} from "../js/api/e3Api";
import qs from "qs";
import {onMount} from "svelte";
import {newe3Config, newe3Cache} from '../js/store/e3Store.js';

const semester = '1091'
$: announcements = ($newe3Cache.disscussions??[])
</script>
