import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	HStack,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { accents } from "../theme";

const ThemeControls = ({ accent, onAccentChange }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<HStack spacing={1}>
			<Popover placement="bottom-end">
				<PopoverTrigger>
					<IconButton
						aria-label="Choose accent color"
						variant="ghost"
						size="sm"
						borderRadius="full"
						icon={
							<Box
								w="16px"
								h="16px"
								borderRadius="full"
								bg="brand.500"
								boxShadow="0 0 0 2px var(--chakra-colors-bg-surface), 0 0 0 3px var(--chakra-colors-border-default)"
							/>
						}
					/>
				</PopoverTrigger>
				<PopoverContent w="auto" bg="bg.surface" borderColor="border.subtle">
					<PopoverArrow bg="bg.surface" />
					<PopoverBody p={3}>
						<Text
							fontSize="xs"
							fontWeight="700"
							textTransform="uppercase"
							letterSpacing="wide"
							color="fg.muted"
							mb={2}
						>
							Accent color
						</Text>
						<HStack spacing={2} role="radiogroup" aria-label="Accent color">
							{Object.entries(accents).map(([name, palette]) => (
								<Box
									as="button"
									type="button"
									key={name}
									role="radio"
									aria-checked={accent === name}
									aria-label={palette.label}
									title={palette.label}
									onClick={() => onAccentChange(name)}
									w="28px"
									h="28px"
									borderRadius="full"
									bg={palette.colors[500]}
									transition="box-shadow 0.15s ease"
									boxShadow={
										accent === name
											? `0 0 0 2px var(--chakra-colors-bg-surface), 0 0 0 4px ${palette.colors[500]}`
											: "none"
									}
								/>
							))}
						</HStack>
					</PopoverBody>
				</PopoverContent>
			</Popover>
			<IconButton
				aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
				icon={isDark ? <SunIcon /> : <MoonIcon />}
				onClick={toggleColorMode}
				variant="ghost"
				size="sm"
				borderRadius="full"
				color="fg.muted"
			/>
		</HStack>
	);
};

export default ThemeControls;
