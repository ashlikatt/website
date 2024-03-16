<p>
    <slot />
</p>

<style lang="scss">
    @import "../palette.scss";

    p {
        color: $BODY_TEXT;
        font-family: 'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 20px;
        text-align:left;
        padding:1%;
        border-left-color: $BODY_LINE_COLOR;
        border-left-width: 1%;
        border-left-style: solid;
        margin-left: 1%;
        width:75%;
    }

    p :global(a) {
        color: $LINK_COLOR;
        text-decoration: underline;
    }
</style>