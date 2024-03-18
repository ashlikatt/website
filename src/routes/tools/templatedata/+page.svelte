<script lang="ts">
    import Header from "$lib/header/header.svelte";
    import GrowBody from "$lib/core/growBody.svelte";
    import PageData from "$lib/core/pageData.svelte";
	import HeaderButton from "$lib/buttons/headerButton.svelte";
	import Rows from "$lib/format/rows.svelte";
	import Columns from "$lib/format/columns.svelte";
    import Sized from "$lib/format/sized.svelte";
	import Button from "$lib/buttons/button.svelte";
    import Codebox from "$lib/input/codebox.svelte";
    import Section from "$lib/text/section.svelte"

    import { onMount } from "svelte";
    import { jsonToDataButton, dataToJsonButton, recodeButton, setDataBox, setJsonBox, setAlertBox } from "./code.ts";
	import NoscriptWarning from "$lib/core/noscriptWarning.svelte";
	import Alertbox from "$lib/output/alertbox.svelte";

    onMount(() => {
        setJsonBox(document.getElementById("jsonBox"))
        setDataBox(document.getElementById("dataBox"))
        setAlertBox(document.getElementById("alertBox"))
    })
</script>

<PageData title="Template Data Converter" desc="Tool to convert DiamondFire templates to and from their JSON representation."/>

<GrowBody>
    <NoscriptWarning />
    <Alertbox id="alertBox" />

    <Header title="Template Editor">
        <HeaderButton href="../tools">Back</HeaderButton>
    </Header>

    
    <Columns>
        <Sized size=6>
            <Rows>
                <Sized size=1>
                    <Section>Template JSON</Section>
                </Sized>
                <Sized size=20 padded>
                    <Codebox id="jsonBox" init={'{"blocks":[{"id":"block","block":"event","args":{"items":[]},"action":"Join"},{"id":"block","block":"player_action","args":{"items":[{"item":{"id":"txt","data":{"name":"Hello, World!"}},"slot":0},{"item":{"id":"bl_tag","data":{"option":"Add spaces","tag":"Text Value Merging","action":"SendMessage","block":"player_action"}},"slot":25},{"item":{"id":"bl_tag","data":{"option":"Regular","tag":"Alignment Mode","action":"SendMessage","block":"player_action"}},"slot":26}]},"action":"SendMessage"}]}'} />
                </Sized>
            </Rows>
        </Sized>
        <Sized size=1>
            <Rows>
                <Sized size=1 />
                <Sized size=10 padded>
                    <Button click={dataToJsonButton}>←</Button>
                </Sized>
                <Sized size=10 padded>
                    <Button click={jsonToDataButton}>→</Button>
                </Sized>
            </Rows>
        </Sized>
        <Sized size=6>
            <Rows>
                <Sized size=1>
                    <Section>Template Data</Section>
                </Sized>
                <Sized size=18 padded>
                    <Codebox id="dataBox" init = {'\'{"author":"Nyashli","name":"§e§lEvent §6» §ePlayer Join Game Event","version":1,"code":"H4sIAAAAAAAA/6VRwWoCMRD9lTjnPZSCHnLzVgp7UbGHUmTcDCE4myxJtlhk/70TXXRL8SCeknnz3ps3yQn2HJpDAv15AmdAX2qoxlMDfZPPUmO0whJSprbQvwbBmuyCF9J7cB6G6o5Fx/hDcTey/1tdbmekyPOxzDOYsUAeWxLwjZhDpT5CZDODQYYnDhn0y3nqVL7nXUY7cQjdmHJpjEodNpSkWzgaNnTMaovck6opWueL8LrWmrypKSW0dHedW5TX+QNZVmR7xngNsmRnfStPrepg6IkQi+HPz0zV0vkFs1asTPABAAA="}\''} />
                </Sized>
                <Sized size=2 padded>
                    <Button click={recodeButton}>Send to Recode</Button>
                </Sized>
            </Rows>
        </Sized>
    </Columns>
</GrowBody>

