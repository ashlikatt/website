<script lang="ts">
    export let id: string;
    export let element: Element | null = null;
</script>

<p {id} bind:this={element}/>

<style lang="scss">
    p {
        resize: none;
        padding: 10px 5px;
        margin: 0px 0px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        min-width: 100%;
        min-height: 100%;
        max-width: 100%;
        max-height: 100%;
        width: 0px;
        height: 0px;
        background-color: #000;
        border: none;
        color: #DDD;
        overflow: hidden;
        overflow-y: hidden;
        font-family: 'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 20px;
        border-radius: 4px;
    }

    p > :global(img) {
        width: 100%; 
        height: 100%;
        object-fit: contain;
        image-rendering: optimizeSpeed;             /* STOP SMOOTHING, GIVE ME SPEED  */
        image-rendering: -moz-crisp-edges;          /* Firefox                        */
        image-rendering: -o-crisp-edges;            /* Opera                          */
        image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
        image-rendering: pixelated;                 /* Universal support since 2021   */
        image-rendering: optimize-contrast;         /* CSS3 Proposed                  */
        -ms-interpolation-mode: nearest-neighbor;   /* IE8+ */
    }
</style>