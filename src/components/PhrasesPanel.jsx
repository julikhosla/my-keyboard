import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { useId } from "react";

const PhrasesPanel = ({ phrases, fontFamily, lang, onUse, onDelete }) => {
	const headingId = useId();

	return (
		<Box
			as="section"
			aria-labelledby={headingId}
			bg="bg.surface"
			borderRadius="xl"
			boxShadow="0 1px 3px rgba(16, 24, 40, 0.08)"
			border="1px solid"
			borderColor="border.subtle"
			p={4}
			h="100%"
			display="flex"
			flexDirection="column"
		>
			<Flex justify="space-between" align="baseline" gap={2}>
				<Heading
					id={headingId}
					as="h3"
					fontSize="xs"
					fontWeight="700"
					letterSpacing="wide"
					textTransform="uppercase"
					color="fg.muted"
				>
					Saved phrases
				</Heading>
				{phrases.length > 1 && (
					<Text fontSize="xs" color="fg.subtle">
						Most used first
					</Text>
				)}
			</Flex>

			{phrases.length === 0 ? (
				<Text fontSize="sm" color="fg.muted" mt={3}>
					Nothing saved yet. Type a word or sentence, then tap <b>Save phrase</b> to keep it here. Phrases are
					stored on this device only.
				</Text>
			) : (
				<VStack as="ul" listStyleType="none" align="stretch" spacing={1} mt={2} flex="1" minH={0} overflowY="auto" mx={-1} px={1}>
					{phrases.map((phrase) => (
						<HStack as="li" key={phrase.id} spacing={1} role="group">
							<Button
								flex="1"
								minW={0}
								h="auto"
								py={1.5}
								px={3}
								variant="ghost"
								justifyContent="space-between"
								gap={3}
								whiteSpace="normal"
								textAlign="left"
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => onUse(phrase)}
								_hover={{ bg: "bg.keyHover" }}
							>
								<Text as="span" lang={lang} fontFamily={fontFamily} fontSize="lg" fontWeight="500" color="fg.default">
									{phrase.text}
								</Text>
								{phrase.label && (
									<Text as="span" fontSize="xs" fontWeight="500" color="fg.muted" flexShrink={0}>
										{phrase.label}
									</Text>
								)}
							</Button>
							<IconButton
								aria-label={`Delete “${phrase.label || phrase.text}”`}
								icon={<SmallCloseIcon />}
								size="xs"
								variant="ghost"
								color="fg.subtle"
								opacity={{ base: 1, lg: 0 }}
								_groupHover={{ opacity: 1 }}
								_focusVisible={{ opacity: 1 }}
								onClick={() => onDelete(phrase.id)}
							/>
						</HStack>
					))}
				</VStack>
			)}
		</Box>
	);
};

export default PhrasesPanel;
