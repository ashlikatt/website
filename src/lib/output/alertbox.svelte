<script lang="ts">
    export let id: string;
</script>

<div {id}>

</div>

<style lang="scss">
    div {
        display: flexbox;
        justify-content: flex-end;
        flex-direction: column;
        float:left;
        position:absolute;
        width:20%;
        height:100%;
        pointer-events: none;
    }

    div > :global(*) {
        background-color:#FFAA55;
        color:#000000;
        border-left-color:#995500;
        border-left-width: 20%;
        border-left-style: solid;
        width:inherit 80%;
        height:inherit 20%;
        margin:5%;
        padding:5%;
        cursor:pointer;
        font-family:'Courier New', Courier, monospace;
        pointer-events:all;
        animation-name: appear;
        animation-duration: 0.5s;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
    }
</style>