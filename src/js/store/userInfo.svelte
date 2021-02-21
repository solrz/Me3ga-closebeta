<script context="module">
import {derived, get} from 'svelte/store';
import {newe3Cache, newe3UserConfig, newe3Config} from './e3Store.js'


export const userInfo = derived(newe3Cache, $newe3Cache => $newe3Cache.userInfo)
export const studentID = derived(newe3Config, $newe3Config => $newe3Config.studentID)
export const token = derived(newe3Config, $newe3Config => $newe3Config.token)
export const e3ID = derived(newe3Config, $newe3Config => $newe3Config.e3ID)
</script>
