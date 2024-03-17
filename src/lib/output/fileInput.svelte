<script lang="ts">
    export let id: string;
    export let name: string;
</script>

<label for={id}>
    <p class="input">{name}<br>
        <input {id} accept="image/*" type="file" />
    </p>
</label>

<style lang="scss">
    p {
        resize:none;
        padding: 10px 5px;
        margin: 0px 0px;
        overflow:hidden;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        width: 100%;
        height: 100%;
        background-color: #111;
        border:none;
        color:#DDD;
        outline:none;

        font-family:'Courier New', Courier, monospace;
        font-weight:normal;
        font-size: 16px;

        border-radius: 4px;

    }
</style>