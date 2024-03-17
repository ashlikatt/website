<div class="col">
    <slot />
</div>

<style lang="scss">
    .col {
        display:inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        width: 100%;
        height: 100%;
    }

    .col > :global(*) {
        display:inline-block;
        flex: 1;
    }
</style>