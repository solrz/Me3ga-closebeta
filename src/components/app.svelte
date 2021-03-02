<App { ...f7params }>
<template lang="pug">
  LoginScreen.e3-login-page
    LoginScreenContent
  TabView

</template>
</App>
<script>
import {onMount} from 'svelte';
import TabView from './tab-view.svelte'
import LoginScreenContent from '../components/login-screen.svelte'
import {newe3Config, newe3Cache, newe3UserConfig} from '../js/store/e3Store.js';
import {e3api} from '../js/api/e3Api.svelte'
newe3Config.useLocalStorage();
newe3Cache.useLocalStorage();
newe3UserConfig.useLocalStorage();


import {
  f7,
  f7ready,
  App,
  LoginScreen,
} from 'framework7-svelte';


import routes from '../js/routes';
import store from '../js/store';

// Framework7 Parameters
let f7params = {
  name: 'NCTU-MEGA', // App name
  theme: 'auto', // Automatic theme detection
  store: store,
  routes: routes,
  serviceWorker: {
    path: '/service-worker.js',
  },
};

// import * as firebase from 'firebase/app'
onMount(() => {
  f7ready(() => {
    if(!$newe3Config.token){
      f7.loginScreen.open('.e3-login-page', true)
    }else{
      e3api.refreshCache()
    }
  });
})

</script>
<style global lang="postcss">

/* only apply purgecss on utilities, per Tailwind docs */
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;

</style>
