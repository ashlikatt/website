<script>
	import Header from "$lib/header/header.svelte";
	import Body from "$lib/core/body.svelte"
	import HeaderButton from "$lib/buttons/headerButton.svelte";
	import DisabledHeaderButton from "$lib/buttons/disabledHeaderButton.svelte";
	import Section from "$lib/text/section.svelte";
	import Paragraph from "$lib/text/paragraph.svelte";
	import Pad from "$lib/text/pad.svelte";
	import Link from "$lib/text/link.svelte";
	import PageLink from "$lib/text/pageLink.svelte";
	import ExternalLink from "$lib/text/externalLink.svelte";
	import PageData from "$lib/core/pageData.svelte";
</script>

<PageData title="Ashli's Site - Tools" desc="A collections of tools I've made." />

<Body>
	<Header title="My Tools">
		<HeaderButton href="/">Home</HeaderButton>
		<HeaderButton href="langs">Languages</HeaderButton>
		<DisabledHeaderButton>Tools</DisabledHeaderButton>
	</Header>

	<Pad>
		<Paragraph>
			Here are some tools and small demonstrations I have made in the past.
		</Paragraph>
	
		<Section>Map Planner</Section>
		<Paragraph>
			This is a graph storage format intended to assist with developing games with a large number of areas. (As my games tend to have) 
			A small CLI to interact with the format may be found <Link href="tools/mapplanner">here</Link>. 
		</Paragraph>

		<Section>Virtual To-Do List</Section>
		<Paragraph>
			This is a minimalist tool made for a friend. It allows you to create "tasks" which you can then
			click on to mark them as "complete."<br> It remembers your tasks, and will automatically un-complete them
			daily for you. It may be found <PageLink href="tools/todolist">here</PageLink>, 
			however if you plan on seriously using it for organization, I would just bookmark it.
		</Paragraph>
	</Pad>

	<Header title="Minecraft" />

	<Pad>
		<Paragraph>
			These tools are made specifically for use by 
			<ExternalLink href="https://www.minecraft.net/en-us">Minecraft</ExternalLink>
			and/or 
			<ExternalLink href="https://mcdiamondfire.com/home/">DiamondFire</ExternalLink>. 

			Any "Recode" buttons will automatically send relevant items or information to the client using the Minecraft 
			<ExternalLink href="https://github.com/homchom/recode">Recode</ExternalLink> mod.
		</Paragraph>
	
		<Section>Minecraft Lore Image Generator</Section>
		<Paragraph>
			This tool generates a Minecraft command to give an item with an image as its lore. 
			It may be found <Link href="tools/imagelore">here</Link>.
		</Paragraph>

		<Section>Minecraft Skin Icon Generator</Section>
		<Paragraph>
			This tool generates a front-facing icon from your skin's texture file.
			This may be used for icons, profile pictures, etc. 
			It may be found <Link href="tools/skinmoji">here</Link>.
		</Paragraph>

		<Section>DiamondFire Template Encoder/Decoder</Section>
		<Paragraph>
			This tool encodes or decodes code templates from DiamondFire. 
			It may be found <Link href="tools/templatedata">here</Link>.
		</Paragraph>

		<Section>DiamondFire Object Notation</Section>
		<Paragraph>
			This is technically one of my languages, however it's relevant for this section.
			DFON is very similar to JSON in syntax. It is intended to be a way for DiamondFire plots to easily represent and compile constant data.
			The documentation and compiler may be found <Link href="tools/dfon">here</Link>.
		</Paragraph>
	</Pad>
</Body>

