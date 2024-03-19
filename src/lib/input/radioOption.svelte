<script lang="ts">
    export let category: string;
    export let name: string;
    export let id: string;
    export let value: string = id;
    export let checked: boolean = false;
</script>

<input name={category} {value} {id} type="radio" {checked} />
<label for={id} class="radioButton"><span>{name}</span></label>

<style lang="scss">
    @import "../palette.scss";

    input[type="radio"] {
        display: none;
    }

    label {
        display: flex;
        justify-content: center; /* Align horizontal */
        align-items: center; /* Align vertical */
        padding: 10px 5px;
        margin: 4px 4px;
        overflow:hidden;
        color: $RADIO_TEXT_COLOR_OFF;

        border-color: $RADIO_BACKGROUND_COLOR_OFF;
        border-width: 1%;
        border-style:solid;

        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 1.5rem;
        text-align: center;
        
        transition: 0.1s;
        
        cursor:pointer;
    }

    label:hover {
        background-color: $RADIO_HOVER_COLOR;
        transition: 0.1s;
        color: $RADIO_TEXT_COLOR_HOVER
    }
    
    input[type="radio"]:checked+label {
        background-color: $RADIO_BACKGROUND_COLOR_ON;
        transition: 0.1s;
        color: $RADIO_TEXT_COLOR_ON;
        border-color: $RADIO_BACKGROUND_COLOR_ON;
    }
</style>