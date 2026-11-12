import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
	window.localStorage.clear();
	window.history.pushState({}, "", "/");
});

test("redirects to the Hindi keyboard by default", () => {
	render(<App />);
	expect(screen.getByRole("heading", { name: "Hindi keyboard" })).toBeInTheDocument();
});

test("builds syllables from consonants and matras, and backspace removes one sign", () => {
	render(<App />);
	const textarea = screen.getByRole("textbox", { name: "Hindi text" });

	fireEvent.click(screen.getByRole("button", { name: "क, ka" }));
	fireEvent.click(screen.getByRole("button", { name: "ि, e" }));
	fireEvent.click(screen.getByRole("button", { name: "Space" }));
	fireEvent.click(screen.getByRole("button", { name: "म, ma" }));
	expect(textarea).toHaveValue("कि म");

	fireEvent.click(screen.getByRole("button", { name: "Backspace" }));
	expect(textarea).toHaveValue("कि ");
});

test("inserts at the cursor instead of the end", () => {
	render(<App />);
	const textarea = screen.getByRole("textbox", { name: "Hindi text" });

	fireEvent.click(screen.getByRole("button", { name: "क, ka" }));
	fireEvent.click(screen.getByRole("button", { name: "म, ma" }));
	textarea.setSelectionRange(1, 1);
	fireEvent.click(screen.getByRole("button", { name: "ा, aa" }));
	expect(textarea).toHaveValue("काम");
});

test("tapping a saved phrase inserts it", () => {
	render(<App />);
	fireEvent.click(screen.getByRole("button", { name: /परमेश्वर का वचन/ }));
	expect(screen.getByRole("textbox", { name: "Hindi text" })).toHaveValue("परमेश्वर का वचन");
});

test("Odia page loads its own keys", () => {
	window.history.pushState({}, "", "/odia");
	render(<App />);
	expect(screen.getByRole("button", { name: "କ, ka" })).toBeInTheDocument();
});
