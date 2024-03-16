<div class="row">
    <slot />
</div>

<style lang="scss">
    .row {
        display:inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        width: 100%;
        height: 100%;
    }

    .row > * {
        display:inline-block;
        flex: 1;
    }
</style>