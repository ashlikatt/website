<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

    export let click: MouseEventHandler<HTMLButtonElement>;
</script>

<button on:click={click}>
    <slot />
</button>

<style lang="scss">
    @import "../palette.scss";

    button {
        background: none;
        border:none;
        padding: 0.75%;

        font-family:'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 25px;
        color: $IMPORTANT_TEXT;
        text-align:center;
        text-decoration: none;


        border-color: $TEXT_ACCENT;
        border-width: 1%;
        border-style:solid;
        
        display:inline-block;
        transition:0.1s;

        width: 100%;
        height: 100%;
    }

    button:hover {
        cursor:pointer;
        background-color: $TEXT_ACCENT;
        transition:0.1s;
    }
</style>