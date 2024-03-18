<script>
	import Sized from "$lib/format/sized.svelte";
</script>

<noscript>
    <span>
        <Sized size=1 padded>
            JavaScript is disabled. This page may not work correctly.
        </Sized>
    </span>
</noscript>

<style lang="scss">
    @import "../palette.scss";

    span {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        -webkit-flex-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        display: flexbox;
        justify-content: center; /* Align horizontal */
        align-items: center; /* Align vertical */
        background-color: $NOSCRIPT_WARNING_BACKGROUND_COLOR;
        color: $WHITE;
        font-family: $GLOBAL_FONT;
        font-size: 200%;
    }
</style>