import { Box, ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import * as hindi from "./data/hindi";
import * as odia from "./data/odia";
import usePersistentState from "./hooks/usePersistentState";
import KeyboardPage from "./pages/KeyboardPage";
import theme, { accents } from "./theme";

const languages = [hindi, odia];

const accentVariables = (name) =>
	Object.fromEntries(
		Object.entries((accents[name] || accents.violet).colors).map(([shade, value]) => [
			`--chakra-colors-brand-${shade}`,
			value,
		]),
	);

function App() {
	const [accent, setAccent] = usePersistentState("kb.accent", "violet");

	return (
		<ChakraProvider theme={theme}>
			{/* html:root outranks Chakra's own :root token rules, so the accent overrides the brand palette. */}
			<Global styles={{ "html:root": accentVariables(accent) }} />
			<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<Box minH="100vh" bg="bg.canvas">
					<NavBar accent={accent} onAccentChange={setAccent} />
					<Routes>
						<Route path="/" element={<Navigate to={hindi.meta.path} replace />} />
						{languages.map(({ meta, layout, commonPhrases }) => (
							<Route
								key={meta.code}
								path={meta.path}
								element={
									<KeyboardPage
										key={meta.code}
										meta={meta}
										layout={layout}
										commonPhrases={commonPhrases}
									/>
								}
							/>
						))}
						<Route path="*" element={<Navigate to={hindi.meta.path} replace />} />
					</Routes>
				</Box>
			</Router>
		</ChakraProvider>
	);
}

export default App;
