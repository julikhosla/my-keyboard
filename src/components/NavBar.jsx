import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { meta as hindiMeta } from "../data/hindi";
import { meta as odiaMeta } from "../data/odia";
import ThemeControls from "./ThemeControls";

const languages = [hindiMeta, odiaMeta];

const NavBar = ({ accent, onAccentChange }) => {
	return (
		<Box
			as="header"
			position={{ base: "static", lg: "sticky" }}
			top={0}
			zIndex={10}
			bg="bg.surface"
			borderBottom="1px solid"
			borderColor="border.subtle"
		>
			<Flex maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} h={{ base: "52px", md: "60px" }} align="center" justify="space-between" gap={3}>
				<Heading as="h1" fontSize={{ base: "md", md: "lg" }} color="fg.accent" whiteSpace="nowrap">
					Bhasha
					<Text as="span" display={{ base: "none", sm: "inline" }}>
						{" "}
						Keyboard
					</Text>
				</Heading>

				<HStack spacing={{ base: 1, md: 3 }}>
					<HStack as="nav" aria-label="Keyboard language" spacing={1} bg="bg.muted" borderRadius="full" p={1}>
						{languages.map((lang) => (
							<Box
								as={NavLink}
								key={lang.code}
								to={lang.path}
								px={{ base: 3, md: 4 }}
								py={1.5}
								borderRadius="full"
								fontSize="sm"
								fontWeight="600"
								color="fg.muted"
								whiteSpace="nowrap"
								transition="all 0.15s ease"
								_hover={{ color: "fg.accent" }}
								sx={{
									"&.active": {
										backgroundColor: "var(--chakra-colors-brand-500)",
										color: "white",
										boxShadow: "sm",
									},
								}}
							>
								<Text as="span" lang={lang.lang}>
									{lang.nativeLabel}
								</Text>
								<Text as="span" display={{ base: "none", md: "inline" }} ml={1.5} opacity={0.8} fontWeight="500">
									{lang.label}
								</Text>
							</Box>
						))}
					</HStack>
					<ThemeControls accent={accent} onAccentChange={onAccentChange} />
				</HStack>
			</Flex>
		</Box>
	);
};

export default NavBar;
