import { Button } from "@chakra-ui/react";

const ActionButton = ({ onClick, icon, name, colorScheme = "brand", variant = "solid" }) => {
	return (
		<Button
			onClick={onClick}
			variant={variant}
			colorScheme={colorScheme}
			size={{ base: "sm", md: "md" }}
			rightIcon={icon}
		>
			{name}
		</Button>
	);
};

export default ActionButton;
