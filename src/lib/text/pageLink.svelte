<script lang="ts">
    export let href: string;
</script>

<a {href} target="_blank" rel="canonical">
    <slot />
</a>

<style lang="scss">
    @import "../palette.scss";

    a {
        color: $LINK_COLOR;
        text-decoration: underline;
    }
</style>