<script lang="ts">
    export let size : string;
    export let padded : boolean = false;
</script>

<span style="flex:{size};{padded ? 'padding:10px;' : ''}">
    <slot />
</span>