<script lang="ts">
    import { page } from "$app/stores";
	import HeaderButton from "$lib/buttons/headerButton.svelte";

	import Body from "$lib/core/body.svelte";
	import PageData from "$lib/core/pageData.svelte";
	import Header from "$lib/header/header.svelte";
	import Paragraph from "$lib/text/paragraph.svelte";

    import img_err from "$lib/assets/noway.gif";
	import Johnvertisement from "$lib/images/johnvertisement.svelte";
</script>

<PageData title="Error!" desc="Error page lol" />

<Body>
    <Header title="404: Page Not Found">
        <HeaderButton href="">Home</HeaderButton>
    </Header>
    <Paragraph>
        If you wound up here by normal means, please contact Ashli~!<br>
        Otherwise just head back to the main page!
    </Paragraph>

    <div>
        <img src={img_err} alt="Man freaks out" title="smh"/><br><br><br>
    </div>

    <Johnvertisement />
</Body>

<style lang="scss">
    div {
        text-align: center;
    }

    img {
        max-width: 30%;
        max-height: 500px;
    }
</style>