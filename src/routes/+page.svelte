<script>
	import Header from "$lib/header/header.svelte";
	import Body from "$lib/core/body.svelte"
	import HeaderButton from "$lib/buttons/headerButton.svelte";
	import DisabledHeaderButton from "$lib/buttons/disabledHeaderButton.svelte";
	import Section from "$lib/text/section.svelte";
	import Paragraph from "$lib/text/paragraph.svelte";
	import Pad from "$lib/text/pad.svelte";
	import HorizontalLine from "$lib/format/horizontalLine.svelte";
	import PageData from "$lib/pageData.svelte";

	import img_black_lives_matter from "$lib/assets/black-lives-matter.gif"
	import img_anti_fascist from "$lib/assets/anti-fascist.gif"
	import img_this_machine from "$lib/assets/thismachine.jpg"
	import img_acab from "$lib/assets/acab.gif"
	import img_est from "$lib/assets/est.gif"
	import img_sayno from "$lib/assets/SAYNO.gif"
	import img_linux from "$lib/assets/linux.gif"
	import img_antichrome from "$lib/assets/antichrome.gif"
	import img_trans from "$lib/assets/transgender.gif"
	import img_trans_user from "$lib/assets/transuser.gif"
	import img_kawaii from "$lib/assets/kawaii.gif"
	import img_imqueer from "$lib/assets/imqueer.png"
	import img_likenya from "$lib/assets/likenya.gif"
	import img_lesbian from "$lib/assets/lesbianpride.gif"
	import img_hyper from "$lib/assets/extendedhyperenjoyer.gif"
	import img_socks from "$lib/assets/socks.png"
	import img_support from "$lib/assets/support.png"
	import img_yumenikki from "$lib/assets/yumenikki.gif"
	import img_jerma from "$lib/assets/jerma.gif"
	import img_spotify from "$lib/assets/spotify.gif"
</script>

<PageData title="Ashli's Site" desc="Hello, I'm Ashli, and welcome to my site." />

<Body>
	<Header title="Ashli's Site">
		<DisabledHeaderButton>Home</DisabledHeaderButton>
		<HeaderButton href="langs">Languages</HeaderButton>
		<HeaderButton href="tools">Tools</HeaderButton>
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

		<HorizontalLine />

		<div style="text-align: center;">
			<!-- Political cards -->
			<img src={img_black_lives_matter} 	alt="Black Lives Matter - Credit disc-content.neocities.org" 		title="I support Black Lives Matter!">
			<img src={img_anti_fascist} 		alt="Anti-Fascism - Credit disc-content.neocities.org" 				title="I oppose fascism and purveyors of it">
			<img src={img_this_machine} 		alt="This machine kills fascists" 									title="Hell yea">
			<img src={img_acab} 				alt="All cops are bastards; defund the police!" 					title="Fuck the cops">
			<img src={img_est} 					alt="Eat shit transphobes!" 										title="Eat shit transphobes!">

			<!-- Technology cards -->
			<a 	rel="external" 
				href="https://yesterweb.org/no-to-web3/" 
				target="_blank">
				<img src={img_sayno} 			alt="Say no to WEB3" 												title="Say no to WEB3 and NFTs">
			</a>
			<a 	rel="external" 
				href="https://endeavouros.com/" 
				target="_blank">
				<img src={img_linux} 			alt="Linux" 														title="Switch to linux now!">
			</a>
			<a 	rel="external" 
				href="https://librewolf.net/" 
				target="_blank">
				<img src={img_antichrome} 		alt="Anything but Chrome" 											title="Please use anything except Chrome">
			</a>

			<!-- Queer cards -->
			<img src={img_trans} 				alt="Trans your gender" 											title="Trans your gender now!">
			<img src={img_trans_user} 			alt="This user is transgender" 										title="I'm a lil trans girl :3">
			<img src={img_kawaii} 				alt="To kawaii to live" 											title="Kawaii for life~!">
			<img src={img_imqueer} 				alt="I'm fucking queer" 											title="I am very, very gay">
			<img src={img_likenya} 				alt="You know, like *nya*" 											title="Nyaaa <3 <3 <3">
			<img src={img_lesbian} 				alt="Lesbian Pride" 												title="Girls I mean girls I mean girls I mean girls">
			<img src={img_hyper} 				alt="Extended Hyper Enjoyer" 										title="Play celeste if you want to become a woman :3">
			<img src={img_socks} 				alt="This site was made with programming socks" 					title="This site was built with blood, sweat, tears, and programming socks" style="max-width:100px;max-height:40px">
			<img src={img_support} 				alt="I support trans artists - Credit encounters-ltd.neocities.org" title="I support trans artists" style="max-width:100px;max-height:40px">
			
			<!-- Support cards -->
			<a 	rel="external" 
				href="https://store.steampowered.com/app/650700/Yume_Nikki/" 
				target="_blank">
				<img src={img_yumenikki} 		alt="Yume Nikki" 													title="Play Yume Nikki please :3">
			</a>
			
			<a rel="external" href="https://www.twitch.tv/jerma985" target="_blank">
				<img src={img_jerma} 			alt="jerma985" 														title="jerma985">
			</a>
			<a 	rel="external" 
				href="https://open.spotify.com/playlist/7InVVa9vJgzs22p1kYUson?si=557b23cbce434498" 
				target="_blank">
				<img src={img_spotify} 			alt="Spotify" 														title="I love music">
			</a>
		</div>
	</Pad>
</Body>

