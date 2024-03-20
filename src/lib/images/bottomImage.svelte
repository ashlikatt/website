<script lang="ts">
    export let src: string;
    export let alt: string;
    export let title: string;
    export let x: string;
</script>

<img {src} {alt} {title} style="right:{x}" />

<style lang="scss">
    img {
        position: absolute;
        max-width: 60px;
        max-height: 60px;
        bottom: 0px;
    }
</style>