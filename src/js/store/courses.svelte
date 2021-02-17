<script context="module">
import {derived, get} from 'svelte/store';
import {newe3Cache, newe3UserConfig} from './e3Store.js'

export let derivedNameCourses = derived(newe3Cache, $newe3Cache => ($newe3Cache.allCourses??[])
    .map(
      c => ({...c, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
      )
))
export let courseIDs = derived(derivedNameCourses, $derivedNameCourses => $derivedNameCourses.map(c => c.id))
export let courses = derived(derivedNameCourses,
      $derivedNameCourses => $derivedNameCourses.filter(
          c => c.fullname.includes(get(newe3UserConfig).semester)
      )
)
</script>
