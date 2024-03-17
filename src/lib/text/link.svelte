<script lang="ts">
    export let href: string;
</script>

<a {href} rel="canonical">
    <slot />
</a>

<style lang="scss">
    @import "../palette.scss";

    a {
        color: $LINK_COLOR;
        text-decoration: underline;
    }
</style>