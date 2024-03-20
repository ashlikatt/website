<script lang="ts">
    import Pad from "$lib/text/pad.svelte";

    export let consoleElement: HTMLParagraphElement | undefined = undefined;
</script>

<div>
    <p id="console" class="textoutput" bind:this={consoleElement} />
</div>

<style lang="scss">
    @import "../palette.scss";

    div {
        resize:none;
        padding: 0px 0px;
        margin: 0px 0px;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        min-width: 100%;
        min-height: 100%;
        max-width:100%;
        max-height:100%;
        width:0px;
        height: 0px;
        background-color: $CONSOLE_BACKGROUND_COLOR;
        border:none;
        overflow:hidden;
        overflow-y:auto;

        border-radius: 4px;
    }

    p {
        resize:none;
        padding: 10px 5px;
        margin: 0px 0px;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        min-width: 100%;
        min-height: 100%;
        max-width:100%;
        max-height:100%;
        width:0px;
        height: 0px;
        color: $CONSOLE_TEXT_COLOR;
        overflow:hidden;
        overflow-y:auto;

        font-family: $GLOBAL_CODE_FONT;
        font-weight: $GLOBAL_CODE_FONT_WEIGHT;
        font-size: 1em;
    }
</style>