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

    import { setCodeBox, setConsoleBox, setInputBox, runButton, beforeUnload, onKeyDown } from "./interpreter";

    let codeBox: HTMLTextAreaElement | undefined;
    let consoleBox: HTMLParagraphElement | undefined;
    let inputBox: HTMLTextAreaElement | undefined;

    $: {
        if (codeBox) setCodeBox(codeBox);
        if (consoleBox) setConsoleBox(consoleBox);
        if (inputBox) setInputBox(inputBox);
    }

</script>

<svelte:window on:beforeunload={beforeUnload} on:keydown={onKeyDown} />

<PageData title="Cast Language Interpreter" desc="Interpreter for the Cast programming language." />

<GrowBody>
    <NoscriptWarning />

    <Header title="Cast">
        <HeaderButton href="../langs">Back</HeaderButton>
        <ExternalHeaderButton href="https://esolangs.org/wiki/Cast">Reference</ExternalHeaderButton>
    </Header>

    <Rows>
        <Sized size=3>
            <Columns>
                <Sized size=6 padded>
                    <Codebox id="codebox" init={`\
// Cat program
Main<I>
| IO<I> -> Main<I>
| Main<I> -> IO<I>`} bind:element={codeBox} />
                </Sized>

                <Sized size=1>
                    <Rows>
                        <Sized size=2 padded>
                            <Codebox id="inputbox" init="Input Here" bind:element={inputBox} />
                        </Sized>

                        <Sized size=1 padded>
                            <Button click={runButton} >Execute</Button>
                        </Sized>
                    </Rows>
                </Sized>
            </Columns>
        </Sized>

        <Sized size=1 padded>
            <Console bind:consoleElement={consoleBox} />
        </Sized>
    </Rows>

</GrowBody>