<script>
    import HeaderButton from "$lib/buttons/headerButton.svelte";
	import Columns from "$lib/format/columns.svelte";
	import Rows from "$lib/format/rows.svelte";
    import GrowBody from "$lib/growBody.svelte";
	import Header from "$lib/header/header.svelte";
	import NoscriptWarning from "$lib/noscriptWarning.svelte";
    import PageData from "$lib/pageData.svelte";
    import Sized from "$lib/format/sized.svelte";
    import PixelDisplay from "$lib/output/pixelDisplay.svelte";
	import FileInput from "$lib/output/fileInput.svelte";
	import Button from "$lib/buttons/button.svelte";

    import { setInputFile, setPixelDisplay, generateButton } from "./generator.ts";
	import RadioOption from "$lib/input/radioOption.svelte";
	import { onMount } from "svelte";

    onMount(() => {
        setInputFile(document.getElementById("inputfile"))
        setPixelDisplay(document.getElementById("pixelDisplay"))
    })
</script>

<PageData title="Minecraft Icon Generator" desc="Tool to generate front-facing icons of minecraft skins." />

<GrowBody>
    <NoscriptWarning />

    <Header title="Minecraft Skin Icon Generator">
        <HeaderButton href="../tools">Back</HeaderButton>
    </Header>

    <Columns>
        <Sized size=1>
            <Rows>
                <Sized size=1 padded>
                    <FileInput name="Skin File:" id="inputfile" />
                </Sized>
                <Sized size=1 padded>
                    <RadioOption category="skin_type" id="wide_skin" value="Wide" name="Wide Skin" checked />
                    <RadioOption category="skin_type" id="slim_skin" value="Slim" name="Slim Skin" />
                    <!-- TODO Add support for legacy skins (like Electrosolt) -->
                </Sized>
                <Sized size=1 padded>
                    <Button click={generateButton} >Generate</Button>
                </Sized>
            </Rows>
        </Sized>
        <Sized size=1 padded>
            <PixelDisplay id="pixelDisplay" />
        </Sized>
    </Columns>
</GrowBody>