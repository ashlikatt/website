<script lang="ts">
    import HorizontalLine from "$lib/format/horizontalLine.svelte";
    import Rows from "$lib/format/rows.svelte";
    import Sized from "$lib/format/sized.svelte";

    export let consoleElement: HTMLParagraphElement | undefined = undefined;
    export let inputElement: HTMLInputElement | undefined = undefined;
</script>

<div>
    <Rows>
        <Sized size=9 padded>
            <p id="console" class="textoutput" bind:this={consoleElement} />
        </Sized>
        
        <Sized size=0>
            <HorizontalLine />
        </Sized>

        <Sized size=1 padded>
            <label>
                <input id="inputbox" class="cli" spellcheck="false" bind:this={inputElement} />
            </label>
        </Sized>
    </Rows>
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

    label {
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
        overflow:hidden;
        overflow-y:auto;
    }

    input {
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        width:100%;
        height:100%;

        background-color: $CONSOLE_INPUT_BACKGROUND_COLOR;
        color: $CONSOLE_INPUT_TEXT_COLOR;

        font-family: $GLOBAL_CODE_FONT;
        font-weight: $GLOBAL_CODE_FONT_WEIGHT;
        font-size: 1.2em;

        margin:0px;
        padding:10px 10px;

        overflow:hidden;
        overflow-y:auto;
        outline:none;

        border-style:hidden;
        border-radius: 4px;
    }
</style>