<script lang="ts">
	import HeaderButton from "$lib/buttons/headerButton.svelte";
    import GrowBody from "$lib/core/growBody.svelte";
	import NoscriptWarning from "$lib/core/noscriptWarning.svelte";
    import PageData from "$lib/core/pageData.svelte";
	import Header from "$lib/header/header.svelte";
    import ExternalHeaderButton from "$lib/buttons/externalHeaderButton.svelte";
	import Rows from "$lib/format/rows.svelte";
	import Sized from "$lib/format/sized.svelte";
	import Console from "$lib/output/console.svelte";
	import Columns from "$lib/format/columns.svelte";
	import Codebox from "$lib/input/codebox.svelte";
	import Button from "$lib/buttons/button.svelte";

	import RadioOption from "$lib/input/radioOption.svelte";
	import { onLoad, recodeButton, runButton, onKeyDown, beforeUnload } from "./script";

</script>

<svelte:document on:load={ onLoad } />
<svelte:window on:beforeunload={beforeUnload} on:keydown={onKeyDown} />

<PageData title="DFON" desc="Compiler for the DiamondFire Object Notation, a JSON-like language for read-only DiamondFire plot data." />

<GrowBody>
    <NoscriptWarning />

    <Header title="DiamondFire Object Notation">
        <HeaderButton href="../langs">Back</HeaderButton>
        <ExternalHeaderButton href="./reference">Reference</ExternalHeaderButton> <!-- External so it opens a new page -->
    </Header>

    <Rows>
        <Sized size=3>
            <Columns>
                <Sized size=6 padded>
                    <Codebox id="codebox" init={`\
{
    
}`} />
                </Sized>

                <Sized size=1>
                    <Rows>
                        <Sized size=1 padded>
                            <Button click={runButton}>Compile (Commands)</Button>
                        </Sized>
                        <Sized size=1 padded>
                            <Button click={recodeButton} >Compile (Recode)</Button>
                        </Sized>
                        <Sized size=1 padded>
                            <Rows>
                                <RadioOption category="plotSize" name="Basic" id="basicPlot" checked />
                                <RadioOption category="plotSize" name="Large" id="largePlot" />
                                <RadioOption category="plotSize" name="Massive" id="massivePlot" />
                            </Rows>
                        </Sized>
                    </Rows>
                </Sized>
            </Columns>
        </Sized>

        <Sized size=1 padded>
            <Console id="console" />
        </Sized>
    </Rows>

</GrowBody>