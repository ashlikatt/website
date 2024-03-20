<script lang="ts">
    export let value: string;
</script>

<p>
    { value.split("\n").map(x => x.trimStart().substring(1)).join("\n") }
</p>

<style lang="scss">
    @import "../palette.scss";

    p {
        display: block;
        background-color: $CODEBOX_BACKGROUND_COLOR;
        color: $CODEBOX_TEXT_COLOR;
        
        white-space: pre-wrap;
        width:100%;

        padding: 10px 10px;
        margin: 20px 0px;

        font-family: $GLOBAL_CODE_FONT;
        font-weight: $GLOBAL_CODE_FONT_WEIGHT;
        font-size: 1em;

        border-radius: 4px;
    }
</style>