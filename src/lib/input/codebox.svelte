<script lang="ts">
    export let id: string;
    export let init: string;
</script>

<textarea spellcheck="false" {id}>{init}</textarea>

<style lang="scss">
    textarea {
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
        overflow-y:auto;
        overflow-x:auto;

        font-family:'Courier New', Courier, monospace;
        font-weight:normal;
        font-size: 16px;

        border-radius: 4px;
    }
</style>