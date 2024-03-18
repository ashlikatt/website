<script lang="ts">
	import PageData from "$lib/core/pageData.svelte";
    import GrowBody from "$lib/core/growBody.svelte"
    import NoscriptWarning from "$lib/core/noscriptWarning.svelte";
	import Header from "$lib/header/header.svelte";
	import HeaderButton from "$lib/buttons/headerButton.svelte";
    import Columns from "$lib/format/columns.svelte";
    import Rows from "$lib/format/rows.svelte";
    import Sized from "$lib/format/sized.svelte";
    import ImageInput from "$lib/input/imageInput.svelte"
    import Button from "$lib/buttons/button.svelte"
    import PixelDisplay from "$lib/output/pixelDisplay.svelte";

    import { setRecodeButtonDOM, setCopyButtonDOM, setInputFileDOM, setInputRangeDOM, setPixelDisplay, inputChanged, invalidate, recodeButton, copyButton } from "./generator";
	import { onMount } from "svelte";
	import RangeInput from "$lib/input/rangeInput.svelte";

    let recodeButtonDOM: HTMLButtonElement | null = null;
    let copyButtonDOM: HTMLButtonElement | null = null;
    let inputFileDOM: HTMLInputElement | null = null;
    let inputRangeDOM: HTMLInputElement | null = null;
    let pixelDisplay: HTMLElement | null = null;

    $: {
        setRecodeButtonDOM(recodeButtonDOM);
        setCopyButtonDOM(copyButtonDOM);
        setInputFileDOM(inputFileDOM);
        setInputRangeDOM(inputRangeDOM);
        setPixelDisplay(pixelDisplay);
    }

    onMount(() => {
        inputChanged()
        invalidate()
    })
</script>

<PageData title="Minecraft Image Lore Generator" desc="Tool to generate minecraft items with custom images in their lore." />

<GrowBody>
    <NoscriptWarning />

    <Header title="Minecraft Image Lore Generator">
        <HeaderButton href="../tools">Back</HeaderButton>
    </Header>

    <Columns>
        <Rows>
            <Sized size=19 padded>
                <ImageInput name="Image File:" id="inputfile" bind:element={inputFileDOM} onUpdate={inputChanged}/>
            </Sized>
            <Sized size=1 padded>
                <Button click={copyButton} bind:element={copyButtonDOM}>Copy Command</Button>
            </Sized>    
        </Rows>
        <Rows>
            <Sized size = 1 padded>
                <RangeInput min=1 max=100 value=3 id="inputrange" name="Quality" bind:element={inputRangeDOM} onUpdate={inputChanged}/>
            </Sized>
            <Sized size = 18 padded>
                <PixelDisplay id="pixelDisplay" bind:element={pixelDisplay}/>
            </Sized>
            <Sized size = 1 padded>
                <Button click={recodeButton} bind:element={recodeButtonDOM}>Send to Recode</Button>
            </Sized>
        </Rows>
    </Columns>
</GrowBody>