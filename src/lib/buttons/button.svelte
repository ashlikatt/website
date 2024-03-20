<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

    export let click: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
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

        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 1.5rem;
        color: $BUTTON_TEXT_COLOR;
        text-align:center;
        text-decoration: none;


        border-color: $BUTTON_BORDER_COLOR;
        border-width: 1%;
        border-style:solid;
        
        display:inline-block;
        transition:0.1s;

        width: 100%;
        height: 100%;
    }

    button:hover {
        cursor:pointer;
        background-color: $BUTTON_BORDER_COLOR;
        color: $BUTTON_FADE_COLOR;
        transition:0.1s;
    }

    button:global(.disabled) {
        opacity: 0.6;
    }

    button:global(.disabled):hover {
        cursor: not-allowed;
    }

    button:global(.warning) {
        border-color: $WARN_BUTTON_BORDER_COLOR;
        color: $WARN_BUTTON_TEXT_COLOR;
        text-decoration-line:line-through;
    }

    button:global(.warning):hover {
        background-color: $WARN_BUTTON_BORDER_COLOR;
    }
</style>