export const meta = {
	code: "odia",
	lang: "or",
	path: "/odia",
	label: "Odia",
	nativeLabel: "ଓଡ଼ିଆ",
	fontFamily: "'Noto Sans Oriya', sans-serif",
};

export const commonPhrases = [
	{ eng: "God", text: "ପରମେଶ୍ୱର" },
	{ eng: "Word of God", text: "ପରମେଶ୍ୱରଙ୍କ ବାକ୍ୟ" },
];

const k = (native, label) => ({ native, label });

export const layout = {
	// One array per varga; displayed two per row.
	consonants: [
		[k("କ", "ka"), k("ଖ", "kha"), k("ଗ", "ga"), k("ଘ", "gha"), k("ଙ", "nga")],
		[k("ଚ", "ca"), k("ଛ", "cha"), k("ଜ", "ja"), k("ଝ", "jha"), k("ଞ", "ña")],
		[k("ଟ", "Ṭa"), k("ଠ", "Ṭha"), k("ଡ", "Ḍa"), k("ଢ", "Ḍha"), k("ଣ", "Ṇa")],
		[k("ତ", "ta"), k("ଥ", "tha"), k("ଦ", "da"), k("ଧ", "dha"), k("ନ", "na")],
		[k("ପ", "pa"), k("ଫ", "pha"), k("ବ", "ba"), k("ଭ", "bha"), k("ମ", "ma")],
		[k("ଯ", "ya"), k("ର", "ra"), k("ଲ", "la"), k("ଳ", "Ḷa"), k("ଵ", "va")],
		[k("ଶ", "śa"), k("ଷ", "Ṣa"), k("ସ", "sa"), k("ହ", "ha")],
		[k("କ୍ଷ", "kṣa"), k("ତ୍ର", "tra"), k("ଜ୍ଞ", "gya"), k("ଶ୍ର", "śra")],
	],
	vowels: [
		k("ଅ", "a"),
		k("ଆ", "aa"),
		k("ଇ", "e"),
		k("ଈ", "ee"),
		k("ଉ", "o"),
		k("ଊ", "oo"),
		k("ଋ", "ru"),
		k("ଏ", "ae"),
		k("ଐ", "aei"),
		k("ଓ", "ou"),
		k("ଔ", "oui"),
	],
	// Same order as vowels, so each sign sits under its vowel.
	matras: [
		k("୍", "hasanta"),
		k("ା", "aa"),
		k("ି", "e"),
		k("ୀ", "ee"),
		k("ୁ", "o"),
		k("ୂ", "oo"),
		k("ୃ", "ru"),
		k("େ", "ae"),
		k("ୈ", "aei"),
		k("ୋ", "ou"),
		k("ୌ", "oui"),
	],
	signs: [
		k("ଂ", "anusvara"),
		k("ଁ", "chandrabindu"),
		k("ଃ", "visarga"),
		k("଼", "nukta"),
		k("।", "danda"),
		k("॥", "dbl danda"),
		k("ଽ", "avagraha"),
	],
	numbers: [
		k("୧", "1"),
		k("୨", "2"),
		k("୩", "3"),
		k("୪", "4"),
		k("୫", "5"),
		k("୬", "6"),
		k("୭", "7"),
		k("୮", "8"),
		k("୯", "9"),
		k("୦", "0"),
	],
};
