<script>
	import HeaderButton from "$lib/buttons/headerButton.svelte";
    import Body from "$lib/core/body.svelte";
    import PageData from "$lib/core/pageData.svelte";
	import Header from "$lib/header/header.svelte";
	import CodeSample from "$lib/text/codeSample.svelte";
	import ExternalLink from "$lib/text/externalLink.svelte";
	import InlineCode from "$lib/text/inlineCode.svelte";
	import Paragraph from "$lib/text/paragraph.svelte";
	import Section from "$lib/text/section.svelte";

</script>

<PageData title="DFON - Reference" desc="Reference page for the DFON markup language." />

<Body>
    <Header title="DiamondFire Object Notation Reference">
        <HeaderButton href="langs/dfon">Back</HeaderButton>
    </Header>

    <Paragraph>
        DiamondFire Object Notation is a JSON-like language for constant data on DiamondFire plots. It is not a programming language.
        DFON was created to streamline the production of games with large amounts of constant, read-only data. It may be helpful for things like weapon stats,
        map regions, npc dialogue, etc.<br><br>

        It is recommended to have an understanding of <ExternalLink href="https://www.json.org/json-en.html">JSON</ExternalLink>
        before using DFON, as they share many similarities. (I mean it!!)
    </Paragraph>

    <Section>Basic Structure</Section>
    <Paragraph>
        A DFON file uses the same rough structure as JSON. The file is one huge dictionary, which has 0 or more keys.
        Those keys contain other values like lists, strings, numbers, nested dictionaries, etc.<br><br>

        The outer-most dictionary is referred to as the "main dictionary." When DFON is compiled, each entry in the main dictionary will become a global variable. 
        (With the corresponding name and value)

        <CodeSample value={`\
            |{
            |        a: 0,
            |        b: 1,
            |        c: [1, 2, 3],
            |    "key": "whatever",
            |}
        `}/>

        This will compile down into a code-line that sets the global variables <InlineCode>a</InlineCode>, <InlineCode>b</InlineCode>, 
        <InlineCode>c</InlineCode>, and <InlineCode>key</InlineCode> to their respective values.<br><br>

        Both strings and identifiers are allowed as keys for a dictionary, and trailing commas are allowed anywhere.<br>
        Values will be covered in the following three sections.
    </Paragraph>

    <Section>Basic Primitive Types</Section>
    <Paragraph>
        DFON has the common primitive value types from DiamondFire. This includes numbers, strings, text, locations, and vectors.<br>
        Numbers, strings, and text are covered in this section. The rest are covered in the next section.<br><br>

        Numbers are written in base-10, with or without a negative sign, and with or without a decimal place. 
        A number's decimal place may go beyond 3 digits, unlike in DiamondFire - however the value will be truncated when compiling.
        Numbers additionally can have underscores anywhere inside of them for readability<br><br>

        Numbers may also be written in hex, octal, or binary using the <InlineCode>0x</InlineCode>, <InlineCode>0o</InlineCode>,
        and <InlineCode>0b</InlineCode> prefixes. Numbers created this way do not support decimals.<br><br>

        All of the following are valid numbers: <InlineCode>12</InlineCode>, <InlineCode>-12</InlineCode>, <InlineCode>12.52</InlineCode>,
        <InlineCode>-1_000_000_000.002</InlineCode>, <InlineCode>0xFF_00_AA</InlineCode>, <InlineCode>-0b11101110</InlineCode>, <InlineCode>0o77</InlineCode>.<br><br>

        <br><br>

        Strings are identical to JSON strings, except they can use either <InlineCode>"</InlineCode>
        or <InlineCode>'</InlineCode> as a delimiter. Backslashes are used to escape characters.<br>
        Text is created by placing <InlineCode>T</InlineCode> before string quotes.<br><br>

        The following are valid strings: <InlineCode>""</InlineCode>, <InlineCode>"Hello, World!"</InlineCode>, 
        <InlineCode>"String that has \na newline!"</InlineCode><br>
        The following are valid text: <InlineCode>T""</InlineCode>, <InlineCode>T"&lt;red&gt;Hello, player!"</InlineCode>, 
        <InlineCode>"Text that has &lt;newline&gt;a newline!"</InlineCode><br><br>

        Remember that this is constant data! DiamondFire Codes like %default have no meaning.
    </Paragraph>

    <Section>Other Primitive Types</Section>
    <Paragraph>
        Locations are written as 3 or 5 comma-separated numbers inside of parenthesis.<br><br>
        Valid locations may look like: <InlineCode>(1, 2, 3)</InlineCode>, <InlineCode>(23.5, 50.5, 24.5, )</InlineCode>, or 
        <InlineCode>(150.5, 200.5, 150.5, 0, 90, )</InlineCode>.<br><br><br><br>

        Vectors are written as 3 comma-separated numbers inside of parenthesis.<br><br>
        Valid vectors may look like: <InlineCode>&lt;2, 3, 4&gt;</InlineCode> or <InlineCode>&lt;1, 0.25, 0, &gt;</InlineCode>.
    </Paragraph>

    <Section>Compound Types</Section>
    <Paragraph>
        DFON has the same two compound types as JSON, dictionaries and lists.<br>
        
        Lists are written as square brackets with zero or more comma-separated values inside. 
        When compiled, they become a DiamondFire List value.<br><br>

        Valid lists may look like <InlineCode>[]</InlineCode>, <InlineCode>[2]</InlineCode>, or 
        <InlineCode>["a", 2, &lbrace; a: 2 &rbrace;, ]</InlineCode>.<br><br>

        <br><br>

        Dictionaries are written as curly braces with zero or more comma-separated key-value pairs inside.
        When compiled, they will become a DiamondFire Dictionary value. The main dictionary will compile differently than normal dictionary values, see above.<br><br>

        Valid dictionaries may look like <InlineCode>&lbrace;&rbrace;</InlineCode>, <InlineCode>&lbrace; a: 2 &rbrace;</InlineCode>, or
        <InlineCode>&lbrace; a: 2, b: &lbrace; c: 3 &rbrace;, &rbrace;</InlineCode>. 

    </Paragraph>

    <Section>Documentation</Section>
    <Paragraph>
        DFON Files may be documented with comments. The language supports both inline and block comments using traditional C-style comments.
        Inline comments can be started with two slashes, block comments can be started with a slash-star, and ended with a star-slash.

        <CodeSample value={`\
            |{
            |   // This is here for blablabla
            |   someVar: "whatever"
            |
            |   /* 
            |       This next section is here for yada yada yada...
            |       ... remember to blabla! 
            |   */
            |}
        `} />
    </Paragraph>

    <Section>Macros</Section>
    <Paragraph>
        Macros are where DFON strays away from mostly-normal JSON syntax. In any DFON file, any number of macros may be placed above the main dictionary.
        Macros have a name, zero or more named parameters, and a result expression. Both the macro name and parameter names must be valid identifiers.<br><br>

        Inside macros, parameter names can be used in place of regular values, which will be 
        substituted with the argument supplied to the macro when it is invoked.

        <CodeSample value={`\
            |macro justATwo() = 2
            |
            |macro pair(x, y) = [x, y]
            |
            |macro block(blockName, blockValue) = {
            |    "blockName": blockName,
            |    "miningSpeed": blockValue    
            |}
        `}/>

        Note that in the third macro definition, the <InlineCode>blockName</InlineCode> key must be written as a string. Otherwise DFON would
        think that you're using the value of the <InlineCode>blockName</InlineCode> parameter as a dictionary key!<br><br>

        Assuming these macro definitions are properly above the main dictionary, they can now be invoked in place of a regular value.
        A macro can be invoked by writing its name followed by parenthesis, with comma-separated arguments between the parenthesis.<br><br>

        With the above code, writing <InlineCode>justATwo()</InlineCode> would be the same as writing <InlineCode>2</InlineCode>.<br>
        Writing <InlineCode>pair(1, 2)</InlineCode> would be the same as writing <InlineCode>[1, 2]</InlineCode>.<br> 
        Finally, writing <InlineCode>block("stone", 12)</InlineCode> is identical to <InlineCode>&lbrace; blockName: "stone", miningSpeed: 12 &rbrace;</InlineCode><br><br>

        Properly using macros can greatly reduce the size of DFON scripts, and improve readability.
    </Paragraph>

    <Section>Large Example</Section>
    <Paragraph>
        Sometimes it's easier to read through a large example.

        <CodeSample value={`\
            |/**
            | * Macro to generate block data.
            | * @param miningTime : number - The number of ticks to mine this block by hand
            | * @param pickaxePower : number - The minimum required pickaxe power to mine this block
            | * @param drops : string[] - List of item IDs this block can drop
            | */
            |macro block(miningTime, pickaxePower, drops) = {
            |    "miningTime": miningTime,
            |    "pickaxePower": pickaxePower,
            |    "drops": drops
            |}
            |
            |
            |
            |// Holds all game data
            |{
            |
            |    // Used for blockdata lookups
            |    dirMap: {
            |        east: < 1,  0,  0>,
            |        west: <-1,  0,  0>,
            |        north: < 0,  0, -1>,
            |        south: < 0,  0,  1>,
            |        up: < 0,  1,  0>,
            |        down: < 0, -1,  0>,
            |    },
            |
            |    // Stores mineable block information
            |    blockData: {
            |              'stone': block(40, 0, ['stone']),
            |           'andesite': block(60, 1, ['stone', 'iron_scrap', 'none']),
            |        'cobblestone': block(80, 2, ['stone', 'gold_scrap', 'none']),
            |    },
            |}
        `}/>

        This code, when compiled, creates two global variables: <InlineCode>dirMap</InlineCode> and <InlineCode>blockData</InlineCode>.
    </Paragraph>

    <Section>Compilation</Section>
    <Paragraph>
        Compiled DFON code will generate one process, and 0 or more functions. All generated templates need to be placed down to work.
        You will need to manually call the process when the first player joins the plot, there is no need to manually call the functions.
    </Paragraph>

    <Section>Limits</Section>
    <Paragraph>
        DFON isn't a good fit for every project. Using it means that any time you want to change data, you will need to edit the script,
        recompile the code, and replace the templates. This is made even harder if multiple people are working on your plot.<br><br>

        The main reasons to use DFON are to make constant data easier to read through and spot bugs with, as well as providing a sort of "backup" in case 
        code is accidentally lost. Constant data is often more devastating to lose than a simple algorithm.<br><br>

        You can join my <ExternalLink href="https://discord.gg/G6nuF8zz7S">Discord</ExternalLink> to get in contact if you'd like to suggest features.
        I am still currently thinking about implementation for function hooks, embedded metadata, support for all DF datatypes, and support for items, among other things.
    </Paragraph>
</Body>