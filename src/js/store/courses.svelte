<script context="module">
import {derived, get} from 'svelte/store';
import {newe3Cache, newe3UserConfig} from './e3Store.js'

export const derivedNameCourses = derived(newe3Cache, $newe3Cache => ($newe3Cache.allCourses??[])
    .map(
      c => ({...c, name: c.fullname.replace(c.shortname + '.', '').split(' ')[0]}
      )
))
export const courseIDs = derived(derivedNameCourses, $derivedNameCourses => $derivedNameCourses.map(c => c.id))
export const courseTTIDs = derived(derivedNameCourses, $derivedNameCourses => $derivedNameCourses.map(c => c.shortname))
export const courses = derived([derivedNameCourses, newe3UserConfig],
      ([$derivedNameCourses, $newe3UserConfig]) => $derivedNameCourses.filter(
          c => c.shortname.includes($newe3UserConfig.semester)
      )
)
</script>
