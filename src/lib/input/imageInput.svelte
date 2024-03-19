<script lang="ts">
    import HorizontalLine from "$lib/format/horizontalLine.svelte";
    import Rows from "$lib/format/rows.svelte";
	import Sized from "$lib/format/sized.svelte";

    export let id: string;
    export let name: string;
    export let element: HTMLInputElement | null = null;
    export let onUpdate: () => void = () => {}

    let clickToEditNode: HTMLElement | undefined  = undefined;
    let imgNode: HTMLImageElement | undefined = undefined;

    function updateImage() {
        let fileReader = new FileReader();

        fileReader.addEventListener("load", x => {
            if (imgNode && clickToEditNode) {
                imgNode.src = fileReader.result as string;
                imgNode.classList.remove("noSize");
                imgNode.hidden = false;
                clickToEditNode.classList.add("noSize");
                onUpdate();
            }
        });

        if (imgNode && clickToEditNode) {
            const file = element?.files?.[0];
            if (file && file instanceof File && file.type.startsWith("image")) {
                fileReader.readAsDataURL(file);
            } 

            imgNode.classList.add("noSize");
            imgNode.hidden = true;
            clickToEditNode.classList.remove("noSize");
        }
    }
</script>

<label for={id}>
    <div>
        <Rows>
            <Sized size=1 padded><span class="vertCenter"><span class="internal">{name}</span></span></Sized>
            <Sized size=0><HorizontalLine /></Sized>
            <Sized size=4>
                <div class="imgcontainer vertCenter">
                    <span class="gray" bind:this={clickToEditNode}>(Click to select file)</span>
                    <img src="" bind:this={imgNode} alt="The inputted file" class="noSize" hidden/>
                </div>
            </Sized>
        </Rows>
        <input {id} accept="image/*" type="file" on:change={updateImage} bind:this={element} /><br>
    </div>
</label>

<style lang="scss">
    @import "../palette.scss";

    span:global(.noSize) {
        display: none;
        width:0px;
        height:0px;
    }

    div:global(.noSize) {
        display: none;
        width:0px;
        height:0px;
    }

    .vertCenter {
        display: flex;
        justify-content: center; /* Align horizontal */
        align-items: center; /* Align vertical */
        justify-self: center;
        flex-grow:1;
        width:100%;
        height:100%;
        margin:0px;
        padding:0px;
    }

    .internal {
        margin: auto;
        justify-self: center;
    }

    .imgcontainer {
        resize: none;
        padding: 10px 10px;
        margin: 0px 0px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        min-width: 100%;
        min-height: 100%;
        max-width: 100%;
        max-height: 100%;
        width: 0px;
        height: 0px;
        border: none;
        overflow: hidden;
        overflow-y: hidden;
        border-radius: 4px;
    }
    input {
        display: none;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        image-rendering: optimizeSpeed;             /* STOP SMOOTHING, GIVE ME SPEED  */
        image-rendering: -moz-crisp-edges;          /* Firefox                        */
        image-rendering: -o-crisp-edges;            /* Opera                          */
        image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
        image-rendering: pixelated;                 /* Universal support since 2021   */
        image-rendering: optimize-contrast;         /* CSS3 Proposed                  */
        -ms-interpolation-mode: nearest-neighbor;   /* IE8+ */
    }

    .gray {
        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 1.5rem;
        text-align: center;
        color: $IMAGE_INPUT_TEXT_COLOR_ALT;
    }

    label {
        cursor: pointer;
    }

    div {
        resize:none;
        padding: 0px 0px;
        margin: 0px 0px;
        overflow:hidden;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
        width: 100%;
        height: 100%;
        background-color: $IMAGE_INPUT_BACKGROUND_COLOR;
        border:none;
        color:$IMAGE_INPUT_TEXT_COLOR;
        outline:none;

        font-family: $GLOBAL_FONT;
        font-weight: $GLOBAL_FONT_WEIGHT;
        font-size: 1.5rem;
        text-align: center;

        border-radius: 4px;

    }
</style>