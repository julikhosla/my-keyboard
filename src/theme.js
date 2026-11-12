import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const violet = {
	50: "#f1edff",
	100: "#d9ccff",
	200: "#bfa9ff",
	300: "#a386fd",
	400: "#8a66f7",
	500: "#7049e8",
	600: "#5a37c4",
	700: "#44299b",
	800: "#2e1c6e",
	900: "#1a0f42",
};

export const accents = {
	violet: { label: "Violet", colors: violet },
	blue: { label: "Blue", colors: chakraTheme.colors.blue },
	teal: { label: "Teal", colors: chakraTheme.colors.teal },
	pink: { label: "Pink", colors: chakraTheme.colors.pink },
	orange: { label: "Orange", colors: chakraTheme.colors.orange },
};

const theme = extendTheme({
	config: {
		initialColorMode: "system",
		useSystemColorMode: false,
	},
	fonts: {
		heading: "'Inter', sans-serif",
		body: "'Inter', sans-serif",
	},
	colors: {
		brand: violet,
	},
	semanticTokens: {
		colors: {
			"bg.canvas": { default: "#f5f6fb", _dark: "#0e1016" },
			"bg.surface": { default: "white", _dark: "#171a23" },
			"bg.muted": { default: "gray.100", _dark: "whiteAlpha.100" },
			"bg.key": { default: "white", _dark: "#1f2330" },
			"bg.keyHover": { default: "brand.50", _dark: "#282d3d" },
			"bg.keyActive": { default: "brand.100", _dark: "#323849" },
			"key.vowel.bg": { default: "#fff6e5", _dark: "#29231a" },
			"key.vowel.border": { default: "#f3dcae", _dark: "#4a3d22" },
			"key.matra.bg": { default: "#eef4ff", _dark: "#18223a" },
			"key.matra.border": { default: "#cddffa", _dark: "#2a3c5e" },
			"key.sign.bg": { default: "#f2f3f6", _dark: "#191c25" },
			"key.sign.border": { default: "gray.200", _dark: "whiteAlpha.200" },
			"border.subtle": { default: "gray.100", _dark: "whiteAlpha.100" },
			"border.default": { default: "gray.200", _dark: "whiteAlpha.200" },
			"border.accent": { default: "brand.300", _dark: "brand.400" },
			"fg.default": { default: "gray.800", _dark: "gray.100" },
			"fg.muted": { default: "gray.500", _dark: "gray.400" },
			"fg.subtle": { default: "gray.400", _dark: "gray.500" },
			"fg.accent": { default: "brand.700", _dark: "brand.200" },
		},
	},
	styles: {
		global: {
			"html, body": {
				bg: "bg.canvas",
				color: "fg.default",
			},
			"*:focus-visible": {
				outline: "2px solid var(--chakra-colors-brand-500)",
				outlineOffset: "2px",
			},
		},
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: "600",
				borderRadius: "lg",
			},
		},
	},
});

export default theme;
