<script>
	import Rows from "./format/rows.svelte";
	import Sized from "./format/sized.svelte";

</script>
<noscript>
    <span>
        <Sized size=1 padded>
            JavaScript is disabled. This page may not work correctly.
        </Sized>
    </span>
</noscript>

<style lang="scss">
    span {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        -webkit-flex-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        display: flexbox;
        justify-content: center; /* Align horizontal */
        align-items: center; /* Align vertical */
        background-color: #F55;
        color: #FFF;
        font-family:'Verdana', Verdana, sans-serif;
        font-size: 200%;
    }
</style>