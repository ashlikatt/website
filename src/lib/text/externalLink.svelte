<script lang="ts">
    export let href: string;
</script>

<a rel="external" {href} target="_blank">
    <slot />    
</a>

<style lang="scss">
    @import "../palette.scss";

    a::before {
        content: "";
        background-image: url("$lib/assets/external_link.png");
        background-size: cover;
        width: 16px;
        height: 16px;
        margin-right: 5px;
        display:inline-block;
    }

    a {
        color: $LINK_COLOR;
        text-decoration: underline;
    }
</style>