<App { ...f7params }>
    <template lang="pug">

        PopUp
        LoginScreenPage
        TabView
    </template>
</App>
<script>
    import {onMount} from 'svelte';
    import TabView from './tab-view.svelte'
    import LoginScreenPage from './login-screen.svelte'
    import PopUp from './pop-up.svelte'
    import {newe3Config} from '../js/store/e3.js';

    newe3Config.useLocalStorage();
    import {
        f7,
        f7ready,
        App,
        Panel,
        Views,
        View,
        Popup,
        Page,
        Navbar,
        Toolbar,
        NavRight,
        Link,
        Block,
        BlockTitle,
        LoginScreen,
        LoginScreenTitle,
        List,
        ListItem,
        ListInput,
        ListButton,
        BlockFooter
    } from 'framework7-svelte';


    import routes from '../js/routes';
    import store from '../js/store';


    // Framework7 Parameters
    let f7params = {
        name: 'make-E3-great-again', // App name
        theme: 'auto', // Automatic theme detection


        // App store
        store: store,
        // App routes
        routes: routes,
        // Register service worker
        serviceWorker: {
            path: '/service-worker.js',
        },
    };
    // Login screen demo data
    let username = '';
    let password = '';

    function alertLoginData() {
        f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
            f7.loginScreen.close();
        });
    }

    onMount(() => {
        f7ready(() => {


            // Call F7 APIs here
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
