<script lang="ts">
    export let id: string;
    export let init: string;

    export let element: HTMLTextAreaElement | undefined = undefined;
</script>

<textarea spellcheck="false" bind:this={element} {id}>{init}</textarea>

<style lang="scss">
    @import "../palette.scss";

    textarea {
        resize:none;
        padding: 10px 5px;
        margin: 0px 0px;
        overflow:hidden;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        width: 100%;
        height: 100%;
        background-color: $CODEBOX_BACKGROUND_COLOR;
        border:none;
        color: $CODEBOX_TEXT_COLOR;
        outline:none;
        overflow-y:auto;
        overflow-x:auto;

        font-family: $GLOBAL_CODE_FONT;
        font-weight: $GLOBAL_CODE_FONT_WEIGHT;
        font-size: 1rem;

        border-radius: 4px;
    }
</style>