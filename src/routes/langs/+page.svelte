<script lang="ts">
	import Header from "$lib/header/header.svelte";
	import Body from "$lib/core/body.svelte"
	import HeaderButton from "$lib/buttons/headerButton.svelte";
	import DisabledHeaderButton from "$lib/buttons/disabledHeaderButton.svelte";
	import Section from "$lib/text/section.svelte";
	import Paragraph from "$lib/text/paragraph.svelte";
	import Pad from "$lib/text/pad.svelte";
	import ExternalLink from "$lib/text/externalLink.svelte";
	import Link from "$lib/text/link.svelte";
	import PageData from "$lib/core/pageData.svelte";

	import StaticImage from "$lib/images/staticImage.svelte";
	import img_coding from "$lib/assets/coding.gif";
	import Johnvertisement from "$lib/images/johnvertisement.svelte";
</script>

<PageData title="Ashli's Site - Languages" desc="A collection of languages I've developed." />

<Body>
	<StaticImage src={img_coding} title="Me making this site" alt="Woman types at a computer." height=20%/>

	<Header title="My Languages">
		<HeaderButton href="/">Home</HeaderButton>
		<DisabledHeaderButton>Languages</DisabledHeaderButton>
		<HeaderButton href="tools">Tools</HeaderButton>
	</Header>

	<Pad>
		<Paragraph>
			Here is a collection of languages I have made. Some are for programming in, and some are for other purposes. 
			My esolangs page may be found 
			<ExternalLink href="https://esolangs.org/wiki/User:Ashli_Katt">here</ExternalLink>
			This page only shows highlights.
		</Paragraph>
	
		<Section>Foreach</Section>
		<Paragraph>
			Foreach is an esoteric programming language where the only control flow is for-each loops and function calls. 
			The documentation and interpreter may be found <Link href="langs/foreach">here</Link>.
		</Paragraph>

		<Section>Cast</Section>
		<Paragraph>
			Cast is an esoteric programming language where the only operation is unsafely casting user-defined types between eachother. 
			The language ended up being a strange form of functional programming.
			The documentation and interpreter may be found <Link href="langs/cast">here</Link>.
		</Paragraph>

		<Section>DiamondFire Object Notation</Section>
		<Paragraph>
			DFON is very similar to JSON in syntax. It is intended to be a way for DiamondFire plots to easily represent and compile constant data.
			The documentation and compiler may be found <Link href="langs/dfon">here</Link>.
		</Paragraph>

		<Section>Tupilled</Section>
		<Paragraph>
			Tupilled is an esoteric programming language I co-designed, where the only datatype is tuples and lambda expressions. It is inspired by functional programming principles.
			The documentation may be found <ExternalLink href="https://esolangs.org/wiki/Tupilled">here</ExternalLink>. 
		</Paragraph>

		<Section>Bullshit</Section>
		<Paragraph>
			Bullshit is an esoteric programming language designed to be completely horrible, but not impossible, to work with.
			The documentation may be found <ExternalLink href="https://esolangs.org/wiki/Bullshit">here</ExternalLink>.
		</Paragraph>
	</Pad>

	<Johnvertisement />
</Body>

