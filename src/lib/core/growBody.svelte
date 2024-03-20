<div class="mainContainer">
    <div class="body">
        <slot />
    </div>
</div>

<style lang="scss">
    @import "../palette.scss";

    .body {
        background-color: $BODY_BACKGROUND_COLOR;
        margin: 2% 5%;
        padding: 10px;
        border-width: 8px;
        border-color: $BODY_BACKGROUND_COLOR_ALT;
        border-style:double;
        box-shadow: 15px 15px #00000033;
        flex-grow: 1;
        height:100%;
        display:flex;
        flex-direction: column;
        position: relative;
    }

    .mainContainer {
        
        margin: 0px;
        padding: 0px;
        height: 100vh;
        display:flex;
        flex-direction: column;
    }

    :global(html) {
        scrollbar-color: $SCROLLBAR_THUMB_COLOR $SCROLLBAR_TRACK_COLOR;
        scrollbar-width: 12px;
        background-color: $PAGE_BACKGROUND_FALLBACK_COLOR;
        margin: 0px;
        padding: 0px;

        background-image: $PAGE_BACKGROUND_URL;
    }

    :global(body) {
        margin: 0px;
        padding: 0px;
    }

    :global(::-webkit-scrollbar) {
        height:12px;
        width:6px;
    }

    :global(::-webkit-scrollbar-track) {
        background-color: $SCROLLBAR_TRACK_COLOR;
    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: $SCROLLBAR_THUMB_COLOR;
    }
</style>