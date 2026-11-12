import { CopyIcon, SmallCloseIcon, StarIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Text,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { forwardRef, useRef, useState } from "react";

const OutputPanel = forwardRef(({ text, onChange, onClear, onSavePhrase, meta }, textareaRef) => {
	const toast = useToast();
	const save = useDisclosure();
	const labelInputRef = useRef(null);
	const [draft, setDraft] = useState("");
	const [label, setLabel] = useState("");
	const isEmpty = text.trim() === "";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			toast({ title: "Copied to clipboard", status: "success", duration: 1500, position: "top" });
		} catch {
			toast({ title: "Couldn't copy. Select the text and copy it manually.", status: "error", position: "top" });
		}
	};

	const openSave = () => {
		const el = textareaRef.current;
		const hasSelection = el && el.selectionStart !== el.selectionEnd;
		setDraft((hasSelection ? text.slice(el.selectionStart, el.selectionEnd) : text).trim());
		setLabel("");
		save.onOpen();
	};

	const handleSave = (e) => {
		e.preventDefault();
		onSavePhrase(draft, label);
		save.onClose();
	};

	return (
		<Box
			bg="bg.surface"
			borderRadius="xl"
			boxShadow="0 1px 3px rgba(16, 24, 40, 0.08)"
			border="1px solid"
			borderColor="border.subtle"
			p={{ base: 3, md: 4 }}
		>
			<Textarea
				ref={textareaRef}
				value={text}
				onChange={(e) => onChange(e.target.value)}
				aria-label={`${meta.label} text`}
				lang={meta.lang}
				inputMode="none"
				placeholder="Tap the keys below to start typing…"
				h={{ base: "76px", md: "104px" }}
				fontFamily={meta.fontFamily}
				fontSize={{ base: "xl", md: "2xl" }}
				bg="bg.surface"
				borderRadius="lg"
				borderColor="border.default"
				resize="vertical"
				_placeholder={{ color: "fg.subtle", fontFamily: "body", fontSize: { base: "md", md: "lg" } }}
				_hover={{ borderColor: "border.accent" }}
				_focusVisible={{
					borderColor: "brand.400",
					boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
				}}
			/>
			<HStack justify="space-between" mt={{ base: 2, md: 3 }} spacing={2}>
				<HStack spacing={2}>
					<Button size="sm" colorScheme="brand" rightIcon={<CopyIcon />} onClick={handleCopy} isDisabled={isEmpty}>
						Copy
					</Button>
					<Popover
						isOpen={save.isOpen}
						onClose={save.onClose}
						initialFocusRef={labelInputRef}
						placement="bottom-start"
					>
						<PopoverTrigger>
							<Button
								size="sm"
								variant="outline"
								borderColor="border.default"
								rightIcon={<StarIcon boxSize={3} />}
								onClick={openSave}
								isDisabled={isEmpty}
							>
								Save phrase
							</Button>
						</PopoverTrigger>
						<PopoverContent bg="bg.surface" borderColor="border.subtle" maxW="300px">
							<PopoverArrow bg="bg.surface" />
							<PopoverBody as="form" onSubmit={handleSave} p={4}>
								<Text fontSize="xs" color="fg.muted" mb={1}>
									Saving
								</Text>
								<Text fontFamily={meta.fontFamily} fontSize="lg" noOfLines={2} mb={3}>
									{draft}
								</Text>
								<FormControl>
									<FormLabel fontSize="sm" mb={1}>
										Meaning <Text as="span" color="fg.subtle" fontWeight="400">(optional)</Text>
									</FormLabel>
									<Input
										ref={labelInputRef}
										size="sm"
										borderRadius="md"
										value={label}
										onChange={(e) => setLabel(e.target.value)}
										placeholder="e.g. Good morning"
									/>
								</FormControl>
								<HStack justify="flex-end" mt={3}>
									<Button size="sm" variant="ghost" onClick={save.onClose}>
										Cancel
									</Button>
									<Button size="sm" colorScheme="brand" type="submit">
										Save
									</Button>
								</HStack>
							</PopoverBody>
						</PopoverContent>
					</Popover>
					<Button size="sm" variant="ghost" rightIcon={<SmallCloseIcon />} onClick={onClear} isDisabled={text === ""}>
						Clear
					</Button>
				</HStack>
				<Text fontSize="xs" color="fg.subtle" display={{ base: "none", sm: "block" }}>
					{text.length} characters
				</Text>
			</HStack>
		</Box>
	);
});

export default OutputPanel;
