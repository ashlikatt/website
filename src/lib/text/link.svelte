<script lang="ts">
    import { base } from "$app/paths";

    export let newPage : boolean = false;

    export let href: string;
</script>

<a href={`${base}/${href}`} rel="canonical" target={newPage ? "_blank" : "_self"}>
    <slot />
</a>

<style lang="scss">
    @import "../palette.scss";

    a {
        color: $LINK_COLOR;
        text-decoration: underline;
    }
</style>