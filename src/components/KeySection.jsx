import { Box, Grid, Heading } from "@chakra-ui/react";
import { useId } from "react";
import KeyButton from "./KeyButton";

const renderKeys = (keys, fontFamily, onPress) =>
	keys.map((key) => (
		<KeyButton key={key.native} native={key.native} label={key.label} fontFamily={fontFamily} onPress={onPress} />
	));

const KeySection = ({ group, fontFamily, onPress }) => {
	const headingId = useId();

	return (
		<Box as="section" aria-labelledby={headingId}>
			<Heading
				id={headingId}
				as="h3"
				fontSize="xs"
				fontWeight="700"
				letterSpacing="wide"
				textTransform="uppercase"
				color="fg.muted"
				mb={2}
			>
				{group.title}
			</Heading>
			{group.rows ? (
				<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap={5} rowGap={2}>
					{group.rows.map((row) => (
						<Grid key={row[0].native} templateColumns="repeat(5, minmax(0, 1fr))" gap={2}>
							{renderKeys(row, fontFamily, onPress)}
						</Grid>
					))}
				</Grid>
			) : (
				<Grid templateColumns="repeat(auto-fill, minmax(56px, 1fr))" gap={2}>
					{renderKeys(group.keys, fontFamily, onPress)}
				</Grid>
			)}
		</Box>
	);
};

export default KeySection;
