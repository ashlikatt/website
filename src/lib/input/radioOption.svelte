<script lang="ts">
    export let category: string;
    export let name: string;
    export let id: string;
    export let value: string = id;
    export let checked: boolean = false;
</script>

<input name={category} {value} {id} type="radio" {checked} />
<label for={id} class="radioButton"><span>{name}</span></label>

<style>
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
        background-color: #555;
        color:#DDD;
        outline:none;

        font-family:'Courier New', Courier, monospace;
        font-weight:normal;
        font-size: 16px;
        text-align: center;

        border-radius: 4px;
        cursor:pointer;
    }

    input[type="radio"]:checked+label {
        background-color: #888;
        transition: 0.1s;
    }
</style>