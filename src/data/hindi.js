export const meta = {
	code: "hindi",
	lang: "hi",
	path: "/hindi",
	label: "Hindi",
	nativeLabel: "हिंदी",
	fontFamily: "'Noto Sans Devanagari', sans-serif",
};

export const commonPhrases = [
	{ eng: "God", text: "परमेश्वर" },
	{ eng: "Word of God", text: "परमेश्वर का वचन" },
];

const k = (native, label) => ({ native, label });

export const layout = {
	// One array per varga; displayed two per row.
	consonants: [
		[k("क", "ka"), k("ख", "kha"), k("ग", "ga"), k("घ", "gha"), k("ङ", "nga")],
		[k("च", "ca"), k("छ", "cha"), k("ज", "ja"), k("झ", "jha"), k("ञ", "ña")],
		[k("ट", "Ṭa"), k("ठ", "Ṭha"), k("ड", "Ḍa"), k("ढ", "Ḍha"), k("ण", "Ṇa")],
		[k("त", "ta"), k("थ", "tha"), k("द", "da"), k("ध", "dha"), k("न", "na")],
		[k("प", "pa"), k("फ", "pha"), k("ब", "ba"), k("भ", "bha"), k("म", "ma")],
		[k("य", "ya"), k("र", "ra"), k("ल", "la"), k("व", "va")],
		[k("श", "śa"), k("ष", "Ṣa"), k("स", "sa"), k("ह", "ha")],
		[k("क्ष", "kṣa"), k("त्र", "tra"), k("ज्ञ", "gya"), k("श्र", "śra")],
	],
	vowels: [
		k("अ", "a"),
		k("आ", "aa"),
		k("इ", "e"),
		k("ई", "ee"),
		k("उ", "o"),
		k("ऊ", "oo"),
		k("ऋ", "ru"),
		k("ए", "ae"),
		k("ऐ", "aei"),
		k("ओ", "ou"),
		k("औ", "oui"),
	],
	// Same order as vowels, so each sign sits under its vowel.
	matras: [
		k("्", "halant"),
		k("ा", "aa"),
		k("ि", "e"),
		k("ी", "ee"),
		k("ु", "o"),
		k("ू", "oo"),
		k("ृ", "ru"),
		k("े", "ae"),
		k("ै", "aei"),
		k("ो", "ou"),
		k("ौ", "oui"),
	],
	signs: [
		k("ं", "anusvara"),
		k("ँ", "chandrabindu"),
		k("ः", "visarga"),
		k("़", "nukta"),
		k("।", "danda"),
		k("॥", "dbl danda"),
		k("॰", "abbr."),
		k("ऽ", "avagraha"),
		k("ॐ", "om"),
	],
	numbers: [
		k("१", "1"),
		k("२", "2"),
		k("३", "3"),
		k("४", "4"),
		k("५", "5"),
		k("६", "6"),
		k("७", "7"),
		k("८", "8"),
		k("९", "9"),
		k("०", "0"),
	],
};
