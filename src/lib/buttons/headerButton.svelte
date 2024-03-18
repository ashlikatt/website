<script lang="ts">
    export let href: string;
</script>

<a {href}>
    <button>
        <slot />
    </button>
</a>

<style lang="scss">
    @import "../palette.scss";

    button {
        background: none;
        border:none;
        padding: 0.75%;

        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 25px;
        color: $SECTION_BUTTON_TEXT_COLOR;
        text-align:center;
        text-decoration: none;


        border-bottom-color: $SECTION_BUTTON_BORDER_COLOR;
        border-bottom-width: 1%;
        border-bottom-style:solid;
        
        transition:0.1s;

        float:right;
        margin-left:10px;
    }

    button:hover {
        cursor:pointer;
        background-color: $SECTION_BUTTON_BORDER_COLOR;
        transition:0.1s;
    }
</style>