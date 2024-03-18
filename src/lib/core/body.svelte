<div class="mainContainer">
    <div class="body">
        <slot />
    </div>
</div>

<style lang="scss">
    @import "../palette.scss";

    .body {
        background-color: $BODY_BACKGROUND_COLOR;
        border-radius: 4px;
        margin: 2% 5%;
        padding: 10px;
        box-shadow: 1px 1px 5px 5px $BODY_SHADOW_COLOR;
    }

    .mainContainer {
        margin: 0px;
        padding: 0px;
    }

    :global(html) {
        scrollbar-color: $SCROLLBAR_THUMB_COLOR $SCROLLBAR_TRACK_COLOR;
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