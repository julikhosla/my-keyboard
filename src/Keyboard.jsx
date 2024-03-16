import {
	Button,
	Grid,
	HStack,
	SimpleGrid,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Keyboard = () => {
	const [typedText, setTypedText] = useState("");
	const oriya_keys = {
		oriya_alphabets_set1: {
			କ: "ka",
			ଖ: "kha",
			ଗ: "ga",
			ଘ: "gha",
			ଙ: "nga",
			ଚ: "ca",
			ଛ: "cha",
			ଜ: "ja",
			ଝ: "jha",
			ଞ: "ña",
			ଟ: "Ṭa",
			ଠ: "Ṭha",
			ଡ: "Ḍa",
			ଢ: "Ḍha",
			ଣ: "Ṇa",
			ତ: "ta",
			ଥ: "tha",
			ଦ: "da",
			ଧ: "dha",
			ନ: "na",
			ପ: "pa",
			ଫ: "pha",
			ବ: "ba",
			ଭ: "bha",
			ମ: "ma",
			ଯ: "ya",
			ର: "ra",
			ଲ: "la",
			ଳ: "Ḷa",
			ଵ: "va",
			ଶ: "śa",
			ଷ: "Ṣa",
			ସ: "sa",
			ହ: "ha",
			ୟ: "Ya",
			ଡ଼: "Ṛa",
			ଢ଼: "Ṛha",
			ୱ: "wa",
		},
		oriya_alphabets_set2: {
			set1: {
				ଅ: "a",
				ଆ: "ā",
				ଇ: "i",
				ଈ: "ī",
				ଉ: "u",
				ଊ: "ū",
			},
			set2: {
				"ା": "ା",
				"ି": "ି",
				"ୀ": "ୀ",
				"ୁ": "ୁ",
				"ୂ": "ୂ",
			},
			set3: {
				ଋ: "ri",
				ୠ: "rī",
				ଌ: "li",
				ୡ: "lī",
			},
			set4: {
				"ୃ": "ୃ",
				"ୄ": "ୄ",
				"ୢ": "ୢ",
				"ୣ": "ୣ",
			},
			set5: {
				"୕": "୕",
				"୕ଁ": "୕ଁ",
				"ଂ": "ଂ",
				"ଃ": "ଃ",
				"଼": "଼",
				ଽ: "ଽ",
			},
			set6: {
				0: "୦",
				1: "୧",
				2: "୨",
				3: "୩",
				4: "୪",
				5: "୫",
				6: "୬",
				7: "୭",
				8: "୮",
				9: "୯",
			},
			set7: {
				ଏ: "e",
				ଐ: "ai",
				ଓ: "o",
				ଔ: "au",
			},
			set8: {
				"େ": "େ",
				"ୈ": "ୈ",
				"ୋ": "ୋ",
				"ୌ": "ୌ",
			},
			set9: {
				"ୖ": "ୖ",
				"ୣୗ": "ୣୗ",
			},
		},
	};

	// punctuation: {
	//   comma: ",",
	//   full_stop: ".",
	//   question_mark: "?",
	//   exclamation_mark: "!",
	//   semicolon: ";",
	//   colon: ":",
	//   ellipsis: "…",
	//   hyphen: "-",
	//   en_dash: "–",
	//   em_dash: "—",
	//   single_quotation_mark: "'",
	//   double_quotation_mark: '"',
	//   parentheses: "()",
	//   square_brackets: "[]",
	//   curly_brackets: "{}",
	//   angle_brackets: "<>",
	//   slash: "/",
	//   backslash: "\\",
	//   ampersand: "&",
	//   asterisk: "*",
	//   hash: "#",
	//   percent: "%",
	//   caret: "^",
	//   underscore: "_",
	//   at_sign: "@",
	//   dollar_sign: "$",
	//   plus_sign: "+",
	//   minus_sign: "-",
	//   equals_sign: "=",
	//   vertical_bar: "|",
	//   tilde: "~",
	//   grave_accent: "`",
	// },
	const handleKeyPress = (key) => {
		setTypedText(typedText + key);
	};

	return (
		<VStack
			minH={"100vh"}
			maxW={"100vw"}
			overflowY={"auto"}
			justify={"space-around"}
			m={{ base: "1em", lg: 0 }}
			p={{ base: "10px", md: "1em" }}
			bg={
				"linear-gradient(104deg, rgba(219,229,255,1) 0%, rgba(222,222,222,1) 100%);"
			}
		>
			<Textarea
				rows={3}
				value={typedText}
				border={"2px solid purple"}
				fontSize={{ base: "1em", md: "2em" }}
				onChange={(e) => setTypedText(e.target.value)}
			/>
			<SimpleGrid
				columns={{ base: 1, lg: 2 }}
				spacing={0}
				gap={"4em"}
				maxW={"1200px"}
			>
				<Grid
					templateColumns={{
						base: "repeat(6, 1fr)",
						md: "repeat(6, 1fr)",
					}}
					gap={0}
					mt={1}
				>
					{Object.entries(oriya_keys.oriya_alphabets_set1).map(
						([category, keys]) => (
							<div key={category}>
								<Text>{keys}</Text>
								<Button
									onClick={() => handleKeyPress(category)}
									colorScheme="purple"
									size={{ base: "sm", md: "lg" }}
									fontSize={{ base: "lg", md: "xl" }}
									variant="outline"
								>
									{category}
								</Button>
							</div>
						),
					)}
				</Grid>
				<VStack spacing={0}>
					<Grid
						templateColumns={{
							base: "repeat(6, 1fr)",
						}}
						gap={2}
						mt={1}
					>
						{Object.entries(oriya_keys.oriya_alphabets_set2.set1).map(
							([category, keys]) => (
								<div key={category}>
									<Text>{keys}</Text>
									<Button
										onClick={() => handleKeyPress(category)}
										colorScheme="purple"
										size={{ base: "sm", md: "lg" }}
										fontSize={{ base: "lg", md: "2xl" }}
										variant="outline"
									>
										{category}
									</Button>
								</div>
							),
						)}
					</Grid>
					<Grid
						templateColumns={{
							base: "repeat(6, 1fr)",
						}}
						gap={3}
						mt={1}
						ml={"6em"}
					>
						{Object.entries(oriya_keys.oriya_alphabets_set2.set2).map(
							([category, keys]) => (
								<div key={category}>
									<Button
										onClick={() => handleKeyPress(category)}
										colorScheme="purple"
										size={{ base: "sm", md: "lg" }}
										fontSize={{ base: "lg", md: "2xl" }}
										variant="outline"
									>
										{category}
									</Button>
								</div>
							),
						)}
					</Grid>
					<HStack
						justify={"center"}
						spacing={5}
						flexDir={{ base: "column", md: "row" }}
					>
						<VStack>
							<Grid
								templateColumns={{
									base: "repeat(4, 1fr)",
								}}
								gap={3}
							>
								{Object.entries(oriya_keys.oriya_alphabets_set2.set3).map(
									([category, keys]) => (
										<div key={category}>
											<Text>{keys}</Text>
											<Button
												onClick={() => handleKeyPress(category)}
												colorScheme="purple"
												size={{ base: "sm", md: "lg" }}
												fontSize={{ base: "lg", md: "2xl" }}
												variant="outline"
											>
												{category}
											</Button>
										</div>
									),
								)}
							</Grid>
							<Grid
								templateColumns={{
									base: "repeat(3, 1fr)",
								}}
								gap={3}
								mt={1}
							>
								{Object.entries(oriya_keys.oriya_alphabets_set2.set4).map(
									([category, keys]) => (
										<div key={category}>
											<Button
												onClick={() => handleKeyPress(category)}
												colorScheme="purple"
												size={{ base: "sm", md: "lg" }}
												fontSize={{ base: "lg", md: "2xl" }}
												variant="outline"
											>
												{category}
											</Button>
										</div>
									),
								)}
							</Grid>
						</VStack>
						<VStack>
							<Grid
								templateColumns={{
									base: "repeat(6, 1fr)",
								}}
								gap={3}
								mt={1}
							>
								{Object.entries(oriya_keys.oriya_alphabets_set2.set7).map(
									([category, keys]) => (
										<div key={category}>
											<Text>{keys}</Text>
											<Button
												onClick={() => handleKeyPress(category)}
												colorScheme="purple"
												size={{ base: "sm", md: "lg" }}
												fontSize={{ base: "lg", md: "2xl" }}
												variant="outline"
											>
												{category}
											</Button>
										</div>
									),
								)}
							</Grid>
							<Grid
								templateColumns={{
									base: "repeat(6, 1fr)",
								}}
								gap={3}
								mt={1}
							>
								{Object.entries(oriya_keys.oriya_alphabets_set2.set8).map(
									([category, keys]) => (
										<div key={category}>
											<Button
												onClick={() => handleKeyPress(category)}
												colorScheme="purple"
												size={{ base: "sm", md: "lg" }}
												fontSize={{ base: "lg", md: "2xl" }}
												variant="outline"
											>
												{category}
											</Button>
										</div>
									),
								)}
							</Grid>
							<Grid
								templateColumns={{
									base: "repeat(6, 1fr)",
								}}
								gap={3}
								mt={1}
							>
								{Object.entries(oriya_keys.oriya_alphabets_set2.set9).map(
									([category, keys]) => (
										<div key={category}>
											<Button
												onClick={() => handleKeyPress(category)}
												colorScheme="purple"
												size={{ base: "sm", md: "lg" }}
												fontSize={{ base: "lg", md: "2xl" }}
												variant="outline"
											>
												{category}
											</Button>
										</div>
									),
								)}
							</Grid>
						</VStack>
					</HStack>
					<Grid
						templateColumns={{
							base: "repeat(6, 1fr)",
						}}
						gap={3}
						mt={1}
					>
						{Object.entries(oriya_keys.oriya_alphabets_set2.set5).map(
							([category, keys]) => (
								<div key={category}>
									<Button
										onClick={() => handleKeyPress(category)}
										colorScheme="purple"
										size={{ base: "sm", md: "lg" }}
										fontSize={{ base: "lg", md: "2xl" }}
										variant="outline"
									>
										{category}
									</Button>
								</div>
							),
						)}
					</Grid>
					<Grid
						templateColumns={{
							base: "repeat(5, 1fr)",
						}}
						gap={3}
						mt={1}
					>
						{Object.entries(oriya_keys.oriya_alphabets_set2.set6).map(
							([category, keys]) => (
								<div key={category}>
									<Text>{category}</Text>
									<Button
										onClick={() => handleKeyPress(keys)}
										colorScheme="purple"
										size={{ base: "sm", md: "lg" }}
										fontSize={{ base: "lg", md: "2xl" }}
										variant="outline"
									>
										{keys}
									</Button>
								</div>
							),
						)}
					</Grid>
				</VStack>
			</SimpleGrid>
		</VStack>
	);
};

export default Keyboard;
