<script lang="ts">
    export let title : string;
</script>

<div>
    <h1>
        {title}
    </h1>

    <slot />
</div>

<style lang="scss">
    @import "../palette.scss";

    h1 {
        display:inline;
        color:#F88;
        font-family:'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 40px;
        text-align:left;
        padding-left:1%;
        padding-right:1%;
    }

    h1::before {
        content: '\00bb  ';
        color: $HEADER_ARROW_COLOR;
    }

    div {
        padding: 10px 10px;
    }
</style>