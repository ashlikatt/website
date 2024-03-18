<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

    export let click: MouseEventHandler<HTMLButtonElement>;
    export let element: HTMLButtonElement | null = null;
</script>

<button on:click={click} bind:this={element}>
    <span><slot /></span>
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

    button:global(.disabled) {
        opacity: 0.6;
    }

    button:global(.disabled):hover {
        cursor: not-allowed;
    }

    button:global(.warning) {
        border-color: #AA5;
        color: #EE9;
        text-decoration-line:line-through;
    }

    button:global(.warning):hover {
        background-color: #AA5;
    }
</style>