<script>
	import Header from "$lib/header/header.svelte";
	import Body from "$lib/body.svelte"
	import HeaderButton from "$lib/buttons/headerButton.svelte";
	import DisabledHeaderButton from "$lib/buttons/disabledHeaderButton.svelte";
	import Section from "$lib/text/section.svelte";
	import Paragraph from "$lib/text/paragraph.svelte";
	import Pad from "$lib/text/pad.svelte";
</script>

<Body>
	<Header>
		<span slot="title">My Tools</span>

		<span slot="buttons">
			<a href="/"><HeaderButton>Home</HeaderButton></a>
			<a href="langs"><HeaderButton>Languages</HeaderButton></a>
			<DisabledHeaderButton>Tools</DisabledHeaderButton>
			<a href="games"><HeaderButton>Games</HeaderButton></a>
		</span>
	</Header>

	<Pad>
		<Paragraph>
			Welcome to my site! I'm Ashli. (she/they/it)<br>
			I'm a lesbian kitty cat and mainly work with computers and programming.<br>
			I enjoy logic puzzles and language design!
		</Paragraph>
	
		<Section>Contact</Section>
		<Paragraph>
			Discord: @ashli.dev<br>
			Email: ashlikatt.public@gmail.com
		</Paragraph>
	</Pad>
</Body>

