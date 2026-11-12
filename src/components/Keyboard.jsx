import { Box, Button, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import KeyButton, { keyStyles, tones } from "./KeyButton";

const keyGap = { base: 1, md: 1.5 };

const padTo = (keys, size) => [...keys, ...Array(Math.max(0, size - keys.length)).fill(null)];

const chunk = (keys, size) =>
	Array.from({ length: Math.ceil(keys.length / size) }, (_, i) => keys.slice(i * size, i * size + size));

const Legend = () => (
	<HStack spacing={{ base: 3, md: 4 }} wrap="wrap" rowGap={1} mb={{ base: 2, md: 3 }} aria-hidden="true">
		{Object.entries(tones).map(([name, tone]) => (
			<HStack key={name} spacing={1.5}>
				<Box w="10px" h="10px" borderRadius="sm" bg={tone.bg} border="1px solid" borderColor={tone.border} />
				<Text fontSize={{ base: "10px", md: "xs" }} color="fg.muted" fontWeight="500">
					{tone.label}
				</Text>
			</HStack>
		))}
	</HStack>
);

const Keyboard = ({ layout, meta, onPress, onBackspace }) => {
	const { consonants, vowels, matras, signs, numbers } = layout;
	const key = (k, tone, props) =>
		k ? (
			<KeyButton
				key={k.native}
				native={k.native}
				label={k.label}
				tone={tone}
				fontFamily={meta.fontFamily}
				onPress={onPress}
				{...props}
			/>
		) : null;
	const empty = (id) => <Box key={id} aria-hidden="true" />;

	// Each vowel row is followed by its matching vowel-sign row.
	const vowelRows = chunk(vowels, 6).flatMap((row, i) => [
		padTo(row, 6).map((k, j) => (k ? key(k, "vowel") : empty(`v${i}-${j}`))),
		padTo(chunk(matras, 6)[i] || [], 6).map((k, j) => (k ? key(k, "matra") : empty(`m${i}-${j}`))),
	]);

	return (
		<Box
			as="section"
			aria-label={`${meta.label} keys`}
			bg="bg.surface"
			borderRadius="xl"
			boxShadow="0 1px 3px rgba(16, 24, 40, 0.08)"
			border="1px solid"
			borderColor="border.subtle"
			p={{ base: 2, md: 4 }}
		>
			<Legend />

			<Grid
				templateColumns={{ base: "6fr 3fr", md: "6fr 3fr 3fr", lg: "10fr 6fr 3fr 3fr" }}
				templateAreas={{
					base: `"c c" "v s" "n n"`,
					md: `"c c c" "v s n"`,
					lg: `"c v s n"`,
				}}
				columnGap={{ base: 2, md: 4 }}
				rowGap={{ base: 2, md: 3 }}
				alignItems="start"
			>
				<GridItem area="c" as="section" aria-label="Consonants">
					<Grid templateColumns="1fr 1fr" columnGap={{ base: 2, md: 3 }} rowGap={keyGap}>
						{consonants.map((varga) => (
							<Grid key={varga[0].native} templateColumns="repeat(5, minmax(0, 1fr))" gap={keyGap}>
								{padTo(varga, 5).map((k, j) => (k ? key(k, "consonant") : empty(`${varga[0].native}-${j}`)))}
							</Grid>
						))}
					</Grid>
				</GridItem>

				<GridItem area="v" as="section" aria-label="Vowels and vowel signs">
					<Grid templateColumns="repeat(6, minmax(0, 1fr))" gap={keyGap}>
						{vowelRows.flat()}
					</Grid>
				</GridItem>

				<GridItem area="s" as="section" aria-label="Signs and punctuation">
					<Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={keyGap}>
						{signs.map((k) => key(k, "sign"))}
					</Grid>
				</GridItem>

				<GridItem area="n" as="section" aria-label="Numbers">
					<Grid
						templateColumns={{ base: "repeat(10, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }}
						gap={keyGap}
					>
						{numbers.map((k, i) =>
							key(k, "sign", i === numbers.length - 1 ? { gridColumn: { md: 2 } } : undefined),
						)}
					</Grid>
				</GridItem>
			</Grid>

			<Grid templateColumns="1fr 4fr 1fr" gap={keyGap} mt={{ base: 2, md: 3 }}>
				<Button {...keyStyles} bg="key.sign.bg" onClick={() => onPress("\n")} aria-label="New line" title="New line">
					<Text as="span" fontSize="lg">↵</Text>
				</Button>
				<Button {...keyStyles} onClick={() => onPress(" ")} aria-label="Space">
					<Text as="span" fontSize="sm" color="fg.muted" fontWeight="500">space</Text>
				</Button>
				<Button {...keyStyles} bg="key.sign.bg" onClick={onBackspace} aria-label="Backspace" title="Backspace">
					<Text as="span" fontSize="lg">⌫</Text>
				</Button>
			</Grid>
		</Box>
	);
};

export default Keyboard;
