<h2>
    <slot />
</h2>

<style lang="scss">
    @import "../palette.scss";

    h2 {
        display:inline;
        color:#F88;
        font-family:'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 40px;
        text-align:left;
        padding-left:1%;
        padding-right:1%;
        font-size: 25px;
    }

    h2::before {
        content: '\00bb  ';
        color: $SECTION_ARROW_COLOR;
    }
</style>