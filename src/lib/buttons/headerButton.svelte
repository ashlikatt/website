<button>
    <slot />
</button>

<style lang="scss">
    @import "../palette.scss";

    button {
        background: none;
        border:none;
        padding: 0.75%;

        font-family:'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 25px;
        color: $IMPORTANT_TEXT;
        text-align:center;
        text-decoration: none;


        border-bottom-color: $TEXT_ACCENT;
        border-bottom-width: 1%;
        border-bottom-style:solid;
        
        transition:0.1s;

        float:right;
        margin-left:10px;
    }

    button:hover {
        cursor:pointer;
        background-color: $TEXT_ACCENT;
        transition:0.1s;
    }
</style>