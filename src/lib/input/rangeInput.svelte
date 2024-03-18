<script lang="ts">
    import Rows from "$lib/format/rows.svelte";
    import Sized from "$lib/format/sized.svelte";

    export let min: string;
    export let max: string;
    export let value: string;
    export let id: string;
    export let name: string;

    export let onUpdate: () => void = () => {}

    export let element: HTMLInputElement | null = null;
</script>

<label for={id}>
    <div>
        <Rows>
            <Sized size=1 padded>
                {name}
            </Sized>
            <Sized size=1 padded>
                <input type="range" {min} {max} {value} {id} bind:this={element} on:change={onUpdate}/>
            </Sized>
        </Rows>
    </div>
</label>



<style lang="scss">
    @import "../palette.scss";

    input {
        cursor: pointer;
    }

    div {
        resize:none;
        padding: 10px 5px;
        margin: 0px 0px;
        overflow:hidden;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        width: 100%;
        height: 100%;
        background-color: $RANGE_BACKGROUND_COLOR;
        border:none;
        color: $RANGE_TEXT_COLOR;
        outline:none;

        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 1.5rem;  
        text-align: center;

        border-radius: 4px;
    }

    input[type="range"] {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        width: 100%;
        height: 10px;
        background: $RANGE_TRACK_COLOR;
        outline: none;
    }

    input[type="range"]::-webkit-range-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 20px; /* Set a specific slider handle width */
        height: 40px; /* Slider handle height */
        background: $RANGE_THUMB_COLOR; 
        cursor: pointer; 
        outline:none;
        border:none;
        border-radius: 0%;
    }

    input[type="range"]::-moz-range-thumb {
        width: 15px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: $RANGE_THUMB_COLOR; 
        outline:none;
        border:none;
        cursor: pointer; 
        border-radius: 0%;
    }
</style>