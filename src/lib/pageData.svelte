<script lang="ts">
	import { page } from '$app/stores';
    
    export let title : string = "Ashli's Site";
    export let ogTitle : string = title;
    export let desc : string = "";
</script>

<svelte:head>
    <meta name="author" content="Ashli Katt">
    <meta property="og:url" content="{$page.url.pathname}" />
    <meta content="%sveltekit.assets%/favicon.png" property="og:image" />
    <meta content="#FF8888" data-react-helmet="true" name="theme-color" />

	<title>{title}</title>
	<meta content={ogTitle} property="og:title" />
	<meta content={desc} property="og:description" />
</svelte:head>