<div class="mainContainer">
    <div class="body">
        <slot />
    </div>
</div>

<style lang="scss">
    @import "./palette.scss";

    .body {
        background-color: #333;
        border-radius: 4px;
        margin: 2% 5%;
        padding: 10px;
        box-shadow: 1px 1px 5px 5px #222;
        flex-grow: 1;
        height:100%;
        display:flex;
        flex-direction: column;
    }

    .mainContainer {
        margin: 0px;
        padding: 0px;
        height: 100vh;
        display:flex;
        flex-direction: column;
    }

    :global(html) {
        scrollbar-color: #B00 #500;
        background-color: #222;
        margin: 0px;
        padding: 0px;

        background-image: url("$lib/assets/backdrop.png");
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
        background-color: #500;
    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: #B00;
    }
</style>