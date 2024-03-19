<span><slot /></span>

<style lang="scss">
    @import "../palette.scss";

    span {
        background-color: $INLINE_CODEBOX_BACKGROUND_COLOR;
        color: $INLINE_CODEBOX_TEXT_COLOR;
        font-family: $GLOBAL_CODE_FONT;
        font-weight: $GLOBAL_CODE_FONT_WEIGHT;
        padding: 0px 4px 0px 4px;
        margin: 2px 2px 2px 2px;

        border-radius: 4px;
    }
</style>