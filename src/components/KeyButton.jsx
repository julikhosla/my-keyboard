import { Button, Text } from "@chakra-ui/react";

const DOTTED_CIRCLE = "◌";
const isCombiningMark = (s) => /^\p{M}/u.test(s);

export const tones = {
	consonant: { label: "Consonants", bg: "bg.key", border: "border.default" },
	vowel: { label: "Vowels", bg: "key.vowel.bg", border: "key.vowel.border" },
	matra: { label: "Vowel signs", bg: "key.matra.bg", border: "key.matra.border" },
	sign: { label: "Signs & numbers", bg: "key.sign.bg", border: "key.sign.border" },
};

export const keyStyles = {
	variant: "unstyled",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	w: "100%",
	minW: 0,
	h: { base: "38px", md: "48px" },
	px: 0.5,
	bg: "bg.key",
	color: "fg.default",
	border: "1px solid",
	borderColor: "border.default",
	borderRadius: { base: "md", md: "lg" },
	boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)",
	transition: "background 0.1s ease, border-color 0.1s ease, transform 0.1s ease",
	_hover: { bg: "bg.keyHover", borderColor: "border.accent" },
	_active: { bg: "bg.keyActive", transform: "scale(0.95)" },
	// Keep the caret in the textarea when a key is clicked with the mouse or touch.
	onMouseDown: (e) => e.preventDefault(),
};

const KeyButton = ({ native, label, fontFamily, tone = "consonant", onPress, ...rest }) => {
	const display = isCombiningMark(native) ? DOTTED_CIRCLE + native : native;

	return (
		<Button
			{...keyStyles}
			bg={tones[tone].bg}
			borderColor={tones[tone].border}
			onClick={() => onPress(native)}
			aria-label={`${native}, ${label}`}
			title={label}
			{...rest}
		>
			<Text as="span" fontFamily={fontFamily} fontSize={{ base: "lg", md: "xl" }} fontWeight="500" lineHeight="1.2">
				{display}
			</Text>
			<Text
				as="span"
				fontSize={{ base: "9px", md: "10px" }}
				fontWeight="500"
				color="fg.subtle"
				lineHeight="1.1"
				noOfLines={1}
				maxW="100%"
			>
				{label}
			</Text>
		</Button>
	);
};

export default KeyButton;
