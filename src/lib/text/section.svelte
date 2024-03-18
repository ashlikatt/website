<h2>
    <slot />
</h2>

<style lang="scss">
    @import "../palette.scss";

    h2 {
        display:inline;
        color:$SECTION_TEXT_COLOR;
        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 1.75rem;
        text-align:left;
        padding-left:1%;
        padding-right:1%;
        margin-top:0;
    }

    h2::before {
        content: '\00bb  ';
        color: $SECTION_ARROW_COLOR;
    }
</style>