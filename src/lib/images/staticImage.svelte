<script lang="ts">
    export let src: string;
    export let alt: string;
    export let title: string;
    export let height: string;
</script>

<img {src} {alt} {title} style="top:{height}" />

<style lang="scss">
    img {
        position: absolute;
        max-width: 20%;
        max-height: 300px;
        right: 20px;
    }
</style>