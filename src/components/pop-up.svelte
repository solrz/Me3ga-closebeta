<!-- Views/Tabs container -->
<template lang="pug">
    Popup#my-popup
        View
            Page
                Navbar(title="Popup")
                    NavRight
                        Link(popupClose) Close
                Block
                    p Content

</template>

<script>
    import { onMount } from 'svelte';

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


</script>
