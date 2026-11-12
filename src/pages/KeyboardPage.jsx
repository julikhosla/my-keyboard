import { Box, Grid, GridItem, VisuallyHidden, useToast } from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Keyboard from "../components/Keyboard";
import OutputPanel from "../components/OutputPanel";
import PhrasesPanel from "../components/PhrasesPanel";
import usePersistentState from "../hooks/usePersistentState";

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const KeyboardPage = ({ meta, layout, commonPhrases }) => {
	const toast = useToast();
	const [text, setText] = usePersistentState(`kb.text.${meta.code}`, "");
	const [phrases, setPhrases] = usePersistentState(`kb.phrases.${meta.code}`, () =>
		commonPhrases.map((p, i) => ({ id: `default-${i}`, text: p.text, label: p.eng, uses: 0 })),
	);
	const textareaRef = useRef(null);
	const pendingCaret = useRef(null);

	// Rank by usage once per visit so phrases don't jump around while being tapped.
	const [rank] = useState(
		() => new Map([...phrases].sort((a, b) => b.uses - a.uses).map((p, i) => [p.id, i])),
	);
	const sortedPhrases = useMemo(
		() => [...phrases].sort((a, b) => (rank.get(a.id) ?? -1) - (rank.get(b.id) ?? -1)),
		[phrases, rank],
	);

	useEffect(() => {
		const el = textareaRef.current;
		if (el) el.setSelectionRange(el.value.length, el.value.length);
	}, []);

	useLayoutEffect(() => {
		const el = textareaRef.current;
		if (!el || pendingCaret.current === null) return;
		el.setSelectionRange(pendingCaret.current, pendingCaret.current);
		pendingCaret.current = null;
	}, [text]);

	const edit = (fn) => {
		const el = textareaRef.current;
		const start = el ? el.selectionStart : text.length;
		const end = el ? el.selectionEnd : text.length;
		const result = fn(text, start, end);
		if (result.value === text) return;
		pendingCaret.current = result.caret;
		setText(result.value);
	};

	const insert = (chars) =>
		edit((prev, start, end) => ({
			value: prev.slice(0, start) + chars + prev.slice(end),
			caret: start + chars.length,
		}));

	const backspace = () =>
		edit((prev, start, end) => {
			if (start !== end) return { value: prev.slice(0, start) + prev.slice(end), caret: start };
			if (start === 0) return { value: prev, caret: 0 };
			return { value: prev.slice(0, start - 1) + prev.slice(end), caret: start - 1 };
		});

	const applyPhrase = (phrase) => {
		insert(phrase.text);
		setPhrases((list) => list.map((p) => (p.id === phrase.id ? { ...p, uses: p.uses + 1 } : p)));
	};

	const savePhrase = (phraseText, label) => {
		const value = phraseText.trim();
		if (!value) return;
		if (phrases.some((p) => p.text === value)) {
			toast({ title: "That phrase is already saved", status: "info", duration: 2000, position: "top" });
			return;
		}
		setPhrases((list) => [...list, { id: newId(), text: value, label: label.trim(), uses: 0 }]);
		toast({ title: "Phrase saved", status: "success", duration: 1500, position: "top" });
	};

	const deletePhrase = (id) => setPhrases((list) => list.filter((p) => p.id !== id));

	return (
		<Box maxW="1200px" mx="auto" px={{ base: 3, md: 6 }} pt={{ base: 2, md: 4 }} pb={6}>
			<VisuallyHidden as="h2">{meta.label} keyboard</VisuallyHidden>

			<Grid
				templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 2fr) minmax(0, 1fr)" }}
				templateAreas={{
					base: `"output" "keys" "phrases"`,
					lg: `"output phrases" "keys keys"`,
				}}
				columnGap={4}
				rowGap={{ base: 2, md: 4 }}
			>
				<GridItem
					area="output"
					position={{ base: "sticky", lg: "static" }}
					top={0}
					zIndex={5}
					bg="bg.canvas"
					mx={{ base: -3, md: -6, lg: 0 }}
					px={{ base: 3, md: 6, lg: 0 }}
					py={{ base: 1, md: 2, lg: 0 }}
				>
					<OutputPanel
						ref={textareaRef}
						text={text}
						meta={meta}
						onChange={setText}
						onClear={() => setText("")}
						onSavePhrase={savePhrase}
					/>
				</GridItem>

				<GridItem area="keys">
					<Keyboard layout={layout} meta={meta} onPress={insert} onBackspace={backspace} />
				</GridItem>

				{/* On desktop the phrases panel is pinned to the text panel's height and scrolls inside. */}
				<GridItem area="phrases" position="relative" minH={{ base: "auto", lg: "160px" }}>
					<Box position={{ base: "static", lg: "absolute" }} inset={0}>
						<PhrasesPanel
							phrases={sortedPhrases}
							fontFamily={meta.fontFamily}
							lang={meta.lang}
							onUse={applyPhrase}
							onDelete={deletePhrase}
						/>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default KeyboardPage;
