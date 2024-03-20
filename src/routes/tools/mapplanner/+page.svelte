<script lang="ts">
	import HeaderButton from "$lib/buttons/headerButton.svelte";
    import GrowBody from "$lib/core/growBody.svelte";
	import NoscriptWarning from "$lib/core/noscriptWarning.svelte";
    import PageData from "$lib/core/pageData.svelte";
	import Columns from "$lib/format/columns.svelte";
	import Sized from "$lib/format/sized.svelte";
	import Header from "$lib/header/header.svelte";
	import Codebox from "$lib/input/codebox.svelte";
	import InputConsole from "$lib/input/inputConsole.svelte";

    import { setConsoleBox, setInputBox, setTextBox, changedCode } from "./interpreter";

    let codeElement: HTMLTextAreaElement | undefined = undefined;
    let consoleElement: HTMLInputElement | undefined = undefined;
    let inputElement: HTMLInputElement | undefined = undefined;

    $: {
        if (consoleElement) setConsoleBox(consoleElement);
        if (inputElement) setInputBox(inputElement);
        if (codeElement) setTextBox(codeElement);
    }

    function beforeUnload(e:any) {
        if (!changedCode()) return;
        var confirmationMessage = 'Map data will be erased. Really leave?';
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
</script>

<svelte:window on:beforeunload={beforeUnload} />

<PageData title="Map Planner" desc="Tool for planning complex area-based games." />

<GrowBody>
    <NoscriptWarning />

    <Header title="Map Planner">
        <HeaderButton href="tools">Back</HeaderButton>
    </Header>

    <Columns>
        <Sized size=1 padded>
            <Codebox id="jsonBox" bind:element={codeElement} init={`// Simple statements showing one-way and two-way connections:

  Cave -- Desert
  Forest -> Cave
  Forest -- Desert, Tundra

// The entire above could be written as the compound statement:

  Desert, Tundra -- Forest -> Cave -- Desert



// Try running 'info Forest' in the terminal line in the bottom right!
// Be sure you run 'compile' if you edit the data.`} />
        </Sized>
        <Sized size=1 padded>
            <InputConsole bind:inputElement={inputElement} bind:consoleElement={consoleElement}/>
        </Sized>
    </Columns>
</GrowBody>