<script lang="ts">
	import type { LoadEvent } from "@sveltejs/kit";
	import type { EventHandler, KeyboardEventHandler } from "svelte/elements";

    export let id: string;
    export let init: string;

    export let element: HTMLTextAreaElement | undefined = undefined;

    const autoComplete: { [key: string]: string } = {
        "{": "}",
        "[": "]",
        "<": ">",
        "(": ")",
    }

    function onLoad(e: HTMLTextAreaElement) {
        // If the box is empty, fill with default value. Otherwise leave as-is (It will be the last input the user gave it)
        if (e.value.trim().length === 0) {
            e.value = init;
        }
    }

    function onKeyDown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }) {
        const textArea: HTMLTextAreaElement = e.currentTarget;

        if (!textArea) return;

        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;

        // Tab indents four spaces
        if (e.key == 'Tab') {
            e.preventDefault();
            textArea.value = textArea.value.substring(0, start) + "    " + textArea.value.substring(end)
      
            textArea.selectionStart = textArea.selectionEnd = start + 4;
            return  
        }
        
        // Autocomplete brackets
        if (autoComplete[e.key] !== undefined) {
            const complete = autoComplete[e.key]

            e.preventDefault();
            if (textArea.selectionStart === textArea.selectionEnd) {
                textArea.value = textArea.value.substring(0, start) + e.key + complete + textArea.value.substring(end)
                textArea.selectionStart = textArea.selectionEnd = start + 1;
            } else {
                textArea.value = textArea.value.substring(0, start) + e.key + textArea.value.substring(start, end) + complete + textArea.value.substring(end)
                textArea.selectionStart = start + 1;
                textArea.selectionEnd = end + 1;
            }
            return
        }

        // Enter
        if (e.key == "Enter" && textArea.selectionStart === textArea.selectionEnd) {
            const before = textArea.value.substring(0, start)
            
            const trimmed = before.trimEnd()
            const finalChar = trimmed.charAt(trimmed.length - 1)

            e.preventDefault();
            const after = textArea.value.substring(end)
            const lines = before.split("\n")
            const finalLine = lines[lines.length - 1]

            if (finalChar === '{' || finalChar === '[' || finalChar === '(' || finalChar === '<') {
                const indentAmount = finalLine.length - finalLine.trimLeft().length + 4

                textArea.value = before + "\n" + " ".repeat(indentAmount) + "\n" + " ".repeat(indentAmount - 4) + after
                textArea.selectionStart = textArea.selectionEnd = start + 1 + indentAmount
            } else {
                const indentAmount = finalLine.length - finalLine.trimLeft().length

                textArea.value = before + "\n" + " ".repeat(indentAmount) + after
                textArea.selectionStart = textArea.selectionEnd = start + 1 + indentAmount
            }

            return
        }
    }
</script>

<textarea spellcheck="false" use:onLoad on:keydown={onKeyDown} bind:this={element} {id}></textarea>

<style lang="scss">
    @import "../palette.scss";

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
        background-color: $CODEBOX_BACKGROUND_COLOR;
        border:none;
        color: $CODEBOX_TEXT_COLOR;
        outline:none;
        overflow-y:auto;
        overflow-x:auto;

        font-family: $GLOBAL_CODE_FONT;
        font-weight: $GLOBAL_CODE_FONT_WEIGHT;
        font-size: 1rem;

        border-radius: 4px;
    }
</style>