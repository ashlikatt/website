<script lang="ts">
    export let title : string;
</script>

<div>
    <h1>
        {title}
    </h1>

    <slot />
</div>

<style lang="scss">
    @import "../palette.scss";

    h1 {
        display:inline;
        color:$HEADER_TEXT_COLOR;
        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 2.6rem;
        text-align:left;
        padding-left:1%;
        padding-right:1%;
        margin-bottom:0;
    }

    h1::before {
        content: '\00bb  ';
        color: $HEADER_ARROW_COLOR;
    }

    div {
        padding: 10px 10px;
    }
</style>