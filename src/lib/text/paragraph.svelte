<p>
    <slot />
</p>

<style lang="scss">
    @import "../palette.scss";

    p {
        color: $PARAGRAPH_TEXT_COLOR;
        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 20px;
        text-align:left;
        padding:1%;
        border-left-color: $PARAGRAPH_LINE_COLOR;
        border-left-width: 1%;
        border-left-style: solid;
        margin-left: 1%;
        margin-bottom: 3em;
        width:75%;
    }

    p :global(a) {
        color: $LINK_COLOR;
        text-decoration: underline;
    }
</style>